
const cells = Array.from(document.querySelectorAll('.grid-cell'));

let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(event) {
  const cell = event.target;
  
  if (cell.classList.contains('disabled') || !gameActive) {
    return;
  }
  
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.classList.add('disabled');
  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
    return;
  }
  if (checkDraw()) {
    endGame('Draw!');
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.querySelector('.current-player').textContent = `Its ${currentPlayer} turn`;
}

function checkWin(player) {
  const winningCombinations=[
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
  ];
  
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].classList.contains(player.toLowerCase()));
  });
}

function checkDraw() {
  return cells.every(cell => cell.classList.contains('disabled'));
}

function endGame(message) {
  gameActive = false;
  
  document.querySelector('.game-over-text').textContent = message;
  document.querySelector('.restart').style.display = 'block';
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'grid-cell';
  });
  
  currentPlayer = 'X';
  gameActive = true;
  document.querySelector('.current-player').textContent = `Its ${currentPlayer} turn`;
  
  document.querySelector('.game-over-text').textContent = '';
//   document.querySelector('.restart').style.display = 'none';
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

document.querySelector('.restart').addEventListener('click', restartGame);