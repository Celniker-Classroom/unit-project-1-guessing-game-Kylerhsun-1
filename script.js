let name = prompt('What is your name?');


let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = days[now.getDay()];
let startTime = new Date().getTime(); 

let date = dayName + ", " + (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear();
document.getElementById("date").textContent = date;




function $(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = $(id);
  if (element) {
    element.textContent = String(value);
  }
}

function getRandomNum(max) {
  const value = parseInt(max, 10);
  if (Number.isNaN(value) || value < 1) {
    return 0;
  }
  return Math.floor(Math.random() * value) + 1;
}

let targetNumber = null;

function play() {
  const selected = document.querySelector('input[name="level"]:checked');
  if (!selected) {
    setText('msg', 'Please select a level first.');
    return;
  }

  const difficulty = selected.value;
  let levelName = 'Unknown';

  if (difficulty === '3') {
    levelName = 'Easy';
  } else if (difficulty === '10') {
    levelName = 'Medium';
  } else if (difficulty === '100') {
    levelName = 'Hard';
  }

  targetNumber = getRandomNum(difficulty);
  setText('msg', `${levelName} selected. Guess a number between 1 and ${difficulty}.`);
  $('guessBtn').disabled = false;
  $('giveUpBtn').disabled = false;
  $('guess').disabled = false;

  console.log('Target number:', targetNumber);
}

 