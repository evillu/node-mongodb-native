'use strict';

const BSONEncodingTest = require('../shared').BSONEncodingTest;

module.exports = new BSONEncodingTest({
  name: 'bson_flat_encoding',
  description: 'BSON Flat Encoding',
  fileName: 'flat_bson'
});
