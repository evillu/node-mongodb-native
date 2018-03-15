'use strict';

const shared = require('../shared');
const addToHrTime = shared.addToHrTime;
const hrtimeToSeconds = shared.hrtimeToSeconds;
const B_TO_MB = shared.B_TO_MB;
const ConnectToPerfDbTest = shared.ConnectToPerfDbTest;

const NUMBER_OF_OPERATIONS = 10000;
const SIZE_OF_ISMASTER = 16;

class RunCommandTest extends ConnectToPerfDbTest {
  constructor(options) {
    super(options);
  }

  setup(ctx) {
    return super.setup(ctx).then(() => (ctx.db = ctx.client.db('admin')));
  }

  task(ctx) {
    const db = ctx.db;
    const totalTime = [0, 0];

    function loop(count) {
      if (count <= 0) {
        return Promise.resolve(hrtimeToSeconds(totalTime));
      }

      return new Promise(resolve => {
        const start = process.hrtime();
        db.command({ ismaster: true }, () => {
          const time = process.hrtime(start);
          addToHrTime(totalTime, time);
          resolve();
        });
      }).then(() => loop(count - 1));
    }
    return loop(NUMBER_OF_OPERATIONS);
  }
}

module.exports = new RunCommandTest({
  name: 'run_command',
  description: 'Run Command',
  taskSize: SIZE_OF_ISMASTER * NUMBER_OF_OPERATIONS * B_TO_MB
});
