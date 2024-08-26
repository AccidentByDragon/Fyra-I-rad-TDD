// Se över om jag ens behöver denna innan merge:a

import prompt from '../helpers/prompt.js';
  import Board from './Board.js';
  import Player from '../classes/Player.js';


  export default class App {

    constructor() {
     
      
    }


    createPlayers() {
      console.clear();
      console.log('Fyra i rad\n');

      
      this.playerX = new Player(prompt('Spelare X:s namn: '), 'X');

    
      do {
        this.playerO = new Player(prompt('Spelare O:s namn: '), 'O');
        if (this.playerO.name === this.playerX.name) {
          console.log('Vänligen välj ett annat namn för Spelare O.');
        }
      } while (this.playerO.name === this.playerX.name);
    }


    startGameLoop() {
      // game loop
      while (!this.board.gameOver) {
        console.clear();
        this.board.render();
        let player = this.board.currentPlayerColor === 'X'
          ? this.playerX : this.playerO;
        let column = prompt(
          `Ange ditt drag ${player.color} ${player.name} - skriv in column: `
        ) - 1;
        
        this.board.makeMove(player.color, column);
      }
    }

    whoHasWonOnGameOver() {
      // the game is over
      console.clear();
      this.board.render();
      if (this.board.winner) {
        let winningPlayer = this.board.winner === 'X' ? this.playerX : this.playerO;
        console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`);
      }
      else {
        console.log('Tyvärr det blev oavgjort...');
      }
    }

  }