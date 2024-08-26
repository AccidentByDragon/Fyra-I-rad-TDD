import prompt from '../helpers/prompt.js'
import Board from './classes/Board.js'

export default class App {
  constructor() {
    this.keepPlaying = true
      while (this.keepPlaying === true) {
        this.board = new Board()

        this.keepPlaying = this.boardReset()
      }
  }

  boardReset() {
    let playAgain = prompt('Spela en gång till? (Ja/Nej? ').toLowerCase()
    if (playAgain !== 'ja') {
      return false
    } else {
      return true
    }
  }
}