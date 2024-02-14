let currentPlayer ='X';

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function isEmptycell (cell){
  return cell.innerHTML.trim() === '';
}

function playerMove(cell){
  if(isEmptycell(cell)){
    togglePlayer();
    cell.innerHTML = currentPlayer;
    checkWin();
  }
}

function clickHandler(event) {
  const clickedCell = event.target;
  playerMove(clickedCell);
}

document.querySelectorAll('.table-move').forEach(cell => {
  if (isEmptycell(cell)) {
    cell.addEventListener('click', clickHandler);
  }
});

function checkWin(){
  const winCombos = [
    ['.js-row-1', '.js-row-2', '.js-row-3'], // Top row
    ['.js-row-4', '.js-row-5', '.js-row-6'], // Middle row
    ['.js-row-7', '.js-row-8', '.js-row-9'], // Bottom row
    ['.js-row-1', '.js-row-4', '.js-row-7'], // Left column
    ['.js-row-2', '.js-row-5', '.js-row-8'], // Middle column
    ['.js-row-3', '.js-row-6', '.js-row-9'], // Right column
    ['.js-row-1', '.js-row-5', '.js-row-9'], // Diagonal from top-left to bottom-right
    ['.js-row-3', '.js-row-5', '.js-row-7']  // Diagonal from top-right to bottom-left
  ];
  for(const combo of winCombos){
    const symbols =combo.map(selector => document.querySelector(selector).innerHTML.trim());
    if (symbols.every(symbol => symbol === 'X') || symbols.every(symbol => symbol === 'O')){
      document.querySelector('.win-message').textContent = `Winner is: ${symbols[0]}`;
      document.querySelectorAll('.table-move').forEach(cell =>{
        cell.removeEventListener('click',clickHandler);
      });
      return true;
    }
  }

  const allCellsFilled = [...document.querySelectorAll('.table-move')].every(cell => cell.textContent !== '');
  if (allCellsFilled) {
    document.querySelector('.win-message').textContent = 'Ties, no one wins!';
    return true;
  }

  return false;
}


document.addEventListener('DOMContentLoaded', function() {
  const resetButton = document.querySelector('.js-reset-btn');
  function resetGame(){
    const cells = document.querySelectorAll('.table-move');
    cells.forEach(cell=>{
      cell.textContent='';
    });
    const winMessage = document.querySelector('.win-message');
    winMessage.textContent = '';

    cells.forEach(cell=>{
      cell.addEventListener('click',clickHandler);
    })
  }
  resetButton.addEventListener('click', resetGame);
});
