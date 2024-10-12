import { test, expect } from 'vitest';
import Board from '../classes/Board.js';

// Helper function to set up the board
function setBoardState(board, positions) {
  for (let { row, col, color } of positions) {
    board.matrix[row][col] = color;
  }
}

test('No win scenario', () => {
  const board = new Board();
  setBoardState(board, [
    //Play until it is a draw game.
    //Markers on the 5th row
    { row: 5, col: 0, color: 'X' },
    { row: 5, col: 1, color: 'O' },
    { row: 5, col: 2, color: 'X' },
    { row: 5, col: 3, color: 'O' },
    { row: 5, col: 4, color: 'X' },
    { row: 5, col: 5, color: 'O' },
    { row: 5, col: 6, color: 'X' },
    //Markers on the 4th row
    { row: 4, col: 0, color: 'O' },
    { row: 4, col: 1, color: 'X' },
    { row: 4, col: 2, color: 'O' },
    { row: 4, col: 3, color: 'X' },
    { row: 4, col: 4, color: 'O' },
    { row: 4, col: 5, color: 'X' },
    { row: 4, col: 6, color: 'O' },
    //Markers on the 3th row
    { row: 3, col: 1, color: 'X' },
    { row: 3, col: 2, color: 'O' },
    { row: 3, col: 3, color: 'X' },
    { row: 3, col: 4, color: 'O' },
    { row: 3, col: 5, color: 'X' },
    { row: 3, col: 6, color: 'O' },
    { row: 2, col: 6, color: 'X' },
    //Marke3s on the 2th row        
    { row: 3, col: 0, color: 'O' },
    { row: 2, col: 0, color: 'X' },
    { row: 2, col: 1, color: 'O' },
    { row: 2, col: 2, color: 'X' },
    { row: 2, col: 3, color: 'O' },
    { row: 2, col: 4, color: 'X' },
    { row: 2, col: 5, color: 'O' },
    //Markers on the 1th row        
    { row: 1, col: 0, color: 'X' },
    { row: 1, col: 1, color: 'O' },
    { row: 1, col: 2, color: 'X' },
    { row: 1, col: 3, color: 'O' },
    { row: 1, col: 4, color: 'X' },
    { row: 1, col: 5, color: 'O' },
    { row: 1, col: 6, color: 'X' },
    //Markers on the 0th row        
    { row: 0, col: 0, color: 'O' },
    { row: 0, col: 1, color: 'X' },
    { row: 0, col: 2, color: 'O' },
    { row: 0, col: 3, color: 'X' },
    { row: 0, col: 4, color: 'O' },
    { row: 0, col: 5, color: 'X' },
    { row: 0, col: 6, color: 'O' }
  ]);

  let fullBoardCheck = [
    ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
    ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
    ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
    ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
    ['X', 'O', 'X', 'O', 'X', 'O', 'X']
  ];
  expect(board.drawCheck()).toBe(true);
  expect(board.matrix).toEqual(fullBoardCheck)
});