import Cell from './Cell.js';

export default class WinCombo {

  constructor(cells) {
    console.log(cells);

    cells = cells.filter(x => x instanceof Cell);

    if (cells.length !== 4) {
      throw new Error('Each winning combination must contain four cells in a row.')
    }
    this.cells = cells;
  }

  numberOfCells(color) {
    // return how many cells in this WinCombo that has a certain color
    return this.cells.filter(cell => cell.color === color).length;
  }

  isWin(color) {
    // if all three cells are the same color we have a win
    return this.numberOfCells(color) === 4;
  }

}