var batchCalls = require('./index.js');

exports['should batch calls'] = function(test){
    var func = batchCalls(function (ids) {
      test.deepEqual(ids, ['1', '2', '3']);
      test.done();
    });
    func('1');
    func('2');
    func('3');
};

exports['should batch calls with multiple arguments'] = function(test){
    var func = batchCalls(function (argsA, argsB, argsC) {
      test.deepEqual(argsA, ['1', '2', '1']);
      test.deepEqual(argsB, ['2', undefined, '2']);
      test.deepEqual(argsC, [[], true, '3']);
      test.done();
    });
    func('1', '2', []);
    func('2', undefined, true);
    func('1', '2', '3');
};

exports['should wait set milliseconds'] = function(test){
    var start = Date.now();
    var func = batchCalls(function () {
      test.ok(Date.now() - start >= 100);
      test.done();
    }, 100);
    func();
};