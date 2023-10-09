let score = 20;
let highScore = 0;
let secretNumber;

//holding HTML elements in variables
const checkBtn = document.querySelector(".btn-check");
const againBtn = document.querySelector(".again");
const showHighScore = document.querySelector(".highscore");

// Generating a random number
let GenerateSecretNumber = () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log("the random number is = " + secretNumber);
  return secretNumber;
};
GenerateSecretNumber();
//storing the highscore
let checkHighScore = () =>
  highScore > score ? (highScore = highScore) : (highScore = score);

let showSecretNumber = (secretNumber) =>
  (document.querySelector(".number").innerHTML = secretNumber);

let showMessage = (message) =>
  (document.querySelector(".message").textContent = message);

let showScore = (score) =>
  (document.querySelector(".score").textContent = score);

let changeBgColor = (color) =>
  (document.querySelector("body").style.backgroundColor = color);

//check if the value taken from the textbox equals to the secretNumber
let checkTheNumber = function () {
  const numberHolder = Number(document.querySelector(".numebr-holder").value);

  //when the textbox is empty
  if (!numberHolder) {
    showMessage("🚫no number");
  } else if (numberHolder === secretNumber) {
    //when the number is correct
    showMessage("✅ correct");
    changeBgColor("#4dff4d");
    showSecretNumber(secretNumber);
    showHighScore.innerHTML = checkHighScore();
  } else if (numberHolder !== secretNumber) {
    //when the number is incorrect
    if (score >= 1) {
      showMessage(numberHolder > secretNumber ? "📈 Too high" : "📉 Too low");
      score--;
      showScore(score);
      console.log("wrong number " + numberHolder);
    } else {
      showMessage("🤯you lost the game try again💥");
      changeBgColor("#ff5050");
      showSecretNumber(secretNumber);
    }
  }
};

checkBtn.addEventListener("click", checkTheNumber);

//reset the game
let resetTheGame = function () {
  GenerateSecretNumber();
  score = 20;
  showScore(score);
  changeBgColor("#222");
  showMessage("start guessing...");
  const numberHolder = (document.querySelector(".numebr-holder").value = "");
  showSecretNumber("?");
};

againBtn.addEventListener("click", resetTheGame);

document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    checkTheNumber();
  }
});
