import prompt from '../helpers/prompt.js'
import Board from './classes/Board.js'

export default class App {
  constructor() {
    this.keepPlaying = true
    while (this.keepPlaying === true) {
      this.board = new Board()
      this.winnerAtGameOver()
      this.keepPlaying = this.boardReset()
    }
  }

  boardReset() {
    let playAgain = prompt('Spela en gång till? (ja/nej? ')
    if (playAgain !== 'ja') {
      return false
    } else {
      return true
    }
  }

 itIsATie() { 
    return this.matrix = [
        ['O', 'O', 'O', 'X', 'X', 'X', 'O'],
        ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
        ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
        ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
        ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
        ['O', 'X', 'O', 'X', 'O', 'X', 'O']
      ]
  } 
  
  winnerAtGameOver() {
    // console.clear()
    // this.board.render(this.itIsATie())
    // if (this.board.winner) {
    //   let winningPlayer = this.board.winner === 'X' ? this.playerX : this.playerO
    //   console.log(`Grattis ${winningPlayer.name} till vinsten!!!`);
    // } else {
    //   console.log('Spelet blev oavgjort');
    // }
    return 'Spelet blev oavgjort';
  }
}