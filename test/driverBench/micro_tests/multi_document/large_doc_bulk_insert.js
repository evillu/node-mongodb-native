'use strict';

const InsertManyTest = require('../shared').InsertManyTest;

module.exports = new InsertManyTest({
  name: 'large_doc_bulk_insert',
  description: 'Large Doc Bulk Insert',
  numberOfOperations: 10,
  specFileName: 'large_doc.json'
});
