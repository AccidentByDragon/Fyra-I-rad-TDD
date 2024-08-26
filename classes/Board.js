export default class Board {
  constructor() {
    this.matrix = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];
    this.winner = null;
    this.gameOver = false;
  }

  makeMove(color, column) {
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = color;
        this.winner = this.winCheck();
        if (this.winner || this.drawCheck()) {
          this.gameOver = true;
        }
        return true;
      }
    }
    return false; // if column is full
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

  drawCheck() {
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }
}



/* export default class Board {
  
  winCheck() {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [[0, 0], [0, 1], [0, 2][0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0][3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2][3, 3]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2][3, -3]] // diagonal 2 win
    
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
            let colorsInCombo = '';
            for (let [ro, co] of winType) {
              colorsInCombo += (m[r + ro] || [])[c + co];
            }
            if (colorsInCombo === color.repeat(3)) {
              return color;
            }
          }
        }
      }
    }
    return false;
  };

  // check for a draw/tie
  drawCheck() {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  };
}
*/