# batchcalls
Batches calls to a function and passes arguments as arrays

```js
var batchCalls = require('batchcalls');
var request = batchCalls(function (ids) {
  fetch('/users/?ids=' + ids.join(',')).then(doSomething);
});
var ids = ['1', '2', '3'];

ids.forEach(request);
```

```js
var batchCalls = require('batchcalls');
var clicksWithinSecond = batchCalls(function (events) {
  // Do something
}, {
  wait: 1000
});

document.body.addEventListener('click', clicksWithinSecond);
```

```js
var batchCalls = require('batchcalls');
var executeAfter5Clicks = batchCalls(function (events) {
  // Do something
}, {
  count: 5
});

document.body.addEventListener('click', executeAfter5Clicks);
```