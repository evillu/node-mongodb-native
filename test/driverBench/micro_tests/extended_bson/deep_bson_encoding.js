'use strict';

const BSONEncodingTest = require('../shared').BSONEncodingTest;

module.exports = new BSONEncodingTest({
  name: 'bson_deep_encoding',
  description: 'BSON Deep Encoding',
  fileName: 'deep_bson'
});
