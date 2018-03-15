'use strict';

const shared = require('../shared');
const FindAgainstTweetTest = shared.FindAgainstTweetTest;
const addToHrTime = shared.addToHrTime;
const hrtimeToSeconds = shared.hrtimeToSeconds;

class FindManyAndEmptyCursor extends FindAgainstTweetTest {
  constructor(options) {
    super(options);
  }

  task(ctx) {
    const collection = ctx.collection;
    const totalTime = [0, 0];

    return new Promise(resolve => {
      const start = process.hrtime();
      const cursor = collection.find({});

      cursor.forEach(
        () => {},
        () => {
          const time = process.hrtime(start);
          addToHrTime(totalTime, time);
          resolve(hrtimeToSeconds(totalTime));
        }
      );
    });
  }
}

module.exports = new FindManyAndEmptyCursor({
  name: 'find_many_and_empty_cursor',
  description: 'Find Many and Empty cursor',
  numberOfOperations: 10000,
  makeId: false
});
