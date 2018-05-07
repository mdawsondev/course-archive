function init() {
  var squares = document.querySelectorAll('.squares__square');
  var notification = document.querySelector('.settings__alert');
  var resetText = document.querySelector('.settings__reset');
  var titleColor = document.querySelector('.title__color');
  var diffBtn = document.querySelector('.settings__difficulty__button');
  var diffText = document.querySelector('.settings__difficulty__text');
  var colors = [];
  var pickedColor = null;

  resetText.addEventListener('click', setColors);
  diffBtn.addEventListener('click', setDifficulty);

  function setDifficulty() {
    for (let i = 0; i < 3; i++) {
      squares = document.querySelectorAll('.squares__square')
      squares[i].classList.toggle('inactive')
    }
    diffText.textContent === 'Hard' ? diffText.textContent = 'Easy' : diffText.textContent = 'Hard';
    squares = document.querySelectorAll('.squares__square:not(.inactive)')
    setColors()
  }

  function randomColor() {
    let rgb = [];
    for (let i = 0; i < 3; i++) {
      let r = Math.round(Math.random() * 225);
      rgb.push(r);
    }
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }

  function pickColors() {
    colors = [];
    for (let i = 0; i < squares.length; i++) {
      colors.push(randomColor());
    }
    let pick = Math.round(Math.random() * (squares.length - 1))
    pickedColor = colors[pick];
    titleColor.textContent = pickedColor;
  }

  function userChoice() {
    if (this.style.backgroundColor === pickedColor) {
      squares.forEach((square) => {
        notification.textContent = "Correct!"
        resetText.textContent = "Play Again?"
        square.classList.remove("hidden")
        square.style.backgroundColor = pickedColor;
      });
    } else {
      this.classList.add("hidden");
      notification.textContent = "Incorrect!"
    }
  }

  function setColors() {
    notification.textContent = ""
    resetText.textContent = "New Colors"
    squares.forEach((square) => {
      square.classList.remove("hidden");
    });
    pickColors();
    squares.forEach((square, i) => {
      square.style.backgroundColor = colors[i];
      square.addEventListener('click', userChoice);
    });
  }

  setColors();

};

init();
