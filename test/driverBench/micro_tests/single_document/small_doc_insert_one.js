'use strict';

const shared = require('../shared');
const InsertOneTest = shared.InsertOneTest;

module.exports = new InsertOneTest({
  name: 'small_doc_insert_one',
  description: 'Small Doc Insert One',
  numberOfOperations: 10000,
  specFileName: 'small_doc.json'
});
