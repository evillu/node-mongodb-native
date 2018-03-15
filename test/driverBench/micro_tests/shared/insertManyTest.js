'use strict';

const InsertTest = require('./insertTest').InsertTest;
const hrtime = require('./hrtime');
const addToHrTime = hrtime.addToHrTime;
const hrtimeToSeconds = hrtime.hrtimeToSeconds;

class InsertManyTest extends InsertTest {
  constructor(options) {
    super(options);
  }

  setup(ctx) {
    return super.setup(ctx).then(() => {
      ctx.docs = [];
      for (let i = 0; i < this._numberOfOperations; i += 1) {
        ctx.docs.push(Object.assign({}, ctx.doc));
      }
    });
  }

  task(ctx) {
    const collection = ctx.collection;
    const totalTime = [0, 0];

    return new Promise(resolve => {
      const start = process.hrtime();
      collection.insertMany(ctx.docs, { ordered: true }, () => {
        const time = process.hrtime(start);
        addToHrTime(totalTime, time);
        resolve(hrtimeToSeconds(totalTime));
      });
    });
  }
}

module.exports = { InsertManyTest };
