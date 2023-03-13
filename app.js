const WIDTH = 10;
const RIGHT = 1;
const LEFT = -1;
const UP = -WIDTH;
const DOWN = WIDTH;

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  let currentSnake = [2, 1, 0];
  let direction = 1;
  let intervalTime = 1000;
  let interval = 0;

  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(() => {
      move();
    }, intervalTime);
  }

  function stop() {
    if (interval) clearInterval(interval);
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

  startBtn.addEventListener("click", startGame);
  document.addEventListener("keyup", control);
});
