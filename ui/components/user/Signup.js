import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import * as styles from '../../common/styles';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success: false,
      name: '',
      email: '',
      password: ''
    };

    this.signup = this.signup.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleName(ev) {
    this.setState({name: ev.target.value});
  }

  handleEmail(ev) {
    this.setState({email: ev.target.value});
  }

  handlePassword(ev) {
    this.setState({password: ev.target.value});
  }

  async signup() {
    try {
      await this.props.userSignupMutation({variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }});
      this.setState({success: true});
    } catch (err) {
      this.setState({error: 'Incorrect User Credentials!'});
    }
  }

  render() {
    return <div>
      <div className="login-box">
        {this.state.success && <div className="login">
          <div className="title">Success!</div>
          <div className="animated zoomIn">
            <i className="fa fa-check-circle-o" aria-hidden="true" />
          </div>
          <div className="title">Please check your email for activation link</div>
        </div>}

        {!this.state.success && <div className="login">
          <div className="title">User Sign Up</div>

          {this.state.error && <div className="error">{this.state.error}</div>}
          <input type="text" className="dark" placeholder="Name" value={this.state.name} onChange={this.handleName} />
          <input type="text" className="dark" placeholder="Email" value={this.state.email} onChange={this.handleEmail} />
          <input type="password" className="dark" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
          <div className="btn" onClick={this.signup}>Sign Up</div>
        </div>}
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
        .title {
          font-size: 1.2em;
          text-align: center;
          margin-bottom: 20px;
        }
        i {
          display: block;
          font-size: 10em;
          color: ${styles.colorGreen};
          text-align: center;
          padding: 20px 0;
        }
      `}</style>
    </div>;
  }
}

const userSignupMutation = gql`
  mutation userSignupMutation($name: String!, $email: String!, $password: String!) {
    userSignup(name: $name, email: $email, password: $password)
  }
`;

export default compose(
  graphql(userSignupMutation, {name: 'userSignupMutation'})
)(Signup);
