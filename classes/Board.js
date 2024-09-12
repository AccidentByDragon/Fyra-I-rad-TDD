export default class Board {
  constructor() {
    // 6 rows by 7 columns, typical for Connect Four
    this.matrix = Array(6).fill().map(() => Array(7).fill(' '));
  }

  makeMove(player, column) {
    // Check if the column index is within the valid range
    if (column < 0 || column >= this.matrix[0].length) {
      return false; // Invalid column
    }

    // Check if the column is full
    if (this.matrix[0][column] !== ' ') {
      return false; // The column is full, cannot make a move
    }

    // Find the lowest empty row in the column
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = player;
        return true; // Move was successful
      }
    }

    return false; // Just in case, although this shouldn't happen
  }
}
