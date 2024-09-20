import Cell from './Cell.js'
import sleep from './helpers/sleep.js';
import WinChecker from './WinChecker.js';

// Game sounds
const playSound = new Audio('../public/sounds/plasticPlop.mp3');
const winningSound = new Audio('../public/sounds/katching.mp3');

export default class Board {

  constructor(app) {
    // how many rows and columns easily
    this.app = app;

    this.matrix = [...new Array(6)].map((row, rowIndex) =>
      [...new Array(7)].map((column, columnIndex) =>
        new Cell(rowIndex, columnIndex)));

    this.winChecker = new WinChecker(this);
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'Red';
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = null; //byt till [] senare?
    this.latestMove = [];
  }

  // render = output/draw something
  render() {
    // then call the app render method
    globalThis.makeMoveOnClick = async (column) =>
      (await this.makeMove(this.currentPlayerColor, column))
      && this.app.render();

    // so we can apply different styling depending on them
    document.body.setAttribute('currentPlayerColor',
      this.gameOver ? '' : this.currentPlayerColor);
    document.body.setAttribute('gameInProgress',
      this.app.namesEntered && !this.gameOver);

    // render the board as html
    return /*html*/`<div class="board">
      ${this.matrix.map((row, rowIndex) =>
        row.map((cell, columnIndex) =>/*html*/`
        <div
          class="cell ${cell} 
          ${this.winningCombo && this.winningCombo.cells.find(
          cell => cell.row === rowIndex && cell.column === columnIndex
        ) ? 'in-win' : ''}"          
          onclick="makeMoveOnClick(${columnIndex})">
        </div>
      `).join('')).join('')}
    </div>`;
  }

  async makeMove(color, column) {

    if (document.body.getAttribute('moveInProgress') === 'true') { return; }
    // Don't make any move if the game is over
    if (this.gameOver) { return false; }

    // Check that the color is Red or Yellow - otherwise don't make the move
    if (color !== 'Red' && color !== 'Yellow') { return false; }

    // Check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    // Check that the column is a number - otherwise don't make the move
    if (isNaN(column)) { return false; }

    // Check that the column is within bounds
    if (column < 0 || column >= this.matrix[0].length) { return false; }

    if (this.matrix[0][column].color !== ' ') { return false; }

    // Find the lowest available row in the chosen column
    document.body.setAttribute('moveInProgress', true);
    this.latestMove = [];
    let row = 0;
    while (row < 6 && this.matrix[row][column].color === ' ') {
      this.matrix[row][column].color = this.currentPlayerColor;
      this.app.render();
      await sleep(50);
      this.matrix[row][column].color = ' '
      row++;
    }

    // Place the piece in the lowest available row
    this.latestMove = [row, column]
    this.matrix[row - 1][column].color = this.currentPlayerColor;

    //Plays the drop sound
    playSound.play();

    // Check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();

    // The game is over if someone has won or if it's a draw
    this.gameOver = this.winner || this.isADraw;
    // Change the current player color
    !this.gameOver
      && (this.currentPlayerColor = this.currentPlayerColor === 'Red' ? 'Yellow' : 'Red');

    // Return true if the move could be made
    document.body.setAttribute('moveInProgress', false);
    this.initiateBotMove();
    return true;
  }


  winCheck() {
    console.log("running wincheck");    
    //console.log(winningCombo); // winningCOmbo blir undefined av någon anledning
    return this.winChecker.winCheck();
  }

  // check for a draw/tie
  drawCheck() {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().map(cell => cell.color).includes(' ');
  }

  async initiateBotMove() {
    // get the current player
    let player = this.currentPlayerColor === 'Red' ? this.app.playerRed : this.app.playerYellow;
    // if the game isn't over and the player exists and the player is non-human / a bot
    if (!this.gameOver && player && player.type !== 'Human') {
      document.body.classList.add('botPlaying');
      await player.makeBotMove();
      this.app.render();
      document.body.classList.remove('botPlaying');
    }
  }

}
