import React from 'react';

class PasswordChangeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordOld: '',
      passwordNew: '',
      passwordNew2: ''
    };

    this.handlePasswordOld = this.handleInput.bind(this, 'passwordOld');
    this.handlePasswordNew = this.handleInput.bind(this, 'passwordNew');
    this.handlePasswordNew2 = this.handleInput.bind(this, 'passwordNew2');
  }

  handleInput(key, ev) {
    this.setState({[key]: ev.target.value});
  }

  render() {
    return <div className="container">
      <div className="title">Change Password:</div>

      <input type="password" className="dark" placeholder="Old Password" value={this.state.passwordOld} onChange={this.handlePasswordOld} />
      <input type="password" className="dark" placeholder="New Password" value={this.state.passwordNew} onChange={this.handlePasswordNew} />
      <input type="password" className="dark" placeholder="Repeat Password" value={this.state.passwordNew2} onChange={this.handlePasswordNew2} />

      <div className="btn">Update</div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .container > * {
          margin: 10px 0;
          width: 200px;
        }
        .title {
          font-size: 1.1em;
          font-weight: bold;
        }
      `}</style>
    </div>;
  }
}

export default PasswordChangeView;
