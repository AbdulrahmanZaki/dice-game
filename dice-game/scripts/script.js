"use strict";

// selecting elements
const scorePlayer1 = document.querySelector("#score--0");
const scorePlayer2 = document.querySelector("#score--1");

let diceEL = document.querySelector(".dice");

let currentScoreP1 = document.getElementById("current--0");
let currentScoreP2 = document.getElementById("current--1");

let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

const newGameBtn = document.querySelector(".btn--new");
const hold = document.querySelector(".btn--hold");
const roll = document.querySelector(".btn--roll");

const hiddenBtns = document.querySelectorAll(".hidden-btn");
//in case if the html elements holds other values so we init the scores to 0
scorePlayer1.textContent = 0; //will be converted to string in order to display them in the page
scorePlayer2.textContent = 0;

const winningScore = 20;

let scoresArr, currentScore, activePlayer, playing;

const inint = function () {
  scoresArr = [0, 0]; // stores the scores of players
  currentScore = 0;
  activePlayer = 0; // 0 for player 1 , 1 for player 2
  playing = true; // this variable to enable or disable buttons functionality

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;

  diceEL.classList.add("hidden");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");

  hold.classList.remove("hidden");
  roll.classList.remove("hidden");
};
window.onload = inint; // will call the function when load the window

/* let resetGame = function () {
  // --> make player 1 active player
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  diceEL.classList.add("hidden");

  // -->change the active player to player 1 (0)

  activePlayer = 0; // ! important because it can begin with player 2 if active player was 1
  // --> set the player's score current score to 0
  currentScore = 0;
  for (let i = 0; i < 2; i++) {
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = 0;
    scoresArr[i] = 0;
  }

  // --> reseting the game after winning

  for (let i = 0; i < 2; i++) {
    document.querySelector(`.player--${i}`).classList.remove("player--winner");
  }
  for (let i = 0; i < hiddenBtns.length; i++) {
    if (hiddenBtns[i].classList.contains("hidden")) {
      hiddenBtns[i].classList.remove("hidden");
    }
  }
}; */

const switchPlayer = function () {
  // --> this function will be called when there is a need to switch between players at anytime
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
  // ===> the above two lines as the same as
  /*   for(int i = 0 ; i < 2 ; i++){
    document.querySelector(`.player--${activePlayer}`).classList.toggle("player--active");
  } */
};

let rollDice = function () {
  if (playing) {
    // --> generate a dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // --> displaying the dice
    diceEL.classList.remove("hidden");
    diceEL.src = `../images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // --> swicth the players
      switchPlayer();
    }
  }
};

let holdScore = function () {
  if (playing) {
    // --> add and store the current score to the player's score
    scoresArr[activePlayer] += currentScore;

    // --> display the score
    document.getElementById(`score--${activePlayer}`).textContent =
      scoresArr[activePlayer];

    // -->  change current score style
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    // --> check if the player's score >= winning score
    if (scoresArr[activePlayer] >= winningScore) {
      playing = 0; // will disable the buttons
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      diceEL.classList.add("hidden");

      window.setInterval(inint, 10000); // will reset the game after 10s

      hold.classList.add("hidden");
      roll.classList.add("hidden");
    } else {
      // --> swicth the players
      switchPlayer();
    }
  }
};

roll.addEventListener("click", rollDice);
hold.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", inint);
