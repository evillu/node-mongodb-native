'use strict';

const shared = require('../shared');
const InsertOneTest = shared.InsertOneTest;

module.exports = new InsertOneTest({
  name: 'large_doc_insert_one',
  description: 'Large Doc Insert One',
  numberOfOperations: 10,
  specFileName: 'large_doc.json'
});
