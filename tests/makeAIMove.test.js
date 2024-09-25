import { expect, test } from 'vitest';
import click from './helpers/mock-help/triggerOnclick.js';
import regPlayHumanVsAi from './helpers/common tasks/registerPlayersAIvsHuman.js';
import sleep from './helpers/mock-help/sleep.js';

test('Bot makes its move automatically after human move', async () => {
  // Set up the game with a human vs AI
  const { body, app } = await regPlayHumanVsAi();

  // Log initial state before any move
  console.log("Initial board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Simulate a human move in column 1
  console.log("Simulating human move in column 1");
  click(body.querySelector('.cell:nth-child(1)'));  // First move by human

  // Ensure the human move is registered
  await sleep(500);  // Wait for the move to be reflected
  expect(app.board.matrix[5][0].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 1");

  // Wait for the bot to make its move
  await sleep(1000);  // Wait for bot to respond

  // Ensure the bot has made its move
  const botMadeMove = [...body.querySelectorAll('.cell')]
    .some(cell => cell.getAttribute('class').includes('Yellow'));

  // Log bot's move
  console.log("Checking if the bot made a move (Yellow)");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  expect(botMadeMove).toBe(true);  // The bot should have made its move
  console.log("Bot has made a move successfully.");

}, 10000);
