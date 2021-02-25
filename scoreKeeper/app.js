const p1Btn = document.querySelector('#p1Button');
const p2Btn = document.querySelector('#p2Button');
const reset = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Score');
const p2Display = document.querySelector('#p2Score');
const winPlayTo = document.querySelector('#playTo');


let p1Score = 0;
let p2Score = 0;
let isGameOver = false;
let winningScore = 3;

p1Btn.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add('winner');
            p2Display.classList.add('loser');
            p1Btn.disabled = true;
            p2Btn.disabled = true;
        }
        p1Display.textContent = p1Score;
    }
});

p2Btn.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score === winningScore) {
            isGameOver = true;
            p2Display.classList.add('winner');
            p1Display.classList.add('loser');
            p1Btn.disabled = true;
            p2Btn.disabled = true;

        }
        p2Display.textContent = p2Score;
    }
});


reset.addEventListener('click', function () { reset1() });


winPlayTo.addEventListener('change', function () {
    winningScore = parseInt(this.value);

    reset1();
});


function reset1() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove('winner', 'loser');
    p2Display.classList.remove('winner', 'loser');
    p1Btn.disabled = false;
    p2Btn.disabled = false;

}



