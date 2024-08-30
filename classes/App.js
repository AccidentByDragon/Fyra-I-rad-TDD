import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {

    constructor() {
        this.board = this.createBoard();
    }

    start(){
        // a while-loop that let us play the game repeatedly
        while (true) {
            this.createPlayers();
            this.startGameLoop();
            this.whoHasWonOnGameOver();
            // ask if we should play again
            console.log('');
            let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
            if (playAgain !== 'ja') { break; }
            break;
        }
    }

    createPlayers() {
        console.clear();
        console.log('Fyra i rad\n');
    
        // Create Player X
        this.playerX = new Player(prompt('Spelare X:s namn: '), 'X');
    
        // Loop until Player O's name is different from Player X's name
        do {
            this.playerO = new Player(prompt('Spelare O:s namn: '), 'O');
            if (this.playerO.name === this.playerX.name) {
                console.log('Vänligen välj ett annat namn för Spelare O.');
            }
        } while (this.playerO.name === this.playerX.name);
    }
    

    startGameLoop() {
        // game loop - runs until the game is over
        while (!this.board.gameOver) {
            console.clear();
            this.board.render();
            let player = this.board.currentPlayerColor === 'X'
                ? this.playerX : this.playerO;
            let column = prompt(
                `Ange ditt drag ${player.color} ${player.name} - skriv in column: `
            )-1; 
            // convert row and columns to numbers and zero-based indexes
           // let [row, column] = move.split(',').map(x => +x.trim() - 1);
            // try to make the move
            this.board.makeMove(player.color, column);
        }
    }

    whoHasWonOnGameOver() {
        // the game is over, tell the player who has one or if we have a draw
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



createBoard() {
    return new Board();
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