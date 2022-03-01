const doWork = (res, rej) => {
  setTimeout(() => {
    res({
      id: 1,
      name: "John",
      age: 25,
    });
  }, 1000);
};

const doOtherWork = (userId) => (res, rej) => {
  setTimeout(() => {
    const books = [
      {
        id: 1,
        user: 1,
        name: "Book 1",
      },
      {
        id: 2,
        user: 5,
        name: "Book 2",
      },
      {
        id: 3,
        user: 1,
        name: "Book 3",
      },
    ];

    const userBooks = books.filter((book) => book.user === userId);
    res(userBooks);
  }, 1000);
};

const promise1 = new Promise(doWork);

promise1
  .then((value) => {
    console.log("P1, H1: ", value);

    return new Promise(doOtherWork(value.id));
  })
  .then((value) => {
    console.log("P2, H1: ", value);
    return "nothing for you";
  })
  .then((value) => {
    console.log("P?, H?: " + value);
  });

setTimeout(() => {
  promise1.then((value) => console.log("P1, H2: ", value));
}, 3000);
