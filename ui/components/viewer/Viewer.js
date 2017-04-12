import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import {initViewer, addSceneItem} from '../../common/viewer/viewer';

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

class Viewer extends React.Component {
  componentDidMount() {
    this.initViewer();
  }

  async initViewer() {
    initViewer();

    if (!this.props.shoppingCartByUserToken) {
      return;
    }

    await sleep(2000);

    const cart = this.props.shoppingCartByUserToken.shoppingCartByUserToken;
    cart.items.forEach((furniture) => {
      addSceneItem(furniture);
    });
  }

  render() {
    return <div>
      <div id="viewer" />
      <canvas id="floorplanner-canvas"></canvas>
      <div id="floorplanner" />

      <style jsx>{`
      `}</style>
    </div>;
  }
}

Viewer.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  shoppingCartByUserToken: React.PropTypes.object
};

const shoppingCartByUserToken = gql`
  query shoppingCartByUserToken {
    shoppingCartByUserToken {
      id
      userId
      items {
        id
        name
        image
        modelUrl
        type
        price
        size
        description
        dealer
      }
    }
  }
`;

export default compose(
  graphql(shoppingCartByUserToken, {
    name: 'shoppingCartByUserToken',
    skip: (props) => !props.isLoggedIn
  })
)(Viewer);
