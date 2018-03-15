'use strict';

const CONSTANTS = require('./constants');

const PERCENTILES = [10, 25, 50, 75, 95, 98, 99];
function percentileIndex(percentile, total) {
  return Math.max(Math.floor(total * percentile / 100 - 1), 0);
}

class MicroTest {
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this._taskSize = options.taskSize;
  }

  setup() {}
  beforeTask() {}
  task() {}
  afterTask() {}
  teardown() {}

  execute() {
    this._executionCount = 0;
    this._percentiles = {};
    this.score = 0;
    this._rawExecutionData = [];
    this._sortedExecuitonData = [];

    this._start = Date.now();

    const ctx = {};

    return Promise.resolve()
      .then(() => this.setup(ctx))
      .then(() => this._loop(ctx))
      .then(() => this.teardown(ctx))
      .then(() => this._calculateStats())
      .catch(e => this._errorHandler(e));
  }

  _loop(ctx) {
    const now = Date.now();
    const time = now - this._start;

    if (
      time >= CONSTANTS.MAX_EXECUTION_TIME ||
      (time >= CONSTANTS.MIN_EXECUTION_TIME &&
        this._executionCount >= CONSTANTS.MIN_EXECUTION_COUNT)
    ) {
      return;
    }

    let singleExecution;
    return Promise.resolve()
      .then(() => this.beforeTask(ctx))
      .then(() => Promise.resolve(this.task(ctx)).then(se => (singleExecution = se)))
      .then(() => this.afterTask(ctx))
      .then(() => {
        this._rawExecutionData.push(singleExecution);
        this._executionCount += 1;

        return this._loop(ctx);
      });
  }

  _calculateStats() {
    this._sortedExecuitonData = [].concat(this._rawExecutionData).sort();

    this._percentiles = PERCENTILES.reduce((acc, pct) => {
      acc[pct] = this._sortedExecuitonData[percentileIndex(pct, this._executionCount)];
      return acc;
    }, {});

    const medianExecution = this._percentiles[50];
    this.score = this._taskSize / medianExecution;

    return this.score;
  }

  _errorHandler(e) {
    console.error(e);
  }
}

module.exports = { MicroTest };
