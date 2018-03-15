'use strict';

const fs = require('fs');
const path = require('path');
const EJSON = require('mongodb-extjson');
const BSON = require('bson');
const MicroTest = require('./microTest').MicroTest;
const hrtime = require('./hrtime');
const B_TO_MB = require('./constants').B_TO_MB;
const hrtimeToSeconds = hrtime.hrtimeToSeconds;
const addToHrTime = hrtime.addToHrTime;

const NUMBER_OF_OPERATIONS = 10000;
const bson = new BSON();
EJSON.setBSONModule(BSON);

class BSONEncodingTest extends MicroTest {
  constructor(options) {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'spec',
      'extended_bson',
      `${options.fileName}.json`
    );
    const dataString = fs.readFileSync(filePath, 'utf8');
    super({
      name: options.name,
      description: options.description,
      taskSize: dataString.length * NUMBER_OF_OPERATIONS * B_TO_MB
    });
    this._dataString = dataString;
  }

  task() {
    const totalTime = [0, 0];
    for (let i = 0; i < NUMBER_OF_OPERATIONS; i += 1) {
      const start = process.hrtime();
      bson.serialize(EJSON.parse(this._dataString));
      const time = process.hrtime(start);
      addToHrTime(totalTime, time);
    }

    return hrtimeToSeconds(totalTime);
  }
}

class BSONDecodingTest extends BSONEncodingTest {
  constructor(options) {
    super(options);
    this._dataBSON = bson.serialize(EJSON.parse(this._dataString));
  }

  task() {
    const totalTime = [0, 0];
    for (let i = 0; i < NUMBER_OF_OPERATIONS; i += 1) {
      const start = process.hrtime();
      EJSON.stringify(bson.deserialize(this._dataBSON));
      const time = process.hrtime(start);
      addToHrTime(totalTime, time);
    }

    return hrtimeToSeconds(totalTime);
  }
}

module.exports = {
  BSONEncodingTest,
  BSONDecodingTest
};
