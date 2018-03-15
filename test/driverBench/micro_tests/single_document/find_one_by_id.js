'use strict';

const shared = require('../shared');
const FindAgainstTweetTest = shared.FindAgainstTweetTest;
const addToHrTime = shared.addToHrTime;
const hrtimeToSeconds = shared.hrtimeToSeconds;

class FindOneByIdTest extends FindAgainstTweetTest {
  constructor(options) {
    super(options);
  }

  task(ctx) {
    const collection = ctx.collection;
    const totalTime = [0, 0];
    const NUMBER_OF_OPERATIONS = this._numberOfOperations;

    function loop(_id) {
      if (_id > NUMBER_OF_OPERATIONS) {
        return Promise.resolve(hrtimeToSeconds(totalTime));
      }

      return new Promise(resolve => {
        const start = process.hrtime();
        collection.findOne({ _id }, () => {
          const time = process.hrtime(start);
          addToHrTime(totalTime, time);
          resolve();
        });
      }).then(() => loop(_id + 1));
    }
    return loop(1);
  }
}

module.exports = new FindOneByIdTest({
  name: 'find_one_by_id',
  description: 'Find One By Id',
  numberOfOperations: 10000,
  makeId: false
});
