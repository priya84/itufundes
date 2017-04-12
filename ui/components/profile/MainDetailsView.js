import React from 'react';

class MainDetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      email: props.email
    };

    this.handleName = this.handleInput.bind(this, 'name');
  }

  handleInput(key, ev) {
    this.setState({[key]: ev.target.value});
  }

  render() {
    return <div className="container">
      <div className="title">General Information:</div>

      <input type="text" className="dark" placeholder="User Name" value={this.state.name} onChange={this.handleName} />
      <input type="text" className="dark" placeholder="Phone Number" />
      <div className="email">
        <input type="text" placeholder="Email" value={this.state.email} disabled="true" />
        <a href="#">Contact support to change email</a>
      </div>

      <div className="btn">Update</div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .container > * {
          margin: 10px 0;
        }
        .btn {
          width: 200px;
        }
        .title {
          font-size: 1.1em;
          font-weight: bold;
        }
        .email input {
          margin-right: 40px;
        }
      `}</style>
    </div>;
  }
}

MainDetailsView.propTypes = {
  name: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired
};

export default MainDetailsView;
