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
    return false; 
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



