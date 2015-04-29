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
var clicksEachSecond = batchCalls(function (events) {
  // Do something
}, 1000);

document.body.addEventListener('click', clicksEachSecond);
```
