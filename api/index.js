// Transpile es6 on the fly.
require('babel-core/register')({
  plugins: [
    'transform-es2015-modules-commonjs',
    'transform-object-rest-spread'
  ]
});

const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const cors = require('kcors');
const apollo = require('graphql-server-koa');
const mongoose = require('mongoose');
const schema = require('./schema/index');

const PORT = 3000;
const MONGODB_URL = 'mongodb://itufundes-mongodb:27017/itufundes';

const app = new Koa();
const router = new KoaRouter();

mongoose.connect(MONGODB_URL);

app.use(koaBody());
app.use(cors());

router.post('/graphql', apollo.graphqlKoa((ctx) => ({
  schema: schema.default,
  context: {XAuthToken: ctx.request.header['x-auth-token']}
})));
// TODO only for development
router.get('/graphiql', apollo.graphiqlKoa({endpointURL: '/graphql'}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`==> Listening at http://localhost:${PORT}`);
});
