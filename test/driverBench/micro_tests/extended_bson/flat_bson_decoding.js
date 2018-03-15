'use strict';

const BSONDecodingTest = require('../shared').BSONDecodingTest;

module.exports = new BSONDecodingTest({
  name: 'bson_flat_decoding',
  description: 'BSON Flat Decoding',
  fileName: 'flat_bson'
});
