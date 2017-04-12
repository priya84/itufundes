import User from '../models/User';
import ShoppingCart from '../models/ShoppingCart';

export default [`
  type ShoppingCart {
    id: String!
    userId: String!
    items: [Furniture]!
  }

  extend type RootQuery {
    shoppingCartByUserToken: ShoppingCart
  }

  extend type RootMutation {
    addShoppingCartItem(
      itemId: String!
    ): ShoppingCart
    removeShoppingCartItem(
      itemId: String!
    ): ShoppingCart
  }
`, {
  ShoppingCart: {
    items(cart) {
      return cart.getItems();
    }
  },
  RootQuery: {
    async shoppingCartByUserToken() {
      const user = await User.getSession(arguments);
      return ShoppingCart.findUserCart(user.id);
    }
  },
  RootMutation: {
    async addShoppingCartItem(root, {itemId}) {
      const user = await User.getSession(arguments);
      const cart = await ShoppingCart.findUserCart(user.id);

      cart.itemIds.push(itemId);
      await cart.save();

      return cart;
    },
    async removeShoppingCartItem(root, {itemId}) {
      const user = await User.getSession(arguments);
      const cart = await ShoppingCart.findUserCart(user.id);

      cart.itemIds.splice(cart.itemIds.indexOf(itemId), 1);
      await cart.save();

      return cart;
    }
  }
}];
