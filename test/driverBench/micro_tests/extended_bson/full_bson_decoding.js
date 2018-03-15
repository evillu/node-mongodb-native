'use strict';

const BSONDecodingTest = require('../shared').BSONDecodingTest;

module.exports = new BSONDecodingTest({
  name: 'bson_full_decoding',
  description: 'BSON Full Decoding',
  fileName: 'full_bson'
});
