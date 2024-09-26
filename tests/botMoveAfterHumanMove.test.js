import { expect, test } from 'vitest';
import click from './helpers/mock-help/triggerOnclick.js';
import regPlayHumanVsAi from './helpers/common tasks/registerPlayersAIvsHuman.js';
import sleep from './helpers/mock-help/sleep.js';

// Test: Simulate multiple turns and check game state after each move
test('Bot and Human take multiple turns and game state updates correctly', async () => {
  const { body, app } = await regPlayHumanVsAi();

  // Initial board state
  console.log("Initial board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Human Move 1: Column 1
  console.log("Simulating human move in column 1");
  click(body.querySelector('.cell:nth-child(1)'));  // Human move in column 1
  await sleep(500);
  expect(app.board.matrix[5][0].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 1");

  // Wait for Bot Move 1
  await sleep(1000);
  const botMove1 = [...body.querySelectorAll('.cell')].some(cell => cell.getAttribute('class').includes('Yellow'));
  expect(botMove1).toBe(true);  // Verify bot made a move
  console.log("Bot has made its move successfully.");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Human Move 2: Column 2
  console.log("Simulating human move in column 2");
  click(body.querySelector('.cell:nth-child(2)'));  // Human move in column 2
  await sleep(500);
  expect(app.board.matrix[5][1].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 2");

  // Wait for Bot Move 2
  await sleep(1000);
  const botMove2 = [...body.querySelectorAll('.cell')].some(cell => cell.getAttribute('class').includes('Yellow'));
  expect(botMove2).toBe(true);  // Verify bot made a move
  console.log("Bot has made its second move.");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Add a third human move for further testing
  console.log("Simulating human move in column 3");
  click(body.querySelector('.cell:nth-child(3)'));  // Human move in column 3
  await sleep(500);
  expect(app.board.matrix[5][2].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 3");

  // Wait for Bot Move 3
  await sleep(1000);
  const botMove3 = [...body.querySelectorAll('.cell')].some(cell => cell.getAttribute('class').includes('Yellow'));
  expect(botMove3).toBe(true);
  console.log("Bot has made its third move.");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Final state of the board after multiple moves
  console.log("Final board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

}, 20000);  // Increased timeout for multiple moves
