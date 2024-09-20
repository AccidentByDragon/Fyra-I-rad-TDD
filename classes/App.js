import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';

export default class App {

  constructor(playerRed, playerYellow, whoStarts = 'Red') {

    this.dialog = new Dialog();
    this.board = new Board(this);
    this.board.currentPlayerColor = whoStarts;
    this.whoStarts = whoStarts;
    this.setPlayAgainGlobals();
    if (playerRed && playerYellow) {
      this.playerRed = playerRed;
      this.playerYellow = playerYellow;

      this.playerRed.board = this.board;
      this.playerYellow.board = this.board;

      this.namesEntered = true;
      this.board.initiateBotMove();
    }
    else { this.askForNames(); }
    this.render();
  }

  async askForNames(color = 'Red') {
    const okName = name => name.match(/[a-zåäöA-ZÅÄÖ]{2,}/);
    let playerName = '';
    let playerType = '';
    while (!okName(playerName)) {
      playerName = await this.dialog.ask(`Enter the name of player ${color}:`);
      await sleep(500);
      playerType = await this.dialog.ask(
        `Which type of player is ${playerName}?`,
        ['Human', 'A dumb bot' /*'A smart bot'*/] 
        //vi kan lägga till en smart bot senare när vi fått en DUmb bot fungerande och löst Win check problemet då Smartbot fungerar inte utan wincheck och wincombo
      )
    }
    this['player' + color] = new Player(playerName, playerType, color, this.board);
    if (color === 'Red') { this.askForNames('Yellow'); return; }
    this.namesEntered = true;
    this.render();
  }

  namePossesive(name) {
    return name + (name.slice(-1).toLowerCase() !== 's' ? `'s` : `'`)
  }

  render() {
    let color = this.board.currentPlayerColor;
    let player = color === 'Red' ? this.playerRed : this.playerYellow;
    let name = player?.name || '';

    document.querySelector('main').innerHTML = /*html*/`
      <h1>Four in a Row</h1>
      ${!this.board.gameOver && player ?
        `<p>${color}: ${this.namePossesive(name)} turn...</p>`
        : (this.namesEntered ? '' : '<p>Enter names</p>')}
      ${!this.board.gameOver ? '' : /*html*/`
        ${!this.board.isADraw ? '' : `<p>It's a tie...</p>`}
        ${!this.board.winner ? '' : `<p>${color}: ${name} won!</p>`}
      `}
      ${this.board.render()}
      <div class="buttons">
        ${!this.board.gameOver ?
        this.renderQuitButton() :
        this.renderPlayAgainButtons()}
      </div>
    `;
  }

  renderQuitButton() {
    if (!this.namesEntered) { return ''; }

    globalThis.quitGame = async () => {
      let answer = await this.dialog.ask(
        'What do you want to do?',
        ['Continue the game', 'Play again', 'Enter new players']
      );
      answer === 'Play again' && globalThis.playAgain();
      answer === 'Enter new players' && globalThis.newPlayers();
    };

    return /*html*/`
      <div class="button" onclick="quitGame()">
        Quit this game
      </div>
    `;
  }

  setPlayAgainGlobals() {
    // play again 
    globalThis.playAgain = async () => {
      let playerToStart = this.whoStarts === 'Red' ? this.playerYellow : this.playerRed;
      await this.dialog.ask(
        `It's ${this.namePossesive(playerToStart.name)} turn to start!`, ['OK']);
      new App(this.playerRed, this.playerYellow, playerToStart.color);
    }
    // start a-fresh with new players
    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons() {
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Play again</div>
      <div class="button" href="#" onclick="newPlayers()">New players</div>
    `;
  }

}