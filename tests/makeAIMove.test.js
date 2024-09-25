import { expect, test } from 'vitest';
import click from './helpers/mock-help/triggerOnclick.js';
import regPlayHumanVsAi from './helpers/common tasks/registerPlayersAIvsHuman.js';
import sleep from './helpers/mock-help/sleep.js';

// Test 1: Bot moves after human makes the first move
test('Bot makes its move automatically after human move', async () => {

  const { body, app } = await regPlayHumanVsAi();


  console.log("Initial board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));


  console.log("Simulating human move in column 1");
  click(body.querySelector('.cell:nth-child(1)'));  // First move by human


  await sleep(500);
  expect(app.board.matrix[5][0].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 1");


  await sleep(1000);


  const botMadeMove = [...body.querySelectorAll('.cell')]
    .some(cell => cell.getAttribute('class').includes('Yellow'));


  console.log("Checking if the bot made a move (Yellow)");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  expect(botMadeMove).toBe(true);
  console.log("Bot has made a move successfully.");
}, 10000);
