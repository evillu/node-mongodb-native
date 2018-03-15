'use strict';

const noop = () => {};

function loadTests(testPaths) {
  return testPaths.map(testPath => require(testPath));
}

function executeTests(tests, reporter) {
  return tests.reduce((memo, microTest) => {
    return memo.then(results => {
      reporter(`Executing "${microTest.description}"...`);
      return microTest.execute().then(() => {
        results[microTest.name] = microTest.score;
        return results;
      });
    });
  }, Promise.resolve({}));
}

function calculateBenchmarks(microBenchmarks) {
  return { microBenchmarks };
}

function simpleReporter(output) {
  console.log(`${new Date()}: ${output}`);
}

function benchmark(options) {
  const testFiles = options.testFiles;
  const reporter = options.reporter || noop;
  const tapper = fn => arg => (fn(), arg);

  return Promise.resolve()
    .then(tapper(() => reporter(`Loading Tests...`)))
    .then(() => loadTests(testFiles))
    .then(tapper(() => reporter('Tests Loaded')))
    .then(tapper(() => reporter('Executing Tests')))
    .then(tests => executeTests(tests, reporter))
    .then(microTests => calculateBenchmarks(microTests));
}

module.exports = benchmark;

if (require.main === module) {
  const testFiles = [
    './micro_tests/extended_bson/flat_bson_encoding',
    './micro_tests/extended_bson/flat_bson_decoding',
    './micro_tests/extended_bson/deep_bson_encoding',
    './micro_tests/extended_bson/deep_bson_decoding',
    './micro_tests/extended_bson/full_bson_encoding',
    './micro_tests/extended_bson/full_bson_decoding',
    './micro_tests/single_document/run_command',
    './micro_tests/single_document/find_one_by_id',
    './micro_tests/single_document/small_doc_insert_one',
    './micro_tests/single_document/large_doc_insert_one',
    './micro_tests/multi_document/find_many_and_empty_cursor',
    './micro_tests/multi_document/small_doc_bulk_insert',
    './micro_tests/multi_document/large_doc_bulk_insert'
  ];
  const reporter = simpleReporter;
  benchmark({ reporter, testFiles }).then(results => console.log(results));
}
