import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import * as styles from '../../common/styles';
import {saveCookie} from '../../common/cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(ev) {
    this.setState({email: ev.target.value});
  }

  handlePassword(ev) {
    this.setState({password: ev.target.value});
  }

  async login() {
    try {
      const res = await this.props.userLoginMutation({variables: {
        email: this.state.email,
        password: this.state.password
      }});

      saveCookie('XAuthToken', res.data.userLogin);
      window.location.href = '/';
    } catch (err) {
      this.setState({error: 'Incorrect user credentials!'});
    }
  }

  render() {
    return <div>
      <div className="login-box">
        <div className="login">
          <div className="title">User Login</div>

          {this.state.error && <div className="error">{this.state.error}</div>}
          <input type="text" className="dark" placeholder="Email" value={this.state.email} onChange={this.handleEmail} />
          <input type="password" className="dark" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
          <div className="btn" onClick={this.login}>Login</div>
          <div className="forgot"><a href="#">Forgot your password?</a></div>

          <div className="btn social facebook"><i className="fa fa-facebook-square" aria-hidden="true" /> Login with Facebook</div>
          <div className="btn social twitter"><i className="fa fa-twitter-square" aria-hidden="true" /> Login with Twitter</div>
          <div className="btn social google"><i className="fa fa-google-plus-square" aria-hidden="true" /> Login with Google+</div>
        </div>
      </div>

      <style jsx>{`
        .login-box {
          display: flexbox;
          width: 250px;
        }
        .login {
          width: 100%;
          display: flexbox;
          flex-direction: column;
          margin: auto;
        }
        .login input {
          width: 100%;
          margin-bottom: 20px;
        }
        .error {
          margin-bottom: 20px;
          color: ${styles.colorRed};
        }
        .forgot {
          text-align: center;
          font-size: 0.9em;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 1.2em;
          text-align: center;
          margin-bottom: 20px;
        }
        .social {
          margin-top: 10px;
          position: relative;
        }
        .social i {
          position: absolute;
          left: 10px;
          top: 0;
          line-height: 40px;
          font-size: 30px;
        }
        .social.facebook {
          background-color: #3b5998;
        }
        .social.twitter {
          background-color: #2795e9;
        }
        .social.google {
          background-color: #dd4b39;
        }
      `}</style>
    </div>;
  }
}

const userLoginMutation = gql`
  mutation userLoginMutation($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
  }
`;

export default compose(
  graphql(userLoginMutation, {name: 'userLoginMutation'})
)(Login);
