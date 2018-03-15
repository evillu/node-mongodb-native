'use strict';

const fs = require('fs');
const path = require('path');

const hrtime = require('./hrtime');
const addToHrTime = hrtime.addToHrTime;
const hrtimeToSeconds = hrtime.hrtimeToSeconds;
const B_TO_MB = require('./constants').B_TO_MB;
const ConnectToPerfDbTest = require('./connectToPerfDbTest').ConnectToPerfDbTest;

class FindAgainstTweetTest extends ConnectToPerfDbTest {
  constructor(options) {
    super(options);
    this._makeId = !!options.makeId;
    this._numberOfOperations = options.numberOfOperations;
  }

  setup(ctx) {
    const tweetStr = fs.readFileSync(
      path.join(__dirname, '..', '..', 'spec', 'single_and_multi_document', 'tweet.json')
    );
    this._taskSize = tweetStr.length * this._numberOfOperations * B_TO_MB;

    const tweet = JSON.parse(tweetStr);

    const tweets = [];
    for (let _id = 1; _id <= this._numberOfOperations; _id += 1) {
      tweets.push(Object.assign({}, tweet, this._makeId ? { _id } : {}));
    }

    return super.setup(ctx).then(() => ctx.collection.insertMany(tweets));
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

module.exports = { FindAgainstTweetTest };
