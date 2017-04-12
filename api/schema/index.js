import {makeExecutableSchema} from 'graphql-tools';
import user from './user.js';
import furniture from './furniture.js';
import cart from './cart.js';

const SCHEMA = [
  user,
  furniture,
  cart
];

let schema = [`
type RootQuery {
  # TODO this is to avoid error with empty Object.
  foo: String
}

type RootMutation {
  # TODO this is to avoid error with empty Object.
  bar: String
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`];
let resolvers = {};
let RootQuery = {};
let RootMutation = {};

SCHEMA.forEach((s) => {
  schema.push(s[0]);

  let res = s[1];
  resolvers = {...resolvers, ...res};

  if (res.RootQuery) {
    RootQuery = {...RootQuery, ...res.RootQuery};
  }

  if (res.RootMutation) {
    RootMutation = {...RootMutation, ...res.RootMutation};
  }
});
resolvers = {...resolvers, RootQuery, RootMutation};

export default makeExecutableSchema({typeDefs: schema, resolvers});
