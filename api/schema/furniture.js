import Furniture from '../models/Furniture';

export default [`
  type Furniture {
    id: String!
    name: String!
    image: String!
    modelUrl: String!
    type: String!
    price: Float
    size: String
    description: String
    dealer: String
  }

  extend type RootQuery {
    allFurniture: [Furniture]
  }
`, {
  RootQuery: {
    allFurniture() {
      return Furniture.find({});
    }
  }
}];
