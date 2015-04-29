module.exports = function (callback, wait) {
  var calls = [];
  var dispatch = null;
  return function () {
    if (!dispatch) {
      dispatch = setTimeout(function () {
        callback.apply(null, calls);
        calls = [];
        dispatch = null;
      }, wait || 0);
    }
    for (var x = 0; x < arguments.length; x++) {
      calls[x] = calls[x] ? calls[x].concat(arguments[x]) : [arguments[x]];
    }
  };
};