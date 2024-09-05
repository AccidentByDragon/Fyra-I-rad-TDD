export default class Board {

  constructor() {

    // A slighly more complex way of generating the board
    // - more flexible since we can change
    // how many rows and columns easily
    this.matrix = [...new Array(6)].map(row =>
      [...new Array(7)].map(column => ' ')
    );
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  // render = output/draw something
  render() {
    // A basic way of showing the board
    // console.table(this.matrix);
    // A more customized board with our own 
    // characters for row and column separation
    let line = '\n' + '-'.repeat(29) + '\n';
    console.log(
      line +
      this.matrix.map(row =>
        row.map(column => `| ${column} `).join('')
        + '|').join(line) +
      line
    );
  }

  makeMove(color, column) {
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

    // Find the lowest available row in the chosen column
    let row;
    for (row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        break;
      }
    }

    // If the column is full (no available row), return false
    if (row < 0) { return false; }

    // Place the piece in the lowest available row
    this.matrix[row][column] = color;

    // Change the current player color
    this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';

    // Check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();

    // The game is over if someone has won or if it's a draw
    this.gameOver = this.winner || this.isADraw;

    // Return true if the move could be made
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
    for (let color of 'XO') {
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          for (let winType of offsets) {
            let colorsInCombo = '';
            for (let [ro, co] of winType) {
              colorsInCombo += (m[r + ro] || [])[c + co];
            }
            if (colorsInCombo === color.repeat(4)) {
              return color;
            }
          }
        }
      }
    }
    return null;
  }


  // check for a draw/tie
  drawCheck() {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }

}

