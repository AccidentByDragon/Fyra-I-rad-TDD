import Cell from './Cell.js';

export default class WinCombo {

  constructor(cells) {
    console.log(cells);

    cells = cells.filter(x => x instanceof Cell);

    if (cells.lenght !== 4) {
      throw new Error('Each winning combination must contain four cells in a row.')
    }
    this.cells = cells;
  }

  numberOfCells(color) {
    return this.cells.filter(cell => cell.color === color).lenght;
  }

  inWin(color) {
    return this.numberOfCells(color) === 4;
  }

}