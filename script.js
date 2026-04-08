var playerName = prompt('What is your name?');


let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = days[now.getDay()];
let startTime = new Date().getTime(); 

let date = dayName + ", " + (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear();
document.getElementById("date").textContent = date;



let answer = 0;
let geussCount = 0;
let totalWins = 0;
let scores = [];
let totalGuesses = 0;


function endGame() {
  document.getElementById("guessBtn").disabled = true;
  document.getElementById("giveUpBtn").disabled = true;
  document.getElementById("playBtn").disabled = false;
  document.getElementById("wins").textContent = "Total wins: " + totalWins; 
  document.getElementById("avgScore").textContent = "Your score: " + (1000 / geussCount).toFixed(2);
  scores.push(1000 / geussCount); 
  document.getElementById("fastest").textContent = "Fastest time: " + (1000 / Math.min(...scores)).toFixed(2);
  document.getElementById("avgTime").textContent = "Average time: " + (1000 / Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)).toFixed(2);  
  document.getElementsByName("leaderboard").textContent = "Leaderboard: " + playerName + " - " + (1000 / geussCount).toFixed(2) + " points";
  }
 

  



document.getElementById("playBtn").addEventListener("click", function() {
  let radios = document.getElementsByName("level");
  let range = 3;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      range = parseInt(radios[i].value);
    }
  }
  answer = Math.floor(Math.random() * range) + 1;
  geussCount = 0;     
  document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
  document.getElementById("guess").value = "";
  document.getElementById("guessBtn").disabled = false;
  document.getElementById("giveUpBtn").disabled = false;
  document.getElementById("playBtn").disabled = true;

  let levelRadios = document.getElementsByName("level");
  for (let i = 0; i < levelRadios.length; i++) {
    levelRadios[i].disabled = true;
} 
});

  document.getElementById("guessBtn").addEventListener("click", function() {
  let guess = parseInt(document.getElementById("guess").value);
  geussCount++;
  totalGuesses++;

    if (guess === answer) {
     totalWins++;
      document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the number in " + geussCount + " guesses. Your score: " + (1000 / geussCount).toFixed(2);
      endGame();
  } else if (guess < answer) {
      document.getElementById("msg").textContent = "Too low! Try again.";
  } else {
      document.getElementById("msg").textContent = "Too high! Try again.";
  }
});

document.getElementById("giveUpBtn").addEventListener("click", function() {
  document.getElementById("msg").textContent = "The correct number was " + answer + ". Better luck next time!";
  endGame();
});



