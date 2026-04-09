var playerName = prompt('What is your name?');
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();












//date and time
let now = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["st", "nd", "rd", "th"];
let dayName = days[now.getDay()];
let startTime = new Date().getTime(); 


document.getElementById("date").textContent = date;


function updateTimer() {
    let now = new Date().getTime();
    let elapsed = (now - startTime) / 100; 
    document.getElementById("clock").textContent = elapsed.toFixed(2);
}

function stopTimer() {
    let now = new Date().getTime();
    let elapsed = (now - startTime) / 1000; 
    return elapsed;
}

function resetTimer() {
    startTime = new Date().getTime();
    document.getElementById("clock").textContent = "0.00";
}














let answer = 0;
let guessCount = 0;
let totalWins = 0;
let times = [];
let scores = [];
let guesses = [];
let totalGuesses = 0;





//end game function
function endGame() {
  document.getElementById("guessBtn").disabled = true;
  document.getElementById("giveUpBtn").disabled = true;
  document.getElementById("playBtn").disabled = false;

  stopTimer();


  document.getElementById("wins").textContent = "Total wins: " + totalWins; 
  scores.push(1000 / guessCount); 
    document.getElementById("avgScore").textContent = "Your Average Score: " + Math.round(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  guesses.push(guessCount);
  document.getElementById("avgTime").textContent = "Average time: " + (1000 / Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)).toFixed(2)
  document.getElementById("fastest").textContent = "Fastest Game: " + (Math.min(...guesses));

  scores.sort(function(a, b) { return b - a; });
  let leaderboard = document.getElementsByName("leaderboard");
  for (let i=0; i < leaderboard.length; i++) {
    if (i < scores.length) {
      leaderboard[i].textContent =  scores[i];
    } else {
      leaderboard[i].textContent = "";
    }
  }
}
 

  
//when play button is clicked
document.getElementById("playBtn").addEventListener("click", function() {
  let radios = document.getElementsByName("level");
  let range = 3;
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
    levelRadios[i].disabled = true;
} 

updateTimer();
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
      document.getElementById("msg").textContent = "Correct! Congratulations " + playerName + "! You guessed the number in " + guessCount + " guesses. Your score: " + (1000 / guessCount).toFixed(2);
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




  //when give up button is clicked
document.getElementById("giveUpBtn").addEventListener("click", function() {
  document.getElementById("msg").textContent = "The correct number was " + answer + ". Better luck next time!";
  endGame();
});
  });

