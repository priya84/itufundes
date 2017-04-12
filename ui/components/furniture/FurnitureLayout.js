import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import * as styles from '../../common/styles';
import FurnitureList from './FurnitureList';
import GuestFurnitureList from './GuestFurnitureList';
import UserMenu from '../user/UserMenu';
import ShoppingCart from '../cart/ShoppingCart';
import EmptyCartView from '../cart/EmptyCartView';
import Viewer from '../viewer/Viewer';

class FurnitureLayout extends React.Component {
  render() {
    const {isLoggedIn} = this.props.userByTokenQuery.userByToken;

    return <div className="container">
      <div className="left">
        <div className="top">
          <UserMenu />
        </div>
        <div className="mid">
          {isLoggedIn ? (<FurnitureList />) : (<GuestFurnitureList />)}
        </div>
        <div className="bot">
          {isLoggedIn ? (<ShoppingCart />) : (<EmptyCartView />)}
        </div>
      </div>

      <div className="right">
        <Viewer isLoggedIn={isLoggedIn} />
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;
          display: flex;
          color: ${styles.colorDarkwhite};
          position: relative;
          overflow: hidden;
        }

        .left {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          width: 500px;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #151518;
        }
        .left .top {
          background-color: #36373e;
          border-bottom: 1px solid #151518;
          box-shadow: inset 0px 0px 40px 5px rgba(33,33,33,1);
        }
        .left .mid {
          flex: 1;
          display: flex;
          background-color: #2a2b31;
          border-bottom: 1px solid #151518;
          box-shadow: inset 0px 0px 40px 5px rgba(33,33,33,1);
        }
        .left .bot {
          position: absolute;
          bottom: 0;
          left: 0;
          max-height: 100vh;
          width: 100%;
          flex: 1;
          display: flex;
        }

        .right {
          background-color: #1e1f23;
          width: 75%;
          margin-left: 25%;
        }
      `}</style>
    </div>;
  }
}

FurnitureLayout.propTypes = {
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
)(FurnitureLayout);
