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
  render()
  {
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
}
