function playerName() {
  // getting the Names of Player1 and Player2 into 2 input fields
  var player1 = document.getElementById("input-player1").value;
  var player2 = document.getElementById("input-player2").value;

  // putting the Names of Player1 and Player2 into the #Player1 and #Player2 HTML items

  if (player1 === "") {
    document.getElementById("player1-wins").textContent = "Player 1 Wins:";
    //127.0.0.1:3000/Dice2/index.html
    http: document.getElementById("Player1").textContent = "Player 1";
  } else {
    document.getElementById("player1-wins").textContent = player1 + " Wins:";
    document.getElementById("Player1").textContent = player1;
  }

  if (player2 === "") {
    document.getElementById("player2-wins").textContent = "Player 2 Wins:";
    document.getElementById("Player2").textContent = "Player 2";
  } else {
    document.getElementById("player2-wins").textContent = player2 + " Wins:";
    document.getElementById("Player2").textContent = player2;
  }

  // clearing the input fields
  document.getElementById("input-player1").value = "";
  document.getElementById("input-player2").value = "";
}

// declaring the variables for all the result element HTML items
// and coverting the string into INT at the same time to be able to increment the value
var player1Wins = parseInt(document.getElementById("wins1").innerHTML, 10);
var numberOfDraws = parseInt(document.getElementById("draws").innerHTML, 10);
var player2Wins = parseInt(document.getElementById("wins2").innerHTML, 10);
var numberOfRounds = parseInt(
  document.getElementById("no-of-rounds").innerHTML,
  10
);

function resetResults() {
  player1Wins = 0;
  document.getElementById("wins1").textContent = player1Wins;
  numberOfDraws = 0;
  document.getElementById("draws").textContent = numberOfDraws;
  player2Wins = 0;
  document.getElementById("wins2").textContent = player2Wins;
  numberOfRounds = 0;
  document.getElementById("no-of-rounds").textContent = numberOfRounds;
}

// putting the Names of Player1 and Player2 into 2 Variables
var player1Name = document.getElementById("Player1").textContent;
var player2Name = document.getElementById("Player2").textContent;

var value1 = 0; // Store for Player 1's number
var value2 = 0; // Store for Player 2's number

const diceImages = [
  "./images/dice1.png",
  "./images/dice2.png",
  "./images/dice3.png",
  "./images/dice4.png",
  "./images/dice5.png",
  "./images/dice6.png",
];

// constant used to calculate dice roll duration
const duration = 1000;

// Get the image elements
var image1 = document.querySelector(".img1");
var image2 = document.querySelector(".img2");

var isFunction1Running = false;
var isFunction2Running = false;

function roll1() {
  isFunction1Running = true;
  // Change the dice image at regular intervals
  const intervalId = setInterval(() => {
    // Generate a random index to select a dice image
    value1 = Math.floor(Math.random() * diceImages.length) + 1;
    // Set the new dice image
    image1.src = diceImages[value1 - 1];
  }, 100); // Change image every 100 milliseconds

  // Stop changing the dice image after the specified duration
  setTimeout(() => {
    clearInterval(intervalId);
    isFunction1Running = false;
    if (value2 !== 0) {
      attemptToCompare();
    }
  }, duration * Math.random() * 2);

  document.getElementById("img1-container").style.borderColor = "white";

  document.getElementById("img1-container").removeEventListener("click", roll1);
}

function roll2() {
  isFunction2Running = true;
  // Change the dice image at regular intervals
  const intervalId = setInterval(() => {
    // Generate a random index to select a dice image
    value2 = Math.floor(Math.random() * diceImages.length) + 1;
    // Set the new dice image
    image2.src = diceImages[value2 - 1];
  }, 100); // Change image every 100 milliseconds

  // Stop changing the dice image after the specified duration
  setTimeout(() => {
    clearInterval(intervalId);
    isFunction2Running = false;
    if (value1 !== 0) {
      attemptToCompare();
    }
  }, duration * Math.random() * 2);

  document.getElementById("img2-container").style.borderColor = "white";

  document.getElementById("img2-container").removeEventListener("click", roll2);
}

function attemptToCompare() {
  if (!isFunction1Running && !isFunction2Running) {
    compareNumbers();
  }
}

// Function to compare the two numbers and display the result
function compareNumbers() {
  // reeding out Player1 and Player2 Names
  var player1Name = document.getElementById("Player1").textContent;
  var player2Name = document.getElementById("Player2").textContent;

  // Conditioning the change of the HTML title according to the values of dice roll
  // and incrementing the right result values according to the roll
  if (value1 > value2) {
    if (player1Name === "") {
      document.querySelector("h1").innerHTML = "Player 1 Wins!";
    } else {
      document.querySelector("h1").innerHTML = player1Name + " Wins!";
    }
    player1Wins += 1;
    document.getElementById("wins1").textContent = player1Wins;
  } else if (value2 > value1) {
    if (player2Name === "") {
      document.querySelector("h1").innerHTML = "Player 2 Wins!";
    } else {
      document.querySelector("h1").innerHTML = player2Name + " Wins!";
    }
    player2Wins += 1;
    document.getElementById("wins2").textContent = player2Wins;
  } else {
    document.querySelector("h1").innerHTML = "It's a Draw!";
    numberOfDraws += 1;
    document.getElementById("draws").textContent = numberOfDraws;
  }

  // Calculate the total number of rounds (games played)
  numberOfRounds = player1Wins + numberOfDraws + player2Wins;
  document.getElementById("no-of-rounds").textContent = numberOfRounds;
}

// new round function for resetting the images
function newRound() {
  value1 = 0;
  value2 = 0;
  document.getElementById("img1-container").style.borderColor = null;
  document.getElementById("img2-container").style.borderColor = null;
  document.getElementById("img1-container").addEventListener("click", roll1);
  document.getElementById("img2-container").addEventListener("click", roll2);
  image1.src = diceImages[0];
  image2.src = diceImages[0];
}

// Event listener for image 1
document.getElementById("img1-container").addEventListener("click", roll1);

// Event listener for image 2
document.getElementById("img2-container").addEventListener("click", roll2);

// calling the resetResults function by pressing btn "Reset Score"
document.querySelector(".btn").addEventListener("click", resetResults);

// calling the playerName function by pressing btn2 "Accept"
document.querySelector(".btn2").addEventListener("click", playerName);

// calling the newRounf function by pressing the button "New Round"
document.getElementById("new-round").addEventListener("click", newRound);
