import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import Network from './helpers/Network.js';
import sleep from './helpers/sleep.js';
import generateCode from './helpers/generateCode.js';

export default class App {

  constructor(playerRed, playerYellow, whoStarts = 'Red', networkPlay = false, myColor) {

// network related properties
    this.networkPlay = networkPlay;
    this.myColor = myColor; // note: only used in network play

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

      if (networkPlay) {
        Network.replaceListener(obj => this.networkListener(obj));
      }
    }
    else { this.askForNamesAndTypes(); }
    this.render();
  }

  async askIfNetworkPlay() {
    this.networkPlay = (await this.dialog.ask(
      `Network Play: Do you want to play<br>against a friend via the Internet?`, ['Yes', 'No'])) === 'Yes';
    await sleep(1000);
    if (!this.networkPlay) { return; }
    let startNetworkPlay = (await this.dialog.ask(
      'Do you want to create a new network game? Or join one?', ['Create', 'Join'])) === 'Create';
    await sleep(1000);
    let name = await this.dialog.ask('Enter your name:');
    await sleep(1000);
    if (startNetworkPlay) {
      this.myColor = 'Red';
      let code = generateCode();
      Network.startConnection(name, code, obj => this.networkListener(obj));
      let extra = '';
      while (!this.bothNetworkPlayersHasJoined) {
        await this.dialog.ask(
          `Send the following join code to your friend:<br>
          <input type="text" name="joinCode" readonly value="${code}">${extra}`, ['OK']);
        extra = '<br>Waiting for your friend to join...'
        await sleep(1000);
      }
    }
    else {
      this.myColor = 'Yellow';
      let extra = '';
      while (!this.bothNetworkPlayersHasJoined) {
        let code = await this.dialog.ask(`Enter a the join code you got from your friend:${extra}`);
        this.joiners = [];
        this.enteredJoinCode = code;
        Network.startConnection(name, code, obj => this.networkListener(obj));
        extra = '<br>Incorrect join code... Try again...';
        await sleep(5000);
      }
    }
    // create players
    this.playerRed = new Player(this.joiners.shift(), 'Human', 'Red', this.board);
    this.playerYellow = new Player(this.joiners.shift(), 'Human', 'Yellow', this.board);
    this.namesEntered = true;
    this.render();
  }

  networkListener({ user, timestamp, data }) {
    // keep this console.log until you understand how 
    // and which network messages are sent
    console.log(user, timestamp, data);

    // wait for both players to join
    this.joiners = this.joiners || [];
    if (user === 'system' && data.includes('joined channel')) {
      this.joiners.push(data.split(' ')[1]);
      this.bothNetworkPlayersHasJoined = this.joiners.length >= 2;
    }

    // remove dialog/modal for player X when player O has joined
    if (this.myColor === 'Red'
      && this.bothNetworkPlayersHasJoined
      && document.querySelector('dialog input[name="joinCode"]')
    ) {
      let okButton = document.querySelector('dialog .button.OK');
      okButton && okButton.click();
    }

    // make move sent to us from opponent via the network
    if (data.color && data.color !== this.myColor) {
      let { color, column } = data;
      this.board.makeMove(color, column, false) && this.render();
    }

    // if playAgain sent to player O from player X, playAgain
    if (this.myColor === 'Yellow' && data.action === 'playAgain') {
      globalThis.playAgain();
    }
  }

  async askForNamesAndTypes(color = 'Red') {
    color === 'Red' && await this.askIfNetworkPlay();
    if (this.networkPlay) { return; }
    const okName = name => name.match(/[a-zåäöA-ZÅÄÖ]{2,}/);
    let playerName = '';
    let playerType = '';
    while (!okName(playerName)) {
      playerName = await this.dialog.ask(`Enter the name of player ${color}:`);
      if (!this.networkPlay) {
      await sleep(500);
      playerType = await this.dialog.ask(
        `Which type of player is ${playerName}?`,
        ['Human', 'A dumb bot', 'A smart bot']
        //vi kan lägga till en smart bot senare när vi fått en DUmb bot fungerande och löst Win check problemet då Smartbot fungerar inte utan wincheck och wincombo
      )
    }
    else {
      playerType = 'Human';
    }
  }

    this['player' + color] = new Player(playerName, playerType, color, this.board);
    if (color === 'Red' && !this.networkPlay) { this.askForNamesAndTypes('Yellow'); return; }
    this.namesEntered = true;
    this.render();
    this.board.initiateBotMove();
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
    if (this.networkPlay && this.myColor !== this.board.currentPlayerColor) {
      document.body.classList.add('notMyTurn');
    }
    else {
      document.body.classList.remove('notMyTurn');
    }
  }

  

  renderQuitButton() {
    if (!this.namesEntered) { return ''; }

    // don't show button for the joining player during network play
    if (this.networkPlay && this.myColor === "Yellow") { return ''; }

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
      
  // if network  and player X, then send 'playAgain' to player O
  if (this.networkPlay && this.myColor === 'Red') {
    Network.send({ action: 'playAgain' });
  }
  new App(this.playerRed, this.playerYellow, playerToStart.color,
    this.networkPlay, this.myColor);
  }
// start a-fresh with new players
   globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons() {

    // don't show buttons for the joining player during network play
    if (this.networkPlay && this.myColor === 'Yellow') { return ''; }

    // why not use the button element? 
    // div tags are easier to style in a cross-browser-compatible way
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Play again</div>
      <div class="button" href="#" onclick="newPlayers()">New players</div>
    `;
  }

}