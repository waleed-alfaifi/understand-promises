// Using native promise!
// https://youtu.be/fyGSyqEX2dw?t=1679
const doWork = (res, rej) => {
  setTimeout(() => {
    res({
      id: "1",
      name: "John",
      age: 25,
    });
  }, 1000);
};

const doOtherWork = (res, rej) => {
  setTimeout(() => {
    res("Done fetching data!");
  }, 1000);
};

const promise1 = new Promise(doWork);

promise1
  .then((value) => {
    console.log("P1, H1: ", value);

    return new Promise((res, rej) => {
      setTimeout(() => {
        res("Done fetching data!");
      }, 1000);
    });
  })
  .then((value) => {
    console.log("P2, H1: " + value);
    return "nothing for you";
  })
  .then((value) => {
    console.log("P?, H?: " + value);
  });

setTimeout(() => {
  promise1.then((value) => console.log("P1, H2: ", value));
}, 3000);
