import Mongoose from 'mongoose';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import sendEmail from '../common/sendEmailMock';

// TODO update to some library with expire method and/or limit on number of
// items held (store only last n sessions in memory, then pop).
const memorySession = {};

const User = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]*$/,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  authKey: {
    type: String
  },
  authKeyExpires: {
    type: Date,
    // Auto remove non confirmed users after 1 hour.
    expires: 3600,
    // Skip index and auto remove if this field is unset.
    sparse: true
  },
  role: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  }
}, {
  toJSON: {
    transform(doc, res) {
      res.id = res._id;
      delete res._id;
      delete res.__v;
      delete res.password;
      delete res.authKey;
      delete res.email;
    }
  }
});

User.pre('save', async function(next) {
  try {
    // Encode password field on save (after validation passed).
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    next();
  } catch (err) {
    next(err);
  }
});

// Checks if this model got role of user.
User.methods.isUser = function() {
  return this.role === 0;
};

// Checks if this model got role of admin.
User.methods.isAdmin = function() {
  return this.role === 1;
};

// Checks if passed string is current password.
User.methods.isPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Gets access token for current user.
User.methods.getToken = function() {
  return jwt.encode({id: this.id}, process.env.APP_CONF_KOA_JWT_KEY);
};

// Finds user by email and password.
User.statics.findOneByLogin = async function(email, password) {
  const user = await this.findOne({email});

  if (!user) {
    throw new Error('User not found');
  }

  if (user.authKey) {
    throw new Error('User is not activated');
  }

  if (await user.isPassword(password)) {
    return user;
  }

  throw new Error('Incorrect user login password');
};

// Finds user by his access token.
User.statics.findOneByToken = async function(token) {
  if (!token) {
    throw new Error('Empty access token');
  }

  const decoded = jwt.decode(token, process.env.APP_CONF_KOA_JWT_KEY);
  const user = await this.findById(decoded.id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Logs into user session and generates users access token.
User.statics.login = async function(email, password) {
  const user = await this.findOneByLogin(email, password);
  return user.getToken();
};

// Create new inactive user and sends email with confirm link.
User.statics.signup = async function(name, email, password) {
  const user = new this({
    name,
    email,
    password,
    // Generate random key.
    authKey: Math.random().toString(36).substring(7),
    // Start auto remove for unconfirmed users.
    authKeyExpires: Date.now()
  });

  await user.save();

  const msg = `<h1>Dear ${user.name}</h1>
    <p>Thank you for signing up with us. To activate your profile click on the link below:</p>
    <p><a href="http://localhost/auth-activate?u=${user.id}&a=${user.authKey}">Confirm your registration</a></p>
    <p>All the best,</p>
    <p>Anixe team</p>`;

  sendEmail({
    to: [user.email],
    subject: 'Sign Up Confirmation',
    html: msg
  });

  return true;
};

// Activates created user and finishes user registration.
User.statics.activate = async function(userId, authKey) {
  const user = await this.findById(userId).exec();

  if (!user) {
    throw new Error('User not found');
  }

  if (user.authKey !== authKey) {
    throw new Error('Wrong user auth key');
  }

  user.authKey = undefined;
  user.authKeyExpires = undefined;
  await user.save();

  return user.getToken();
};

// Returns current user session.
User.statics.getSession = async function(settings) {
  const token = settings[2].XAuthToken;

  const session = memorySession[token];
  if (session) {
    return session;
  }

  const user = await this.findOneByToken(token);
  memorySession[token] = user;
  return user;
};

export default Mongoose.model('User', User);
