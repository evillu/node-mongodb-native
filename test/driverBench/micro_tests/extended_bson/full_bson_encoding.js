'use strict';

const BSONEncodingTest = require('../shared').BSONEncodingTest;

module.exports = new BSONEncodingTest({
  name: 'bson_full_encoding',
  description: 'BSON Full Encoding',
  fileName: 'full_bson'
});
