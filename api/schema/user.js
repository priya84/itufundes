import User from '../models/User';

export default [`
  type User {
    id: String!
    name: String!
    email: String!
    avatar: String
  }

  type Cuser {
    user: User
    isLoggedIn: Boolean!
  }

  extend type RootQuery {
    userByToken: Cuser
  }

  extend type RootMutation {
    userLogin(
      email: String!
      password: String!
    ): String
    userSignup(
      name: String!
      email: String!
      password: String!
    ): Boolean
    userActivate(
      id: String!
      authKey: String!
    ): String
  }
`, {
  RootQuery: {
    async userByToken() {
      try {
        return {
          user: await User.getSession(arguments),
          isLoggedIn: true
        };
      } catch (err) {
        return {
          user: null,
          isLoggedIn: false
        };
      }
    }
  },
  RootMutation: {
    userLogin(root, {email, password}) {
      return User.login(email, password);
    },
    userSignup(root, {name, email, password}) {
      return User.signup(name, email, password);
    },
    userActivate(root, {id, authKey}) {
      return User.activate(id, authKey);
    }
  }
}];
