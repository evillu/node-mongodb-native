'use strict';

module.exports = [
  './hrtime',
  './microTest',
  './connectToPerfDbTest',
  './insertTest',
  './insertOneTest',
  './insertManyTest',
  './bsonEncodingDecodingTests',
  './findAgainstTweetTest',
  './constants'
].reduce((acc, path) => Object.assign(acc, require(path)), {});
