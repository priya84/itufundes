// Transpile es6 on the fly.
require('babel-core/register')({
  plugins: [
    'transform-es2015-modules-commonjs',
    'transform-object-rest-spread'
  ]
});

const mongoose = require('mongoose');
const Furniture = require('./models/Furniture').default;

mongoose.connect('mongodb://itufundes-mongodb:27017/itufundes');

function mockFurniture() {
  return Furniture.insertMany([
    {
      'name' : 'Shayla Chair',
      'image' : 'static/models/thumbnails/chair.png',
      'modelUrl' : 'static/models/js/ik-ekero-blue_baked.js',
      'type' : '1',
      'price': 149.99,
      'size': 'Width: 35" Depth: 39" Height: 38"',
      'description': 'Indulge in plush, modern comfort with a touch of retro flair. Button-tufted details of the Shayla chair exude a beautifully pulled-together look without being too buttoned up.',
      'dealer': 'IKEA'
    },
    {
      'name' : 'Hamlyn Bookcase',
      'image' : 'static/models/thumbnails/bookshelf.png',
      'modelUrl' : 'static/models/js/cb-kendallbookcasewalnut_baked.js',
      'type' : '1',
      'price': 95.99,
      'size': 'Width: 34.25" Depth: 12" Height: 75.25"',
      'description': 'When you mix stately, traditional style with a European flair, you’ve got something special. Case in point: the Hamlyn bookcase. Simply beautiful, it’s bathed in a rich finish for rustic warmth and high-end appeal.',
      'dealer': 'IKEA'
    },
    {
      'name' : 'Nestor Coffee Table',
      'image' : 'static/models/thumbnails/table.png',
      'modelUrl' : 'static/models/js/ik-stockholmcoffee-brown.js',
      'type' : '1',
      'price': 139.99,
      'size': 'Width: 48" Depth: 34.25" Height: 20.25"',
      'description': 'If there’s an accent piece with a flair for making traditional elements look so fit for modern-classic settings—the Nestor oval coffee table is it. It’s hard to not fall for the elegance and intricacy of acanthus leaf carvings and shapely serpentine legs.',
      'dealer': 'IKEA'
    },
    {
      'name' : 'Stavani Full Panel Bed',
      'image' : 'static/models/thumbnails/bed.png',
      'modelUrl' : 'static/models/js/ik_nordli_full.js',
      'type' : '1',
      'price': 260.99,
      'size': 'Width: 63" Depth: 86.5" Height: 54"',
      'description': 'Ultra-modern and clean lined, Stavani queen panel bed is a mastery in the art of simplicity. Unique two-tone treatment blends a rich, replicated cherry finish with contrasting black for urban industrial flair with an earthy sensibility.',
      'dealer': 'IKEA'
    },
    {
      'name' : 'Dailey Sofa',
      'image' : 'static/models/thumbnails/sofa.png',
      'modelUrl' : 'static/models/js/cb-rochelle-gray_baked.js',
      'type' : '1',
      'price': 199.99,
      'size': 'Width: 89" Depth: 37" Height: 39"',
      'description': 'Indulge your lust for comfort and love for contemporary design with the Dailey sofa. Made for easy, everyday living, it’s upholstered in a sumptuously soft fabric with a hint of herringbone texturing.',
      'dealer': 'IKEA'
    }
  ]);
}

async function mock() {
  await mockFurniture();
  process.exit();
}

mock();
