import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {
  constructor() {
    
  }
  start() {
    this.playAgain = true;
    while (this.playAgain) {
      this.setupGame();
      this.startGameLoop();
      this.checkGameOutcome();
      this.askToPlayAgain();
    }
}

  setupGame() {
    console.clear();
    console.log('Fyra i rad\n');
    this.playerX = new Player(prompt('Spelare X:s namn: '), 'X');

    do {
      this.playerO = new Player(prompt('Spelare O:s namn: '), 'O');
    } while (this.playerO.name === this.playerX.name);

    this.board = new Board();
  }

  startGameLoop() {
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();
      const player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;
      const column = prompt(`Ange ditt drag ${player.color} ${player.name} - skriv in column: `) - 1;
      this.board.makeMove(player.color, column);
    }
  }

  checkGameOutcome() {
    console.clear();
    this.board.render();
    const winner = this.board.winner ? (this.board.winner === 'X' ? this.playerX : this.playerO) : null;
    console.log(winner ? `Grattis ${winner.color}: ${winner.name} du vann!` : 'Tyvärr det blev oavgjort...');
  }

  askToPlayAgain() {
    this.playAgain = prompt('Vill ni spela igen? (ja/nej)? ').toLowerCase() === 'ja';
  }
}
