const board = document.querySelector(".game-board");

const symbols = ["X", "O"];

const randomSymbol = () => symbols[Math.floor(Math.random() * 2)];

for (let i = 0; i < 9; i++) {
  const boardCell = document.createElement("div");
  boardCell.textContent = randomSymbol();
  boardCell.classList.add("board-cell");
  board.appendChild(boardCell);
}

console.log(board);

// Factory Function.
function Player(name, symbol) {
  return { name, symbol };
}

const firstPlayer = Player("Harsh", "X");
const secondPlayer = Player("Aman", "O");
