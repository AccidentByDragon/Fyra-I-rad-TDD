import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/App.js';
import Board from '../classes/Board.js';
//import Boarddown from '../classes/Boarddown.js';


test('App ska fråga efter spelare X och spelare O:s namn', () => {
  setMockAnswers('Olle', 'Anna', 'end-test');
  let app = new App();
  expect(() => app.start()).toThrow('end-test');
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
});

/*test('Spelare X och Spelare O sparas i egenskaper', () => {
  setMockAnswers('Olle', 'Anna');
  let app = new App();
  app.createPlayers();
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');

  expect(app.playerX.name).toBe('Olle');
  expect(app.playerO.name).toBe('Anna');
});

test('Drag måste registreras på vald plats', () => {
  let board = new Board();

  board.makeMove('X', 3);

  const expectedBoard = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'X', ' ', ' ', ' ']
  ];

  expect(board.matrix).toEqual(expectedBoard);
});

test('Spelare måste ha möjlighet att välja drag', () => {
  setMockAnswers('Olle', 'Anna', '3', 'end-test');

  let app = new App();
  expect(() => app.start()).toThrow('end-test');

  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  expect(promptQuestions[2]).toBe('Ange ditt drag X Olle - skriv in column: ');
});

test('Spelare kan göra drag bara i valid column (1-7)', () => {
  let board = new Board();

  expect(board.makeMove('X', 0)).toBe(true);
  expect(board.matrix[5][0]).toBe('X');

  expect(board.makeMove('O', 3)).toBe(true);
  expect(board.matrix[5][3]).toBe('O');
});

test('Spelare kan inte göra drag utan valid column (<1-7>)', () => {
  let board = new Board();

  expect(board.makeMove('X', -1)).toBe(false);
  expect(board.makeMove('X', 7)).toBe(false);

  expect(board.matrix).toEqual([
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ]);
});

test('En spelare kan inte göra ett drag i en full column', () => {
  let board = new Board();

  // Fill up column 0
  for (let i = 0; i < 6; i++) {
    expect(board.makeMove('X', 0)).toBe(true);
  }

  // Try to make another move in the already full column
  expect(board.makeMove('O', 0)).toBe(false);

  const expectedBoard = [
    ['X', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', ' ', ' ', ' ', ' ', ' ', ' ']
  ];

  expect(board.matrix).toEqual(expectedBoard);
});

test('Bricka skulle falla ner till lägsta tom plats i valda column', () => {
  let board = new Board();

  board.makeMove('X', 0);
  expect(board.matrix[5][0]).toBe('X');

  board.makeMove('O', 0);
  expect(board.matrix[4][0]).toBe('O');

  board.makeMove('X', 0);
  expect(board.matrix[3][0]).toBe('X');
});*/