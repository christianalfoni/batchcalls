module.exports = function(callback, options) {
  options = options || {};
  var calls = [];
  var dispatch = null;
  var count = 0;
  var execute = function() {
    callback.apply(null, calls);
    calls = [];
    dispatch = null;
    count = 0;
  };
  return function() {
    count++;
    if ((!options.count && !dispatch) || count === options.count) {
      dispatch = options.wait || !options.count ? setTimeout(execute, options.wait || 0) : execute();
    }
    for (var x = 0; x < arguments.length; x++) {
      calls[x] = calls[x] ? calls[x].concat(arguments[x]) : [arguments[x]];
    }
  };
};
