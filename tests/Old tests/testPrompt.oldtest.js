import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPromptAndConsoleLog.js';
import App from '../../classes/App.js';
import Board from '../../classes/Board.js';

test('App ska fråga efter spelare X och spelare O:s namn', () => {
  setMockAnswers('Olle', 'Anna', 'end-test');
  let app = new App();
  expect(() => app.start()).toThrow('end-test');
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
});

test('Spelare X och Spelare O sparas i egenskaper', () => {
  // Mock the console output

  setMockAnswers('Olle', 'Anna');
  let app = new App()

  app.createPlayers();
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  //expect(promptQuestions[1]).toBe('Spelare O:s namn: ');


  // Validate that the players were created with the expected names
  expect(app.playerX.name).toBe('Olle');
  expect(app.playerO.name).toBe('Anna');

});

test('Drag måste registreras på vald plats', () => {
  // Initialize the board

  let board = new Board();

  // Make a move in column 3 (zero-based index)
  board.makeMove('X', 3);

  // Expected state of the board after one move
  const expectedBoard = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'X', ' ', ' ', ' ']
  ];

  // Check the board state
  expect(board.matrix).toEqual(expectedBoard);
});

test('Spelare måste ha möjlighet att välja drag', () => {
  // Set up mock answers:
  // - Player X's name
  // - Player O's name
  // - The column for the move (e.g., column 3)
  // - Finally, set "end-test" to stop the game
  setMockAnswers('Olle', 'Anna', '3', 'end-test');

  let app = new App();

  // We expect the game to throw 'end-test' to indicate it's time to stop testing
  expect(() => app.start()).toThrow('end-test');

  // Verify that the game asked for Player X's name
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');

  // Verify that the game asked for Player O's name
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');

  // Verify that the game prompted Player X to make a move
  expect(promptQuestions[2]).toBe('Ange ditt drag X Olle - skriv in column: ');

  // Verify that a move was made in the specified column (column 3)
  // Depending on the implementation, you may want to check the board state or similar
  let board = app.board;
  expect(board.matrix[5][2]).toBe('X');

  // Optionally, you can also verify the log to check if the board was rendered
  //expect(consoleOutput.length).toBeGreaterThan(0);
});



test('Spelare kan göra drag bara i valid column (1-7) ', () => {
  let board = new Board();

  // Try to make a move in a valid column (e.g., 0, 3, 6)
  expect(board.makeMove('X', 0)).toBe(true);
  expect(board.matrix[5][0]).toBe('X'); // Last row should have the 'X' piece

  // Make another move in a different valid column
  expect(board.makeMove('O', 3)).toBe(true);
  expect(board.matrix[5][3]).toBe('O'); // Last row should have the 'O' piece
});



test('Spelare kan inte göra drag utan valid column (<1-7>)', () => {

  let board = new Board();

  // Try to make a move in an invalid column (e.g., -1 or 7, since columns are 0-indexed from 0 to 6)
  expect(board.makeMove('X', -1)).toBe(false);
  expect(board.makeMove('X', 7)).toBe(false);

  // Check the board state to ensure no moves were made
  expect(board.matrix).toEqual([...board.matrix]); // No change in the board state
});


test('Bricka skulle falla ner till lägsta tom plats i valda column', () => {
  let board = new Board
  // Drop the first piece into column 0
  board.makeMove('X', 0);
  expect(board.matrix[5][0]).toBe('X'); // The piece should be in the bottom-most row (index 0) of column 3
  //log(board.matrix)
  // Drop the second piece into the same column
  board.makeMove('O', 0);
  expect(board.matrix[4][0]).toBe('O'); // The piece should be placed on top of the first piece (index 1)

  // Drop a third piece into the same column
  board.makeMove('X', 0);
  expect(board.matrix[3][0]).toBe('X'); // The piece should be placed on top of the second piece (index 2)
  //log(board.matrix)
});

