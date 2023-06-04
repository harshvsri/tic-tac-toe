const gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
let gameOver = false;
let playerMark = "X";
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
  console.log("reset");
  resetBoard();
});

// Adding Event Listener to board cell.
function addEventHandler(boardCell) {
  boardCell.addEventListener("click", () => {
    console.log("Click");
    if (!gameOver) {
      if (boardCell.textContent === "") {
        const row = parseInt(boardCell.dataset.row);
        const col = parseInt(boardCell.dataset.column);
        gameBoard[row][col] = playerMark;

        boardCell.textContent = playerMark;
        moveCount++;
        gameOver = haveWon(playerMark);

        if (gameOver) {
          gameResult.textContent = `Player ${playerMark} has won.`;
        } else if (moveCount === 9) {
          gameResult.textContent = `Game Draw`;
          gameOver = true;
        } else {
          playerMark = playerMark === "X" ? "O" : "X";
        }
      }
    }
  });
}

function haveWon(playerMark) {
  // Win Condition for row.
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] === playerMark &&
      gameBoard[i][1] === playerMark &&
      gameBoard[i][2] === playerMark
    ) {
      return true;
    }
  }

  // Win Condition for column.
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[0][i] === playerMark &&
      gameBoard[1][i] === playerMark &&
      gameBoard[2][i] === playerMark
    ) {
      return true;
    }
  }

  // Win Condition for diagonal.
  if (
    gameBoard[0][0] == playerMark &&
    gameBoard[1][1] == playerMark &&
    gameBoard[2][2] == playerMark
  ) {
    return true;
  }
  if (
    gameBoard[0][2] == playerMark &&
    gameBoard[1][1] == playerMark &&
    gameBoard[2][0] == playerMark
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
  playerMark = "X";
  moveCount = 0;

  // Clear the game result message
  gameResult.textContent = "";
}
