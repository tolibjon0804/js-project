const images = [
  "dice-1.png",
  "dice-2.png",
  "dice-3.png",
  "dice-4.png",
  "dice-5.png",
  "dice-6.png",
];
const rollDiceBtn = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const currentScorePlayer1 = document.querySelector("#current--0");
const currentScorePlayer2 = document.querySelector("#current--1");
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const holdScoreBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");

let currScore1 = 0;
let currScore2 = 0;
let turnPlayer2 = false;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

const addScore = function (randDice) {
  if (randDice === 0) {
    if (!turnPlayer2) {
      dice.src = images[randDice];
      currScore1 = 0;
      currentScorePlayer1.textContent = currScore1;
      turnPlayer2 = true;
      return currScore1;
    } else {
      dice.src = images[randDice];
      currScore2 = 0;
      currentScorePlayer2.textContent = currScore2;
      turnPlayer2 = false;
      return currScore2;
    }
  } else {
    if (!turnPlayer2) {
      dice.src = images[randDice];
      currScore1 += randDice + 1;
      currentScorePlayer1.textContent = currScore1;
      return currScore1;
    } else {
      dice.src = images[randDice];
      currScore2 += randDice + 1;
      currentScorePlayer2.textContent = currScore2;
      return currScore2;
    }
  }
};

rollDiceBtn.addEventListener("click", function () {
  let randomDice = Math.trunc(Math.random() * 6);
  addScore(randomDice);
});

holdScoreBtn.addEventListener("click", function () {
  if (!turnPlayer2) {
    scorePlayer1 += currScore1;
    score1.textContent = scorePlayer1;
    currScore1 = 0;
    currentScorePlayer1.textContent = 0;
    if (scorePlayer1 >= 100) {
      document.querySelector(".play").textContent = "1";
      modal.classList.remove("hidden");
      modal.classList.remove("overlay");
      rollDiceBtn.disabled = true;
      holdScoreBtn.disabled = true;
    }
    turnPlayer2 = true;
  } else {
    scorePlayer2 += currScore2;
    score2.textContent = scorePlayer2;
    currentScorePlayer2.textContent = 0;
    currScore2 = 0;
    if (scorePlayer2 >= 100) {
      document.querySelector(".play").textContent = "2";
      modal.classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
      rollDiceBtn.disabled = true;
      holdScoreBtn.disabled = true;
    }
    turnPlayer2 = false;
  }
});

newGameBtn.addEventListener("click", function () {
  currScore1 = 0;
  currScore2 = 0;
  turnPlayer2 = false;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  rollDiceBtn.disabled = false;
  holdScoreBtn.disabled = false;
});

closeModalBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});
