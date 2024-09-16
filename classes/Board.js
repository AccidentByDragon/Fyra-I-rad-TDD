import sleep from './helpers/sleep.js';

// Game sounds
const playSound = new Audio('../public/sounds/plasticPlop.mp3');
const winningSound = new Audio('../public/sounds/katching.mp3');


export default class Board {

  constructor(app) {
    // how many rows and columns easily
    this.app = app;

    this.matrix = [...new Array(6)].map(row =>
      [...new Array(7)].map(column => ' ')
    );
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'Red';
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = [];
    this.latestMove = [];
  }

  // render = output/draw something
  render() {
    // then call the app render method
    globalThis.makeMoveOnClick = async (column) =>
      (await this.makeMove(this.currentPlayerColor, column))
      && this.app.render();

    // so we can apply different styling depending on them
    document.body.setAttribute('currentPlayerColor',
      this.gameOver ? '' : this.currentPlayerColor);
    document.body.setAttribute('gameInProgress',
      this.app.namesEntered && !this.gameOver);

    // render the board as html
    return /*html*/`<div class="board">
      ${this.matrix.map((row, rowIndex) =>
      row.map((cell, columnIndex) =>/*html*/`
        <div
          class="cell ${cell
        + (this.latestMove[-1] === rowIndex && this.latestMove[1] === columnIndex
          ? 'latest move' : '')
        + (cell === ' ' && this.matrix[rowIndex + 1]?.[columnIndex] !== ''
            ? 'first-free' : '')
        + (this.winningCombo.includes('row' + rowIndex + 'column' + columnIndex)
              ? 'in-win' : '') 
        }"
          
          onclick="makeMoveOnClick(${columnIndex})">
        </div>
      `).join('')).join('')}
    </div>`;
  }

  async makeMove(color, column) {

    if (document.body.getAttribute('moveInProgress') === 'true') {return;}
    // Don't make any move if the game is over
    if (this.gameOver) { return false; }

    // Check that the color is X or O - otherwise don't make the move
    if (color !== 'Red' && color !== 'Yellow') { return false; }

    // Check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    // Check that the column is a number - otherwise don't make the move
    if (isNaN(column)) { return false; }

    // Check that the column is within bounds
    if (column < 0 || column >= this.matrix[0].length) { return false; }

    if (this.matrix[0][column] !== ' ') {return false;}
    // Find the lowest available row in the chosen column
   document.body.setAttribute('moveinProgress', true);
   this.latestMove =[];
   let row = 0;
   while (row < 6 && this.matrix[row][column] === ' ') {
    this.matrix[row][column] = this.currentPlayerColor;
    this.app.render();
    await sleep(50);
    this.matrix[row][column] = ' ';
    row++;
   }

    // Place the piece in the lowest available row
    this.latestMove = [row, column]
    this.matrix[row -1][column] = this.currentPlayerColor;

    playSound.play(); //Plays the drop sound

    // Check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();

    // The game is over if someone has won or if it's a draw
    this.gameOver = this.winner || this.isADraw;
// Change the current player color
    !this.gameOver
      && (this.currentPlayerColor = this.currentPlayerColor === 'Red' ? 'Yellow' : 'Red');
    
    // Return true if the move could be made
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
    for (let color of ['Red', 'Yellow']) {
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
              winningSound.play(); //Plays the winning sound
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

