'use strict';

const InsertTest = require('./insertTest').InsertTest;
const hrtime = require('./hrtime');
const addToHrTime = hrtime.addToHrTime;
const hrtimeToSeconds = hrtime.hrtimeToSeconds;

class InsertOneTest extends InsertTest {
  constructor(options) {
    super(options);
  }

  task(ctx) {
    const collection = ctx.collection;
    const totalTime = [0, 0];
    const numOps = this._numberOfOperations;

    function loop(_id) {
      if (_id > numOps) {
        return Promise.resolve(hrtimeToSeconds(totalTime));
      }

      const doc = Object.assign({}, ctx.doc);

      return new Promise(resolve => {
        const start = process.hrtime();
        collection.insertOne(doc, () => {
          const time = process.hrtime(start);
          addToHrTime(totalTime, time);
          resolve();
        });
      }).then(() => loop(_id + 1));
    }
    return loop(1);
  }
}

module.exports = { InsertOneTest };
