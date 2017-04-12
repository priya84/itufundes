import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import * as styles from '../../common/styles';
import Popup from '../layout/Popup';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import ProfileLayout from '../profile/ProfileLayout';

class UserMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      popup: null
    };
    this.closePopup = this.selectPopup.bind(this, null);
    this.signupPopup = this.selectPopup.bind(this, 'signup');
    this.loginPopup = this.selectPopup.bind(this, 'login');
    this.profilePopup = this.selectPopup.bind(this, 'profile');
    this.logoutePopup = this.selectPopup.bind(this, 'logout');
  }

  selectPopup(popup) {
    this.setState({popup});
  }

  render() {
    const {isLoggedIn, user} = this.props.userByTokenQuery.userByToken;
    const popup = this.state.popup;

    return <div className="container">
      <div className="menu">
        <div className="left">
          <i className="fa fa-pencil-square" aria-hidden="true" /> Fun Designer v1.2
        </div>
        {isLoggedIn ? (
          <div className="right">
            <div className="btn" onClick={this.profilePopup}><i className="fa fa-user" aria-hidden="true" /> {user.name}</div>
            <div className="btn" onClick={this.logoutePopup}><i className="fa fa-sign-in" aria-hidden="true" /> Logout</div>
          </div>
        ) : (
          <div className="right">
            <div className="btn" onClick={this.signupPopup}><i className="fa fa-sign-in" aria-hidden="true" /> Sign Up</div>
            <div className="btn" onClick={this.loginPopup}><i className="fa fa-address-book" aria-hidden="true" /> Login</div>
          </div>
        )}
      </div>

      {popup === 'signup' && <Popup onClose={this.closePopup}><Signup /></Popup>}
      {popup === 'login' && <Popup onClose={this.closePopup}><Login /></Popup>}
      {popup === 'profile' && <Popup onClose={this.closePopup}><ProfileLayout /></Popup>}
      {popup === 'logout' && <Popup onClose={this.closePopup}><Logout /></Popup>}

      <style jsx>{`
        .container {
          padding: 10px;
        }
        .menu {
          display: flex;
        }
        .left {
          flex: 1;
          line-height: 40px;
          font-size: 1.3em;
          color: ${styles.colorWhite};
        }
        .right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
        .right .btn {
          margin-left: 20px;
        }
      `}</style>
    </div>;
  }
}

UserMenu.propTypes = {
  userByTokenQuery: React.PropTypes.object.isRequired
};

const userByTokenQuery = gql`
  query userByTokenQuery {
    userByToken {
      user {
        id
        name
        email
        avatar
      }
      isLoggedIn
    }
  }
`;

export default compose(
  graphql(userByTokenQuery, {name: 'userByTokenQuery'})
)(UserMenu);
