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

exports['should batch calls multiple times'] = function(test){
    var count = 0;
    var func = batchCalls(function (ids) {
      if (count === 0) {
        test.deepEqual(ids, ['1', '2', '3']);
        count++;
      } else {
        test.deepEqual(ids, ['4', '5', '6']);
        test.done();
      }
    });
    func('1');
    func('2');
    func('3');
    setTimeout(function () {
      func('4');
      func('5');
      func('6');
    }, 0);
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
    }, {
      wait: 100
    });
    func();
};

exports['should wait x calls and synchronously trigger'] = function(test){
    var func = batchCalls(function () {
      test.done();
    }, {
      count: 3
    });
    func();
    func();
    func();

    // Fail test if async
    setTimeout(function () {
      test.ok(false);
    }, 0);
};

exports['should wait x calls and wait x milliseconds before trigger'] = function(test){
    var start = Date.now();
    var func = batchCalls(function () {
      test.ok(Date.now() - start >= 100);
      test.done();
    }, {
      count: 3,
      wait: 100
    });
    func();
    func();
    func();

};