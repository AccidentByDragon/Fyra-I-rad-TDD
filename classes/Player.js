export default class Player {

  constructor(name, type, color, board) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.board = board;
  }
  get legalMove() {
    let moves = [];
    for (let row = 0; row < this.board.matrix.length; row++ ) {
      for(let column = 0; column < this.board.matrix[0].length; column ++ ) {
        if (this.board.matrix[row][column].color === ' '){
          moves.push([row, column]);
        }
      }
      return moves;
    }
  }

}