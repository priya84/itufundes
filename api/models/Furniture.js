import Mongoose from 'mongoose';

const Furniture = new Mongoose.Schema({
  name: String,
  image: String,
  modelUrl: String,
  type: String,
  price: Number,
  size: String,
  description: String,
  dealer: String
});

export default Mongoose.model('Furniture', Furniture);
