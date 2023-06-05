const gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
const playerX = "X";
const playerO = "O";

let gameOver = false;
let currentPlayer = playerX;
let moveCount = 0;

const board = document.querySelector(".game-board");
const gameResult = document.querySelector(".result");
const resetButton = document.querySelector(".reset-btn");

// Printing Board.
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const boardCell = document.createElement("div");
    boardCell.textContent = "";
    boardCell.classList.add("board-cell");
    // Adding data to the boardCells.
    boardCell.dataset.row = i;
    boardCell.dataset.column = j;
    addEventHandler(boardCell);
    board.appendChild(boardCell);
  }
}

resetButton.addEventListener("click", () => {
  resetBoard();
});

// Adding Event Listener to board cell.
function addEventHandler(boardCell) {
  boardCell.addEventListener("click", () => {
    if (!gameOver) {
      if (boardCell.textContent === "") {
        const row = parseInt(boardCell.dataset.row);
        const col = parseInt(boardCell.dataset.column);
        gameBoard[row][col] = currentPlayer;

        boardCell.textContent = currentPlayer;
        moveCount++;
        gameOver = haveWon(currentPlayer);

        if (gameOver) {
          gameResult.textContent = `Player ${currentPlayer} has won.`;
        } else if (moveCount === 9) {
          gameResult.textContent = `Game Draw`;
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
      }
      // We can implement a message that the place is already occupied.
    }
  });
}

function haveWon(currentPlayer) {
  // Win Condition for row.
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] === currentPlayer &&
      gameBoard[i][1] === currentPlayer &&
      gameBoard[i][2] === currentPlayer
    ) {
      return true;
    }
  }

  // Win Condition for column.
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[0][i] === currentPlayer &&
      gameBoard[1][i] === currentPlayer &&
      gameBoard[2][i] === currentPlayer
    ) {
      return true;
    }
  }

  // Win Condition for diagonal.
  if (
    gameBoard[0][0] === currentPlayer &&
    gameBoard[1][1] === currentPlayer &&
    gameBoard[2][2] === currentPlayer
  ) {
    return true;
  }
  if (
    gameBoard[0][2] === currentPlayer &&
    gameBoard[1][1] === currentPlayer &&
    gameBoard[2][0] === currentPlayer
  ) {
    return true;
  }
  return false;
}

function resetBoard() {
  // Clear the game board array
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = " ";
    }
  }

  // Clear the displayed board cells
  const boardCells = document.querySelectorAll(".board-cell");
  boardCells.forEach((cell) => {
    cell.textContent = "";
  });

  // Reset game over flag, player mark, and move count
  gameOver = false;
  currentPlayer = playerX;
  moveCount = 0;

  // Clear the game result message
  gameResult.textContent = "";
}
