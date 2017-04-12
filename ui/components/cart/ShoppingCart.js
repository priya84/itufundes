import React from 'react';
import {gql, graphql, compose} from 'react-apollo';
import EmptyCartView from './EmptyCartView';
import ShoppingCartView from './ShoppingCartView';
import Popup from '../layout/Popup';
import Checkout from './Checkout';
import {removeSceneItem} from '../../common/viewer/viewer';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {openCheckoutPopup: false};
    this.onRemove = this.onRemove.bind(this);
    this.onCompleteOrderClick = this.onCompleteOrderClick.bind(this);
    this.closeCheckoutPopup = this.closeCheckoutPopup.bind(this);
  }

  onRemove(ev) {
    const selectedId = ev.currentTarget.dataset.id;

    removeSceneItem(selectedId);
    this.props.removeShoppingCartItemMutation({
      variables: {
        itemId: selectedId
      }
    });
  }

  onCompleteOrderClick() {
    this.setState({openCheckoutPopup: true});
  }

  closeCheckoutPopup() {
    this.setState({openCheckoutPopup: false});
  }

  render() {
    const cart = this.props.shoppingCartByUserToken.shoppingCartByUserToken;

    return <div className="container">
      {cart.items.length ? (
        <ShoppingCartView
          items={cart.items}
          onRemove={this.onRemove}
          onCompleteOrderClick={this.onCompleteOrderClick}
        />
      ) : (
        <EmptyCartView />
      )}

      {this.state.openCheckoutPopup && <Popup onClose={this.closeCheckoutPopup}><Checkout /></Popup>}

      <style jsx>{`
        .container {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>;
  }
}

ShoppingCart.propTypes = {
  shoppingCartByUserToken: React.PropTypes.object.isRequired,
  removeShoppingCartItemMutation: React.PropTypes.func.isRequired
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
const removeShoppingCartItemMutation = gql`
  mutation removeShoppingCartItemMutation($itemId: String!) {
    removeShoppingCartItem(itemId: $itemId) {
      id
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
  graphql(shoppingCartByUserToken, {name: 'shoppingCartByUserToken'}),
  graphql(removeShoppingCartItemMutation, {name: 'removeShoppingCartItemMutation'})
)(ShoppingCart);
