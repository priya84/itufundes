import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import * as styles from '../../common/styles';
import MainDetailsView from './MainDetailsView';
import PasswordChangeView from './PasswordChangeView';
import BillingDetailsView from './BillingDetailsView';

class ProfileLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'main'
    };
    this.tabMain = this.changeTab.bind(this, 'main');
    this.tabPassword = this.changeTab.bind(this, 'password');
    this.tabBilling = this.changeTab.bind(this, 'billing');
  }

  changeTab(tabName) {
    this.setState({activeTab: tabName});
  }

  render() {
    const user = this.props.userByToken.userByToken.user;

    return <div className="container">
      <ul className={`tab-list ${this.state.activeTab}`}>
        <li className="tab btn main" onClick={this.tabMain}>General</li>
        <li className="tab btn password" onClick={this.tabPassword}>Password</li>
        <li className="tab btn billing" onClick={this.tabBilling}>Billing Info</li>
      </ul>

      <div className="tab-content">
        {this.state.activeTab === 'main' &&
          <MainDetailsView
            name={user.name}
            email={user.email}
          />
        }
        {this.state.activeTab === 'password' &&
          <PasswordChangeView />
        }
        {this.state.activeTab === 'billing' &&
          <BillingDetailsView />
        }
      </div>

      <style jsx>{`
        .tab-list {
          padding-bottom: 20px;
        }
        .tab-list .tab {
          border-radius: 0;
          border-right: 1px solid ${styles.colorWhite};
        }
        .tab-list .tab:first-child {
          border-radius: 2px 0 0 2px;
        }
        .tab-list .tab:last-child {
          border-radius: 0 2px 2px 0;
          border-right: 0;
        }
        .tab-list .btn {
          background-color: ${styles.colorSmoke};
        }
        .tab-list .btn:hover {
          background-color: ${styles.colorDarkwhite};
        }
        .tab-list.main .main {
          background-color: ${styles.colorDarksmoke};
        }
        .tab-list.password .password {
          background-color: ${styles.colorDarksmoke};
        }
        .tab-list.billing .billing {
          background-color: ${styles.colorDarksmoke};
        }
      `}</style>
    </div>;
  }
}

ProfileLayout.propTypes = {
  userByToken: React.PropTypes.object.isRequired
};

const userByToken = gql`
  query userByToken {
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
  graphql(userByToken, {name: 'userByToken'})
)(ProfileLayout);
