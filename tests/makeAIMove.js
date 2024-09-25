import { expect, test } from 'vitest';

// Import the same helpers you use in your working test
import click from '../helpers/mock-help/triggerOnclick.js';
import regPlayHumanVsAi from '../helpers/common tasks/registerPlayersAIvsHuman.js';
import sleep from '../helpers/mock-help/sleep.js';

test('Bot makes its move automatically after human move', async () => {
  // Set up the game with a human vs AI, similar to your working test
  const { body, app } = await regPlayHumanVsAi();

  // Simulate a human move in column 1 (for example)
  click(body.querySelector('.cell:nth-child(1)'));  // First move by human

  // Wait for the bot to make its move
  await sleep(1000);  // Wait for bot to respond

  // Ensure the bot has made a move automatically
  const botMadeMove = [...body.querySelectorAll('.cell')]
    .some(cell => cell.getAttribute('class').includes('Yellow'));

  expect(botMadeMove).toBe(true);  // The bot should have made its move
}, 10000);
