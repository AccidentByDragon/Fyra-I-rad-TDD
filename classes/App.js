import prompt from '../helpers/prompt.js'
import Board from './Board.js'

export default class App {
  constructor() {
    this.keepPlaying = true;
    while (this.keepPlaying === true) {
      this.board = new Board()
      //resten av appens logik ska vara här
      this.keepPlaying = this.boardReset()
    }
  }


boardReset() {
  let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
  if (playAgain !== 'ja')
    {
      return false;
  }
  else {
    return true
  }
  }
}