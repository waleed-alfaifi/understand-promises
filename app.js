const CustomPromise = require("./promise");

const doWork = (res, rej) => {
  setTimeout(() => {
    res("Hello there!");
  }, 1000);
};

const promise1 = new CustomPromise(doWork);

promise1
  .then((value) => {
    console.log("Handler1: " + value);
  })
  .then((value) => {
    console.log("Handler2: " + value);
  });
