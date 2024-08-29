Starta test genom att skriva _"npm test"_ i konsollen.

# Testkod snippets
```js
// Försök till alternativ oavgjord-test:
test('Check that the game is a draw when all the positions on the board are played without a win',
  () => {
    let app = new App
    let board = new Board
    expect(app.itIsATie().flat()).not.toBe(board.checkForDraw())
    // expect(app.itIsATie().flat()).not.includes(board.winCheck() && ' ')
  })

// Grundkod från Tre-i-rad för att avgöra oavgjort.
!this.winCheck() && !this.matrix.flat().includes(' ')


test('Check if the game is a tie', () => {
  let aBoard = new Board()
  expect(!aBoard.matrix.flat()).not.includes(' ')
})

test('Check if the game is a tie', () => {
  let aBoard = new Board()
  expect(!aBoard.matrix.flat()).not.includes(' ')
})



return !this.winCheck() && !this.matrix.flat().includes(' ')
```



# Exempel för Class / Constructor (receptet)
Beskriver hur klass fungerar:
```js

/*export default*/class Receptet {

  constructor( inparameter ) {
    this.egenskaper = inparameter
  }
  theMethod() {
    return `Använd inparametern ${this.egenskaper}!`
    }
}
//export default Receptet - Kan exporteras här eller direkt vid klassen

let instans_av_klassen = new Receptet(inparameter)


render() { // render = skriver ut något...
  console.table(this.matrisen) //skriver ut enkla tabeller i konsollen.
}

.map = ta alla världen i en array och omvanlda dem till ny array. 

//Exempel på kod som ändrar till versal begynelsebokstav och sedan gemener
['firstName', 'lastName'].map(x=>x[0].toUpperCase()+x.slice(1).toLowerCase())


Rita upp board

render() {
  let line = '\n' + '-'.repeat(10) + '\n'
  console.log(
    line + 
    this.matrix.map(row => row.map(column => `| ${column}`).join('')+')  )
}
```


# Tester från övriga i gruppen.
Karls tester:

```js
import fs from 'fs';
import { expect, test } from "vitest";
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPromptAndConsoleLog.js';
import App from "../classes/App.js";


test('The Board should ask if the player wishes to restart', () => {
  // setting mocked answers
  setMockAnswers('nej', 'end-test');
  // create an instance of App in case the program needs it.
  let app = new App().boardReset();
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ');
  //expect(() => app.boardReset()).toThrow('end-test');
})

test('The Board should reset itself if the player wishes to play again', () => {
  // setting mocked answers
  setMockAnswers('ja', 'end-test');
  // create an instance of App in case the program needs it.
  let app = new App();
  // checking program asks the correct questions
  //expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ')
  // when answered yes the board should reset and be clear
  expect(app.createBoard()).toEqual([
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ]);
  //expect(() => app.createBoard()).toThrow('end-test');
})

test('The Board should not change from its final state id the Player does not want to restart', () => {
  // setting moked answers
  setMockAnswers('nej', 'end-test');
  // create an instance of App in case the program needs it.
  let app = new App().boardReset();
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ');
  expect(app).toBe(false);
  //expect(() => app.boardReset()).toThrow('end-test');
})
```


Kiras tester:

```js
import { test, expect } from 'vitest';
import Board from '../classes/Board.js';

// Helper function to set up the board
function setBoardState(board, positions) {
  for (let { row, col, color } of positions) {
    board.matrix[row][col] = color;
  }
}

test('Horizontal win', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 0, col: 0, color: 'X' },
    { row: 0, col: 1, color: 'X' },
    { row: 0, col: 2, color: 'X' },
    { row: 0, col: 3, color: 'X' }
  ]);
  expect(board.winCheck()).toBe('X');
  
});

test('Vertical win', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 0, col: 0, color: 'O' },
    { row: 1, col: 0, color: 'O' },
    { row: 2, col: 0, color: 'O' },
    { row: 3, col: 0, color: 'O' }
  ]);
  expect(board.winCheck()).toBe('O');
});

test('Diagonal win (left to right)', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 0, col: 0, color: 'X' },
    { row: 1, col: 1, color: 'X' },
    { row: 2, col: 2, color: 'X' },
    { row: 3, col: 3, color: 'X' }
  ]);
  expect(board.winCheck()).toBe('X');
});

test('Diagonal win (right to left)', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 3, col: 0, color: 'O' },
    { row: 2, col: 1, color: 'O' },
    { row: 1, col: 2, color: 'O' },
    { row: 0, col: 3, color: 'O' }
  ]);
  expect(board.winCheck()).toBe('O');
});
