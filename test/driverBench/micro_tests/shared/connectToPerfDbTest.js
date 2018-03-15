'use strict';

const MicroTest = require('./microTest').MicroTest;
const MongoClient = require('../../../../lib/mongo_client');

class ConnectToPerfDbTest extends MicroTest {
  constructor(options) {
    super(options);
  }

  setup(ctx) {
    ctx.client = new MongoClient('mongodb://localhost:27017');

    return this.initClient(ctx)
      .then(() => this.initDb(ctx))
      .then(() => this.dropDb(ctx))
      .then(() => this.initDb(ctx))
      .then(() => this.initCollection(ctx));
  }

  teardown(ctx) {
    return this.dropDb(ctx).then(() => this.closeClient(ctx));
  }

  initClient(ctx) {
    ctx.client = new MongoClient('mongodb://localhost:27017');
    return ctx.client.connect();
  }

  initDb(ctx) {
    ctx.db = ctx.db || ctx.client.db('perftest');
    return ctx.db;
  }

  initCollection(ctx) {
    ctx.collection = ctx.collection || this.initDb(ctx).collection('corpus');
    return ctx.collection;
  }

  closeClient(ctx) {
    return ctx.client.close();
  }

  dropDb(ctx) {
    return ctx.db.dropDatabase();
  }

  dropCollection(ctx) {
    return ctx.collection.drop();
  }
}

module.exports = { ConnectToPerfDbTest };
