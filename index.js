module.exports = function(callback, options) {
  options = options || {};
  var calls = [];
  var dispatch = null;
  var count = 0;
  var execute = function() {
    callback.apply(this, calls);
    calls = [];
    dispatch = null;
    count = 0;
  };
  return function() {
    count++;
    if ((!options.count && !dispatch) || count === options.count) {
      dispatch = options.wait || !options.count ? setTimeout(execute.bind(this), options.wait || 0) : execute.call(this);
    }

    if (
      calls.length && calls[0].length > 1 && 
      options.conditional && !options.conditional([].slice.call(arguments), calls.reduce(function (args, arg) {
      return args.concat(arg[arg.length - 1]);
    }, []))) {
      execute.call(this);
    }


    for (var x = 0; x < arguments.length; x++) {
      calls[x] = calls[x] ? calls[x].concat(arguments[x]) : [arguments[x]];
    }

  };
};
