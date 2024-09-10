import sleep from './helpers/sleep.js';

export default class Board {

  constructor(app) {
    // how many rows and columns easily
    this.app = app;

    this.matrix = [...new Array(6)].map(row =>
      [...new Array(7)].map(column => ' ')
    );
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = [];
    this.latestMove = [];
  }

  // render = output/draw something
 render() {
  globalThis.makeMoveOnClick = async (column) =>
    (await this.makeMove(this.currentPlayerColor, column))
    && this.app.render();

  // Apply current player color and game status attributes to the body
  document.body.setAttribute('currentPlayerColor',
    this.gameOver ? '' : this.currentPlayerColor);
  document.body.setAttribute('gameInProgress',
    this.app.namesEntered && !this.gameOver);

  // Render the board as HTML
  return /*html*/`<div class="board">
    ${this.matrix.map((row, rowIndex) =>
    row.map((cell, columnIndex) => /*html*/`
      <div
        class="cell ${cell
      + (this.latestMove[0] === rowIndex && this.latestMove[1] === columnIndex
        ? 'latest-move' : '')
      + (this.winningCombo.includes('row' + rowIndex + 'column' + columnIndex)
        ? 'in-win' : '')
      + (cell === ' ' && this.matrix[rowIndex + 1]?.[columnIndex] !== ''
        ? 'first-free' : '')}"
        onclick="makeMoveOnClick(${columnIndex})">
      </div>
    `).join('')).join('')}
  </div>`;
}


 /* async makeMove(color, column) {

    if (document.body.getAttribute('moveInProgress') === 'true') { return; }
    // Don't make any move if the game is over
    if (this.gameOver) { return false; }

    // Check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }

    // Check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    // Check that the column is a number - otherwise don't make the move
    if (isNaN(column)) { return false; }

    // Check that the column is within bounds
    if (column < 0 || column >= this.matrix[0].length) { return false; }

    if (this.matrix[0][column] !== ' ') { return false; }
    // Find the lowest available row in the chosen column
    document.body.setAttribute('moveinProgress', true);
    this.latestMove = [];
    let row = 0;
    while (row < 6 && this.matrix[row][column] === ' ') {
      this.matrix[row][column] = this.currentPlayerColor;
      this.app.render();
      await sleep(50);
      this.matrix[row][column] = ' ';
      row++;
    }

    // Place the piece in the lowest available row
    this.latestMove = [row - 1, column]
    this.matrix[row - 1][column] = this.currentPlayerColor;

    // Check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();

    // The game is over if someone has won or if it's a draw
    this.gameOver = this.winner || this.isADraw;
    // Change the current player color
    !this.gameOver
      && (this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X');

    // Return true if the move could be made
    document.body.setAttribute('moveInProgress', false);
    return true;
  }
*/
  async makeMove(color, column) {
    
    if (document.body.getAttribute('moveInProgress') === 'true') { return; }

    if (this.gameOver || this.matrix[0][column] !== ' ') { return false; }

    
    if (color !== this.currentPlayerColor || isNaN(column)) { return false; }

    document.body.setAttribute('moveInProgress', true);

    
    let row = 0;
    while (row < 5 && this.matrix[row + 1][column] === ' ') {
      // Place the piece temporarily in the current row for animation
      this.matrix[row][column] = this.currentPlayerColor;
      this.app.render();  
      await sleep(150);   

      this.matrix[row][column] = ' ';
      row++;  
    }

  
    this.matrix[row][column] = this.currentPlayerColor;


    this.app.render();

    
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    this.gameOver = this.winner || this.isADraw;

  
    if (!this.gameOver) {
      this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
    }

  
    document.body.setAttribute('moveInProgress', false);

    return true;
  }



  winCheck() {
    let m = this.matrix;
    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // diagonal 2 win
    ];
    // loop through each player color, each position (row + column),
    // each winType/offsets and each offset coordinate added to the position
    // to check if someone has won :)
    for (let color of 'XO') {
      // r = row, c = column
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          // ro = row offset, co = column offset
          for (let winType of offsets) {
            let colorsInCombo = '', combo = [];
            for (let [ro, co] of winType) {
              colorsInCombo += (m[r + ro] || [])[c + co];
              combo.push('row' + (r + ro) + 'column' + (c + co));
            }
            if (colorsInCombo === color.repeat(4)) {
              this.winningCombo = combo; // remember the winning combo
              return color;
            }
          }
        }
      }
    }
    return false;
  }

  // check for a draw/tie
  drawCheck() {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }

}