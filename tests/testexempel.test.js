
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
    { row: 3, col: 0, color: 'X' },
    { row: 3, col: 1, color: 'X' },
    { row: 3, col: 2, color: 'X' },
    { row: 3, col: 3, color: 'X' }
  ]);
  expect(board.winCheck()).toBe('X');

});

test('Vertical win', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 3, col: 0, color: 'O' },
    { row: 2, col: 0, color: 'O' },
    { row: 1, col: 0, color: 'O' },
    { row: 0, col: 0, color: 'O' }
  ]);
  expect(board.winCheck()).toBe('O');
});

test('Diagonal win (left to right)', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 3, col: 0, color: 'X' },
    { row: 2, col: 1, color: 'X' },
    { row: 1, col: 2, color: 'X' },
    { row: 0, col: 3, color: 'X' }
  ]);
  expect(board.winCheck()).toBe('X');
});

test('Diagonal win (right to left)', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 3, col: 3, color: 'O' },
    { row: 2, col: 2, color: 'O' },
    { row: 1, col: 1, color: 'O' },
    { row: 0, col: 0, color: 'O' }
  ]);
  expect(board.winCheck()).toBe('O');
});

/*
test('No win scenario', () => {
  const board = new Board();
  setBoardState(board, [
    { row: 0, col: 0, color: 'X' },
    { row: 0, col: 1, color: 'O' },
    { row: 0, col: 2, color: 'X' },
    { row: 0, col: 3, color: 'O' }
  ]);
  expect(board.winCheck()).toBe(null);
});*/


