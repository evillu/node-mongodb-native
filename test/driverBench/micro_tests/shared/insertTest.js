'use strict';

const CONSTANTS = require('./constants');
const fs = require('fs');
const path = require('path');

const ConnectToPerfDbTest = require('./connectToPerfDbTest').ConnectToPerfDbTest;

class InsertTest extends ConnectToPerfDbTest {
  constructor(options) {
    super(options);
    this._numberOfOperations = options.numberOfOperations || 10000;
    this._specFileName = options.specFileName;
    this._specDirName = 'single_and_multi_document';
  }

  setup(ctx) {
    const docStr = fs.readFileSync(
      path.join(__dirname, '..', '..', 'spec', 'single_and_multi_document', 'small_doc.json')
    );
    this._taskSize = docStr.length * this._numberOfOperations * CONSTANTS.B_TO_MB;

    ctx.doc = JSON.parse(docStr);

    return super.setup(ctx).then(() => this._createCollection(ctx));
  }

  _createCollection(ctx) {
    return this.initDb(ctx).createCollection('corpus');
  }

  beforeTask(ctx) {
    return this.dropCollection(ctx)
      .then(() => this._createCollection(ctx))
      .then(() => this.initCollection(ctx));
  }
}

module.exports = { InsertTest };
