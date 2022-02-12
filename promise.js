const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

/**
 * Notice that the promise object does NOT do the work; it just wraps the idea of waiting for asynchronous code to run; the idea of a future value
 * @param {*} executor This is the function that will actually do the work, for example fetch data over the internet, or query database, or set a timer and so on
 */
function CustomPromise(executor) {
  let state = PENDING;
  let value = null;
  let handlers = []; // handles the case where we want to have multiple handlers
  let catches = []; // the same of handlers but for error cases

  // This will eventually be invoked by the executor function once it's done with its work
  function resolve(result) {
    // Deals with what's called `one and done operations` which means the value is resolved only once and won't change after it's set
    if (state !== PENDING) return;

    // If however the promise is pending and the value is not resolved yet, change the promise state and call handlers
    // Because `resolve` is called, that means the promise is fulfilled
    state = FULFILLED;
    value = result;
    executeHandlers();
  }

  function reject(error) {
    if (state !== PENDING) return;

    state = REJECTED;
    value = error;
    catches.forEach((c) => c(value));
  }

  function executeHandlers(thenCb) {
    if (thenCb) {
      let wow = thenCb(value);
      console.log(wow);
    } else {
      handlers.forEach((h) => h(value));
    }
  }

  this.then = function (callback) {
    if (state === FULFILLED) {
      executeHandlers(callback);
    } else {
      handlers.push(callback);
    }

    return this;
  };

  this.catch = function (callback) {
    if (state === REJECTED) {
      callback(value);
    } else {
      catches.push(callback);
    }
  };

  // the async executor function is immediately invoked when the promise object is created and is passed the `resolve` and `reject` functions used to handle the future value
  executor(resolve, reject);
}

module.exports = CustomPromise;
