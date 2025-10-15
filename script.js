const board = document.getElementById("board");
const statusText = document.getElementById("status");
const gameContainer = document.getElementById("game");
const endScreen = document.getElementById("endScreen");
const endMessage = document.getElementById("endMessage");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
    cells.push("");
  }
  updateStatus();
}

function handleCellClick(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWin()) {
    showEndScreen(`Player ${currentPlayer} wins!`);
    return;
  }

  if (cells.every(cell => cell !== "")) {
    showEndScreen("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  createBoard();
}

function showEndScreen(message) {
  gameActive = false;
  gameContainer.style.display = "none";
  endScreen.style.display = "block";
  endMessage.textContent = message;
}

function newGame() {
  gameContainer.style.display = "block";
  endScreen.style.display = "none";
  restartGame();
}

createBoard();
