let Player = function(name, symbol, value) {
  let player = {};
  player.name = name;
  player.symbol = symbol;
  player.value = value;
  return player;
};

let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function isGameOver() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
      return true;
    }
  }
  return false;
}

let xButton = document.querySelector(".x-button");
let oButton = document.querySelector(".o-button");

xButton.addEventListener("click", function() {
  let player = Player(document.querySelector("#name-input").value, "X", 1);
  restartGame();
  playGame(player);
})

oButton.addEventListener("click", function() {
  let player = Player(document.querySelector("#name-input").value, "O", 2);
  restartGame();
  playGame(player);
})

function playGame(player) {
  let boxes = document.querySelectorAll(".box");

  // Reset event listeners to avoid multiple bindings
  boxes.forEach(box => {
    box.replaceWith(box.cloneNode(true));
  });

  boxes = document.querySelectorAll(".box");

  for (let i = 0; i < 9; i++) {
    boxes[i].addEventListener("click", function boxClickHandler() {
      if (boxes[i].textContent !== "") return; // Prevent overwriting a filled box
      boxes[i].textContent = player.symbol;
      gameboard[i] = player.value;

      if (isGameOver()) {
        let dialog = document.querySelector("dialog");
        dialog.textContent = `${player.name} wins!`;
        dialog.showModal();
        restartGame();
        return;
      };

      let cpuChoice;
      do {
        cpuChoice = Math.floor(Math.random() * 9);
      } while (gameboard[cpuChoice] !== 0);

      if (player.value === 1) {
        boxes[cpuChoice].textContent = "O";
        gameboard[cpuChoice] = 2;
      } else {
        boxes[cpuChoice].textContent = "X";
        gameboard[cpuChoice] = 1;
      }

      if (isGameOver()) {
        let dialog = document.querySelector("dialog");
        dialog.textContent = "CPU wins!";
        dialog.showModal();
        restartGame();
        return;
      };
    })
  }
  return;
}

function restartGame() {
  let boxes = document.querySelectorAll(".box");
  for (let i = 0; i < 9; i++) {
    boxes[i].textContent = "";
    gameboard[i] = 0;
  }
}

let dialog = document.querySelector("dialog");
dialog.addEventListener("click", function() {
  dialog.close();
})
