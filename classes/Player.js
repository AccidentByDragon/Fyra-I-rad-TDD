import shuffleArray from "./helpers/arrayShuffle.js";
import sleep from "./helpers/sleep.js"

export default class Player {

  constructor(name, type, color, board) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.opponent = this.color === 'Red' ? 'Yellow' : 'Red';
    this.board = board;
  }

  async makeBotMove() {
    // a short delay to make the bot seem more 'human'
    // (simulate that it takes time for it to think)
    // await sleep(1500);
    let row, column;
    if (this.type === 'A dumb bot') {
      await sleep(500/*Math.ceil(Math.random() * 2600) +*/);
      console.log(this.makeDumbBotMove());

      [row, column] = this.makeDumbBotMove()/*.filter((moves => moves == "undefined")*/; // la till filter för att få dumbBot att fungera med tester men det pajar den helt      
    }
    if (this.type === 'A smart bot') {
      await sleep(500/* Math.ceil(Math.random() * 800) + 350 */);
      [row, column] = this.makeSmartBotMove();
    }
    await this.board.makeMove(this.color, column);
  }

  makeDumbBotMove() {
    return shuffleArray(this.legalMoves)[0];
  }

  makeSmartBotMove() {
    // orgState - the current state on the board
    let orgState = this.state();
    // store scores for each possible move in scores
    let scores = [];
    
    // loop through/try each legal/possible move
    for (let [row, column] of this.legalMoves) {
      let cell = this.board.matrix[row][column];
      cell.color = this.color; // make temporary move
      let futureState = this.state(); // the state if we made this move
      cell.color = ' '; // undo temporary move
      // remember the score for this possible move
      scores.push({ row, column, score: this.score(orgState, futureState) });
    }
    scores = shuffleArray(scores).sort((a, b) => a.score > b.score ? -1 : 1);
    let { row, column } = scores[0];
    return [row, column];
  }
  score(orgState, futureState) {
    // priorities - what is considered the best outcome in each winCombo
    let priorities = [
      { me: 3 }, { opp: 2 }, { opp: 1 }, { me: 2 }, { me: 1 }
    ];
    // score variable - which we will use to calculate a score
    let score = 0;
    // loop through each part of the states, corresponding to a winCombo
    for (let i = 0; i < orgState.length; i++) {
      // short aliases for each orgState and futureState part
      // b - before/orgState, a - after/futureState
      let b = orgState[i], a = futureState[i];
      // no change in winCombo - not interesting
      if (b.me === a.me && b.opp === a.opp) { continue; }
      // winCombo can't be won be either player (both already have pieces in place)
      if (b.me > 0 && b.opp > 0) { continue; }
      // there has been change in this winCombo, so I must have added a piece
      let partScore = '';
      // partScore is how good are move is for ONE winCombo
      // partScore will become number of different priorities x 2 long
      // initially it is a string, but we will convert to a number before
      // adding to the total score
      for (let j = 0; j < priorities.length; j++) {
        let key = Object.keys(priorities[j])[0];
        let value = priorities[j][key];
        if (a[key] === value) { partScore += '01'; }
        else { partScore += '00'; }
      }
      score += +partScore;
    }

    // (the scoreing works well in Tic-Tac-Toe
    // but in Connect 4 it misses that what it considers the best move (highest score)
    // will sometimes give the opponent an opportunity to win by playing the same column
    // (ie. directly "above") the chosen move
    // you can avoid this by trying to play an opponent move in the same column
    // and if that gives a win set score to negative - 1)
    return score;
  }

   get legalMoves() {
    // which cells are free to choose?
    // anvädner Thomas kod då vi får fel annars, Dumma boten pajar efter ett tag, den vill forsätta göra drag i columner som är fulla
    let moves = [];
    for (let row = 0; row < this.board.matrix.length; row++) {
      for (let column = 0; column < this.board.matrix[0].length; column++) {
        if (this.board.matrix[row][column].color === ' ') {
          moves.push([row, column]);
        }
      }
    }
    return moves;
  }

  state() {
    let state = [];
    for (let winCombo of this.board.winChecker.winCombos) {
      state.push({
        me: winCombo.numberOfCells(this.color),
        opp: winCombo.numberOfCells(this.opponent)
      });
    }
    return state;
  }

  //Karls försök att göra botten smartare med hjälp av chatGPT
  // just nu blir alla utgångar negativa nummer så botten gör nästan random drag
  /* Frågor som stälts till Chatgpt:
    How to make this Connect 4 bot think one move in advance
    
  */
  // Försök 1
  scoreSmarter(orgState, futureState) {
    let priorities = [
      { me: 4 }, { opp: 4 }, { opp: 3 }, { me: 3 }, { opp: 2 }, { me: 2 }
    ];

    let oppPriorities = [
      { opp: 4 }, { me: 4 }, { me: 3 }, { opp: 3 }, { me: 2 }, { opp: 2 }
    ];
    let score = 0;
    let opponentScore = 0;


    // ChatGpts Förslag, är inte särskilt bra
    /*       for (let col = 0; col < futureState.length; col++) {
            let tempState = [...futureState];
            // Check if the column is available for the opponent to play
            if (tempState[col].opp < 4) { // Assuming 4 is the max in a column
              // Simulate opponent's move
              tempState[col].opp++;
              opponentScore += scoreMove(tempState);
            }
          }
          return opponentScore;
        };*/
    // Score the current move for the player
    const scoreMove = (state) => {
      let tempScore = 0;

      for (let i = 0; i < orgState.length; i++) {
        let b = orgState[i], a = state[i];

        if (b.me === a.me && b.opp === a.opp) { continue; }
        if (b.me > 0 && b.opp > 0) { continue; }

        let partScore = '';
        for (let j = 0; j < priorities.length; j++) {
          let key = Object.keys(priorities[j])[0];
          let value = priorities[j][key];
          partScore += (a[key] === value) ? '01' : '00';
        }
        tempScore += +partScore;
      }
      return tempScore;
    };
    // Function to evaluate the opponent's potential move
    const evaluateOpponentMoves = (state) => {
      let tempOppScore = 0;
      for (let i = 0; i < orgState.length; i++) {
        let b = orgState[i], a = state[i];

        if (b.me === a.me && b.opp === a.opp) { continue; }
        if (b.me < 0 && b.opp < 0) { continue; }

        let partScore = '';
        for (let j = 0; j < oppPriorities.length; j++) {
          let key = Object.keys(oppPriorities[j])[0];
          let value = oppPriorities[j][key];
          partScore += (a[key] === value) ? '01' : '00';
        }
        tempOppScore += +partScore;
      }
      return tempOppScore;
    };
    // Calculate the score for the player's move
    score += scoreMove(futureState);
    console.log(score)
    score -= evaluateOpponentMoves(futureState);
    console.log(score)

    // Now evaluate the opponent's possible moves and adjust the score
    //opponentScore += evaluateOpponentMoves(futureState);

    return score;    
  }  

  // försök 2 att förbättra score for smart bot
  scoreSmarter2(orgState, futureState) {
    // priorities - what is considered the best outcome in each winCombo
    let priorities = [
      { me: 4 }, { opp: 4 }, { opp: 3 }, { me: 3 }, { opp: 2 }, { me: 2 }
    ];
    // score variable - which we will use to calculate a score
    let score = 0;
    // calculate immediate threats
    for (let i = 0; i < orgState.length; i++) {

    }
    // loop through each part of the states, corresponding to a winCombo
    for (let i = 0; i < orgState.length; i++) {
      // short aliases for each orgState and futureState part
      // b - before/orgState, a - after/futureState
      let b = orgState[i], a = futureState[i];
      // no change in winCombo - not interesting
      if (b.me === a.me && b.opp === a.opp) { continue; }
      // winCombo can't be won be either player (both already have pieces in place)
      if (b.me > 0 && b.opp > 0) { continue; }
      // there has been change in this winCombo, so I must have added a piece
      let partScore = '';
      // partScore is how good are move is for ONE winCombo
      // partScore will become number of different priorities x 2 long
      // initially it is a string, but we will convert to a number before
      // adding to the total score
      for (let j = 0; j < priorities.length; j++) {
        let key = Object.keys(priorities[j])[0];
        let value = priorities[j][key];
        if (a[key] === value) {
          partScore += '01';
        }
        else if (a[key] === value - 1) {
          partScore += '10'; // Close to win
        }
        else if (orgState[i].opp === 3 && futureState[i].opp === 4) {
          score -= '1000'; // High penalty for letting the opponent win
        }
        else {
          partScore += '00';
        }

      }
      score += +partScore;
    }
    // (the scoreing works well in Tic-Tac-Toe
    // but in Connect 4 it misses that what it considers the best move (highest score)
    // will sometimes give the opponent an opportunity to win by playing the same column
    // (ie. directly "above") the chosen move
    // you can avoid this by trying to play an opponent move in the same column
    // and if that gives a win set score to negative - 1)
    // chatgpt förslag, har testa lägga till men det gör väldigt lite skilnad:
    // "Check for immediate threats
    /*     for (let i = 0; i < orgState.length; i++) {
      if (orgState[i].opp === 3 && futureState[i].opp === 4) {
        score -= 10; // High penalty for letting the opponent win
      }
      och
      for (let j = 0; j < priorities.length; j++) {
        let key = Object.keys(priorities[j])[0];
        let value = priorities[j][key];
        if (a[key] === value) {
          partScore += '01';
        } else if (a[key] === value - 1) {
          partScore += '10'; // Close to win
        } else {
          partScore += '00';
        }
      }
    }"" */

    console.log(score)
    return score;
  }
}


