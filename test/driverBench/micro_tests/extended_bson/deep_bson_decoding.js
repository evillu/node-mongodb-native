'use strict';

const BSONDecodingTest = require('../shared').BSONDecodingTest;

module.exports = new BSONDecodingTest({
  name: 'bson_deep_decoding',
  description: 'BSON Deep Decoding',
  fileName: 'deep_bson'
});
