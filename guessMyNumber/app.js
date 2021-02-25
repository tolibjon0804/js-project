const guess = document.querySelector(".guess");
const check = document.querySelector(".check");
const msg = document.querySelector(".message");
const number = document.querySelector(".number");
const score = document.querySelector(".score");
const highScr = document.querySelector(".highscore");
const again = document.querySelector(".again");

let scoreCurrentGame = parseInt(score.innerHTML);
let highScore = parseInt(highScr);
let allMoves = 0;

let randomNum = parseInt(Math.random() * 20 + 1);
console.log(randomNum);

check.addEventListener("click", function () {
  if (!guess.value) {
    msg.textContent = "⛔️ No number";
  } else {
    msg.textContent = guess.value;
    if (guess.value > randomNum) {
      if (allMoves !== 19) {
        msg.textContent = "Too high";
        scoreCurrentGame--;
        score.textContent = scoreCurrentGame;
        allMoves++;
      } else {
        msg.textContent = "You lose your all moves, play again";
        document.body.style.background = "red";
      }
    } else if (guess.value < randomNum) {
      if (allMoves !== 19) {
        msg.textContent = "Too low";
        scoreCurrentGame--;
        score.textContent = scoreCurrentGame;
        allMoves++;
      } else {
        msg.textContent = "You lose your all moves, play again";
        document.body.style.background = "red";
      }
    } else {
      msg.textContent = "Congrats! Your guess correct 🥳";
      number.textContent = randomNum;
      document.body.style.background = "#60b347";
      if (highScore > scoreCurrentGame) {
      } else {
        highScore = scoreCurrentGame;
        highScr.textContent = highScore;
      }
    }
  }
});

again.addEventListener("click", function () {
  guess.value = "";
  msg.textContent = "Start guessing...";
  document.body.style.background = "#222";
  number.textContent = "?";
  randomNum = parseInt(Math.random() * 20 + 1);
  console.log(randomNum);
  scoreCurrentGame = 20;
  score.textContent = scoreCurrentGame;
  allMoves = 0;
});
