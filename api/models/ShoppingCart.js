import Mongoose from 'mongoose';
import Furniture from './Furniture';

const ShoppingCart = new Mongoose.Schema({
  userId: Mongoose.Schema.Types.ObjectId,
  itemIds: [Mongoose.Schema.Types.ObjectId]
});

ShoppingCart.methods.getItems = function() {
  return Furniture.find({_id: {$in: this.itemIds}});
};

ShoppingCart.statics.findUserCart = async function(userId) {
  let cart = await this.findOne({userId});

  if (!cart) {
    cart = new this({userId, itemIds: []});
    await cart.save();
  }

  return cart;
};

export default Mongoose.model('ShoppingCart', ShoppingCart);
