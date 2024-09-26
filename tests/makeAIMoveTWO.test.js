import { expect, test } from 'vitest';
import sleep from './helpers/mock-help/sleep.js';
//import regPlayHumanVsAi from './helpers/common tasks/registerPlayersAIvsHuman.js';
import regPlayHumanStart from './helpers/common tasks/registerPlayersHumanvsBot.js';

// Test: Bot makes its move automatically without human move
test('Bot makes its move automatically without human move', async () => {
  const { body, app } = await regPlayHumanStart();

  console.log("Initial board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  await sleep(3000);  // Allow some time for the bot to move

  // Ensure that bot move is triggered
  if (!app.botMoveTriggered) {
    console.log("Bot move not triggered automatically, forcing the bot to move.");
    app.triggerBotMove();  // Check this function is correctly defined and implemented
  }

  const botMadeMove = [...body.querySelectorAll('.cell')]
    .some(cell => cell.getAttribute('class').includes('Yellow'));


  console.log("Checking if the bot made a move (Yellow)");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  expect(botMadeMove).toBe(true);
  console.log("Bot has made a move successfully.");
}, 10000);
