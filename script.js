var playerName = prompt('What is your name?');
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();




//date and time
let now = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th"];
let dayName = days[now.getDay()];
let startTime = new Date().getTime(); 
let date = now.getDate();
date = date + 1;
date = date % 10;

todayDate = months[now.getMonth()] + " " + now.getDate() + dayName + ", " + now.getFullYear();


document.getElementById("date").textContent = todayDate;

let animationId;

function startTimer() {
    startTime = new Date().getTime();
    updateTimer();
}

function updateTimer() {
    let now = new Date().getTime();
    let elapsed = (now - startTime) / 1000;
    document.getElementById("date").textContent =+ elapsed + " seconds";
    animationId = requestAnimationFrame(updateTimer); 
}

function stopTimer() {
    cancelAnimationFrame(animationId); 
    times.push(parseFloat(document.getElementById("date").textContent));
}






let answer = 0;
let guessCount = 0;
let totalWins = 0;
let times = [];
let scores = [];
let guesses = [];
let totalGuesses = 0;
let range = 0;
let GiveUp = false;

const inputField = document.getElementById("guess");
const actionButton = document.getElementById("guessBtn");

inputField.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    document.getElementById("guessBtn" ).click();
  }
});

//end game function
function endGame() {
  document.getElementById("guessBtn").disabled = true;
  document.getElementById("giveUpBtn").disabled = true;
  document.getElementById("playBtn").disabled = false;
  stopTimer();


  document.getElementById("wins").textContent = "Total wins: " + totalWins; 
  if (GiveUpClicked == false)  {
  scores.push(guessCount); 
  }
  else {
    if (range === 3) {
    scores.push(3);

    } else if (range === 10) {
    scores.push(10);
    } else if (range === 100) {
    scores.push(100);
    }
    document.getElementById("avgScore").textContent = "Your Average Score: " + (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  guesses.push(guessCount);
  document.getElementById("avgTime").textContent = "Average time: " + (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2) + " seconds";
  document.getElementById("fastest").textContent = "Fastest Game: " + (Math.min(...times));

  scores.sort(function(a, b) { return a - b; });
  let leaderboard = document.getElementsByName("leaderboard");
  for (let i = 0; i < leaderboard.length; i++) {
    if (i < scores.length) {
      leaderboard[i].textContent = "Score: " + scores[i];
    } else {
      leaderboard[i].textContent = "";
    }
  }
}
 


  
//when play button is clicked
document.getElementById("playBtn").addEventListener("click", function() {
  snackbar();
  let radios = document.getElementsByName("level");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      range = parseInt(radios[i].value);
    }
  }
  answer = Math.floor(Math.random() * range) + 1;
  guessCount = 0;     
  document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
  document.getElementById("guess").value = "";
  document.getElementById("guessBtn").disabled = false;
  document.getElementById("giveUpBtn").disabled = false;
  document.getElementById("playBtn").disabled = true;

  let levelRadios = document.getElementsByName("level");
  for (let i = 0; i < levelRadios.length; i++) {
   
} 
  
  startTimer();
  GiveUpClicked = false;
});



//when guess button is clicked
  document.getElementById("guessBtn").addEventListener("click", function() {
  let guess = parseInt(document.getElementById("guess").value);
  guessCount++;
  totalGuesses++;
    if (isNaN(guess)) {
      document.getElementById("msg").textContent = "Please enter a valid number.";
      return;
  }
    if (guess === answer) {
      totalWins++;
      document.getElementById("msg").textContent = "Correct! Congratulations " + playerName + "! You guessed the number in " + guessCount + " guesses.";
      endGame();
  } else if (guess < answer) {
      document.getElementById("msg").textContent = "Too low! Try again.";
  } else {
      document.getElementById("msg").textContent = "Too high! Try again.";
  }

  if (Math.abs(guess - answer) <= 2) {
      document.getElementById("msg").textContent += " You're hot!";
  }
  else if (Math.abs(guess - answer) <= 5) {
      document.getElementById("msg").textContent += " You're warm.";
  }
  else {
      document.getElementById("msg").textContent += " You're cold.";
  }
  });



  //when give up button is clicked
document.getElementById("giveUpBtn").addEventListener("click", function() {
  document.getElementById("msg").textContent = "The correct number was " + answer + ". Better luck next time!";
  totalWins++;
  GiveUpClicked = true; 
  endGame();
  
});
 
function darkmode() {
   let element = document.body;
   element.classList.toggle("dark-mode");
}

function snackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function popup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
