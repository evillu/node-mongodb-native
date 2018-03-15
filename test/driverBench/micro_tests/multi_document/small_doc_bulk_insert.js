'use strict';

const InsertManyTest = require('../shared').InsertManyTest;

module.exports = new InsertManyTest({
  name: 'small_doc_bulk_insert',
  description: 'Small Doc Bulk Insert',
  numberOfOperations: 10000,
  specFileName: 'small_doc.json'
});
