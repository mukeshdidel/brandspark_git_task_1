const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

// All possible winning combinations in a 3x3 grid
const winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  running = true;
}

function cellClicked(e) {
  const cellIndex = e.target.getAttribute('data-index');

  // If the cell is already full or the game is over, do nothing
  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(e.target, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Add a class for specific CSS styling (colors for X and O)
  cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    // Check if the three cells in a win condition all match the current player
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    running = false;
  } else if (!options.includes("")) {
    // If there are no empty strings left, it's a draw
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    // Move on to the next player
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  // Reset the UI
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('x', 'o');
  });

  running = true;
}