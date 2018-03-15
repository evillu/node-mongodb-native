'use strict';

const CONSTANTS = require('./constants');

function hrtimeToSeconds(hrtime) {
  return hrtime[0] + hrtime[1] / CONSTANTS.SECOND_TO_NS;
}

function addToHrTime(totalTime, time) {
  totalTime[0] += time[0];
  totalTime[1] += time[1];
  totalTime[0] += (totalTime[1] / CONSTANTS.SECOND_TO_NS) | 0;
  totalTime[1] %= CONSTANTS.SECOND_TO_NS;
}

module.exports = {
  hrtimeToSeconds,
  addToHrTime
};
