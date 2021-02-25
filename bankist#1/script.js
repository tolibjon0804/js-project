"use strict";

// Data
// const account1 = {
//   owner: "Tolibjon Olimjonov",
//   movements: [200, 450, -400, 3000, -650, 25000, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Olimjon Muydinov",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };
// const accounts = [account1, account2, account3, account4];

const account1 = {
  owner: "Tolibjon Olimjonov",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US", // de-DE
};

const account2 = {
  owner: "Ann John",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const logo = document.querySelector(".logo");
/////////////////////////////////////////////////
logo.addEventListener("click", function () {
  location.href =
    "file:///D:/frondend(VS%20Code)/courseUdemy/Jonas%20Schemadtmann/bankist%232/index.html";
});

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth()}`.padStart(2, 0);
  // const year = `${date.getFullYear()}`;
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, acc) {
  return new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCur(mov, acc)}</div>
        </div>
          `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// console.log(containerMovements.innerHTML);
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //   console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc);
};

const calcDisplayBalance = function (acc) {
  const balace = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balace = balace;

  labelBalance.textContent = formatCur(acc.balace, acc);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
console.log(accounts);

//Maximum value
const max = account1.movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else return mov;
}, account1.movements[0]);
// console.log(max);

const eurToUsd = 1.1;
const totalDepositsUSD = account1.movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balace
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};
let currentAccount, timer;

// currentAccount = account1;
const startLogOutTimer = function () {
  //Set time to 5 minute
  let time = 600;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in ti get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };

  //Call the timer every second
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    // Create current Date

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date());

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  // weekday: "long",
};

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balace >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    if (receiverAcc.currency === "EUR") {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount * 0.83);
      inputTransferAmount.value = inputTransferTo.value = "";
    }
    if (receiverAcc.currency === "USD") {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount * 1.21);
      inputTransferAmount.value = inputTransferTo.value = "";
    }
    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, index + 1);
    containerApp.style.opacity = 0;
    inputClosePin.value = inputCloseUsername.value = "";
    labelWelcome.textContent = "Log in to get starteds";
  }
});
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Coding Challenge 1
// Julia and Kate are doing a study on dogs.
// So each of them asked 5 dog owners about their
// dog's age, and stored the data into an array
// (one array for each). For now, they are just
// interested in knowing whether a dog is an adult
// or a puppy. A dog is an adult if it is at least 3
// years old, and it's a puppy if it's less than 3 years old.
// Your tasks: Create a function 'checkDogs',
// which accepts 2 arrays of dog's ages ('dogsJulia' and '
// dogsKate'), and does the following things: 1. Julia
// found out that the owners of the first and the last
// two dogs actually have cats, not dogs! So create a shallow
// copy of Julia's array, and remove the cat ages from that
// copied array (because it's a bad practice to mutate
// function parameters) 2. Create an array with both Julia's
// (corrected) and Kate's data 3. For each remaining dog, log
// to the console whether it's an adult ("Dog number 1 is an
// adult, and is 5 years old") or a puppy ("Dog number 2 is
// still a puppy 🐶 ") 4. Run the function for both test
// datasets
// Test data: § Data 1: Julia's data [3, 5, 2, 12, 7],
// Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's data
// [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉
// GOOD LUCK 😀
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [10, 5, 6, 1, 4];
// const checkDogs = function (dogsJ, dogsK) {
//   dogsJ.splice(-2);
//   dogsJ.splice(0, 1);
//   function cl(arr) {
//     arr.forEach(function (value, i) {
//       value > 3
//         ? console.log(
//             `Dog number ${i + 1} is an adult, and is ${value} years old`
//           )
//         : console.log(`Dog number ${i + 1} is still a puppy`);
//     });
//   }
//   cl(dogsJ);
//   cl(dogsK);
// };
// checkDogs(dogsJulia, dogsKate);
// const dogsAge = dogsJulia.concat(dogsKate);

// Coding Challenge 2
// Let's go back to Julia and Kate's study about dogs.
// This time, they want to convert dog ages to human
// ages and calculate the average age of the dogs in
// their study.
// Your tasks: Create a function 'calcAverageHumanAge',
// which accepts an arrays of dog's ages ('ages'), and
// does the following things in order: 1. Calculate the
// dog age in human years using the following formula:
// if the dog is <= 2 years old, humanAge = 2 * dogAge.
// If the dog is > 2 years old, humanAge = 16 + dogAge *
// 4 //2. Exclude all dogs that are less than 18 human years
// old (which is the same as keeping dogs that are at least
// 18 years old) 3. Calculate the average human age of all
// adult dogs (you should already know from other challenges
// how we calculate averages 😉) 4. Run the function for both
// test datasets
// Test data: § Data 1: [5, 2, 4, 1, 15, 8, 3] §
// Data 2: [16, 6, 10, 5, 6, 1, 4]
// console.log(dogsAge);
// const calcAverageHumanAge = function (dogsAge) {
//   const humanAges = dogsAge.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAges);
//   const adults = humanAges.filter(age=>age>=18)
//   console.log(adults);
// };
// calcAverageHumanAge(dogsAge);

//////// Array Method Practice
// const bankDepositSum = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov > 0)
//   .reduce((sum, cur) => sum + cur);

// console.log(bankDepositSum);

// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000);

// console.log(numDeposits1000);

// const { deposit, withdrawals } = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       //   cur > 0 ? (sums.deposit += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? "deposit" : "withdrawals"] += cur;
//       return sums;
//     },
//     { deposit: 0, withdrawals: 0 }
//   );
// console.log(deposit, withdrawals);

// //this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((word) =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(" ");
//   return titleCase;
// };

// console.log(convertTitleCase("this is a nice title"));

// Julia and Kate are still studying dogs, and this time
// they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is
// larger than the recommended portion, and eating too little
// is the opposite. Eating an okay amount means the dog's
// current food portion is within a range 10% above and 10%
// below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects,
// and for each dog, calculate the recommended food portion
// and add it to the object as a new property. Do not create
// a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is
// in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's
// eating too much or too little. Hint: Some dogs have multiple
// owners, so you first need to find Sarah in the owners array,
// and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too
// much ('ownersEatTooMuch') and an array with all owners of
// dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in
// 3., like this: "Matilda and Alice and Bob's dogs eat too
// much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog
// eating exactly the amount of food that is recommended
// (just true or false)
// 6. Log to the console whether there
// is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an
// okay amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by
// recommended food portion in an ascending order (keep in mind
// that the portions are inside the array's objects 😉)

// Hints: § Use many different tools to solve these challenges,
// you can use the summary lecture to choose between them 😉 §
// Being within a range 10% above and below the recommended
// portion means: current > (recommended * 0.90) && current <
// (recommended * 1.10). Basically, the current portion should
// be between 90% and 110% of the recommended portion.
// const dogs = [
//   { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
//   { weight: 8, curFood: 200, owners: ["Matilda"] },
//   { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
//   { weight: 32, curFood: 340, owners: ["Michael"] },
// ];
// //1.
// dogs.forEach((obj) => {
//   obj.recommendedFood = Math.trunc(obj.weight ** 0.75 * 28);
// });
// console.log(dogs);
// //2.
// const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
// console.log(dogSarah);
// //3.
// const ownersEatTooMuch = dogs
//   .filter((dog) => dog.curFood > dog.recommendedFood)
//   .flatMap((dog) => dog.owners);
// const ownersEatTooLittle = dogs
//   .filter((dog) => dog.curFood < dog.recommendedFood)
//   .flatMap((dog) => dog.owners);

// console.log(ownersEatTooLittle);
// console.log(ownersEatTooMuch);

// //4.
// // "Matilda and Alice and Bob's dogs eat too much!" and
// // "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much`);
// console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little`);

// //5.

// console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

// //6.
// // current > (recommended * 0.90) && current <
// // (recommended * 1.10)
// const checkEatingOkay = (dog) =>
//   dog.curFood > dog.recommendedFood * 0.9 &&
//   dog.curFood < dog.recommendedFood * 1.1;
// console.log(dogs.some(checkEatingOkay));

// //7.
// console.log(dogs.filter(checkEatingOkay));

// //8.
// const dogsSorted = dogs
//   .slice()
//   .sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(dogsSorted);
