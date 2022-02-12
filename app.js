const CustomPromise = require("./promise");

const doWork = (res, rej) => {
  setTimeout(() => {
    res("Value");
  }, 1000);
};

const promise1 = new CustomPromise(doWork);

promise1
  .then((value) => {
    console.log("Handler1: " + value);
    return "good!";
  })
  .then((value) => {
    console.log("Handler2: " + value);
  });
