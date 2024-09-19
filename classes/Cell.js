// Cell (add position on the board)

export default class Cell {

  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.color = ' '; // Eventually 'Red' or 'Yellow'
  }

  toString() {
    return this.color;
  }

}