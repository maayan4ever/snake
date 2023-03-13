const WIDTH = 10;
const RIGHT = 1;
const LEFT = -1;
const UP = -WIDTH;
const DOWN = WIDTH;

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector(".score span");
  const startBtn = document.querySelector(".start");

  let currentSnake = [2, 1, 0];
  let appleIndex = 0;
  let direction = 1;
  let intervalTime = 1000;
  let interval = 0;
  let score = 0;

  function clearGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    currentSnake = [2, 1, 0];
    squares[appleIndex].classList.remove("apple");
    updateScore(0);
    stop();
  }

  function startGame() {
    clearGame();
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    randomApple();
    interval = setInterval(() => {
      move();
    }, intervalTime);
  }

  function stop() {
    if (interval) clearInterval(interval);
  }

  function updateScore(nextScore = null) {
    nextScore !== null ? (score = nextScore) : (score += 1);
    scoreDisplay.textContent = score;
  }

  function move() {
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    const nextHead = currentSnake[0] + direction;
    if (
      nextHead < 0 ||
      nextHead >= WIDTH * WIDTH ||
      (direction === RIGHT && nextHead % WIDTH === 0) ||
      (direction === LEFT && nextHead % WIDTH === WIDTH - 1) ||
      squares[nextHead].classList.contains("snake")
    ) {
      return stop();
    }

    currentSnake.unshift(nextHead);
    squares[currentSnake[0]].classList.add("snake");

    handleEatingApple(tail);
  }

  function control(event) {
    if (event.keyCode === 39) {
      direction = RIGHT;
    } else if (event.keyCode === 37) {
      direction = LEFT;
    } else if (event.keyCode === 38) {
      direction = UP;
    } else if (event.keyCode === 40) {
      direction = DOWN;
    }
  }

  function handleEatingApple(tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      updateScore();
      randomApple();
    }
  }

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }

  startBtn.addEventListener("click", startGame);
  document.addEventListener("keyup", control);
});
