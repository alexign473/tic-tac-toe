const gameBoard = (function () {
  let board;
  const winCons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const gameGrid = document.querySelector('#gameBoard');

  const getBoard = () => board;

  function render() {
    const html = board
      .map((cell, index) => `<div class="cell" data-cell="${index}">${cell}</div>`)
      .join(' ');

    gameGrid.innerHTML = html;
  }

  /**
   * @param {*} index
   * @param {*} marker
   * After click on the cell, getting cellIndex // 2
   * Find all possible win conditions with that index // [0, 1, 2], [2, 5 ,6]
   * Find some array in which each element in the board
   * at an index equal to the array element
   * is equal to the marker
   * and return boolean
   */
  function isWinningTurn(index, marker) {
    return winCons
      .filter((con) => con.includes(index))
      .some((arr) => arr.every((el) => board[el] === marker));
  }

  function makeTurn(index, marker) {
    if (board[index] !== '') return false;

    board[index] = marker;
    render();

    return isWinningTurn(index, marker);
  }

  function reset() {
    board = Array(9).fill('');
    render();
  }

  reset();

  return {
    gameGrid,
    getBoard,
    makeTurn,
    reset,
  };
})();

const player = (name, marker) => ({
  name,
  marker,
});

// Game
(() => {
  const { gameGrid, getBoard, makeTurn, reset } = gameBoard;
  const winnerEl = document.querySelector('#winner');
  const playerX = player('Boris', 'X');
  const playerO = player('Janna', 'O');
  let currentPlayer = playerX;
  let winner = null;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const onClick = (e) => {
    // Get index of clicked cell
    const cellIndex = e.target.dataset.cell;
    if (!cellIndex || winner) return;

    const isPlayerWon = makeTurn(+cellIndex, currentPlayer.marker);
    if (isPlayerWon) {
      winner = currentPlayer.marker;
      winnerEl.textContent = `The winner is ${winner}`;
    } else {
      const board = getBoard();
      // If board is full
      if (!board.includes('')) {
        winnerEl.textContent = `It's a DRAW`;
      }
    }
    switchPlayer();
  };

  const onReset = () => {
    currentPlayer = playerX;
    winner = null;
    winnerEl.textContent = '';
    reset();
  };

  const resetBtn = document.querySelector('#reset');
  resetBtn.addEventListener('click', onReset);
  gameGrid.addEventListener('click', onClick);
})();
