import { expect, test } from 'vitest';
import click from './helpers/mock-help/triggerOnclick.js';
import regPlayHumanVsAi from './helpers/common tasks/registerPlayersAIvsHuman.js';
import sleep from './helpers/mock-help/sleep.js';
import regPlayHumanStart from './helpers/common tasks/registerPlayersHumanvsBot.js';

// Test nummer 1:
test('Bot makes its move automatically AFTER human move', async () => {
  const { body, app } = await regPlayHumanVsAi();


  console.log("Initial board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Human Move 1: Column 1
  console.log("Simulating human move in column 1");
  click(body.querySelector('.cell:nth-child(1)'));
  await sleep(500);
  //was [5][0]
  expect(app.board.matrix[5][3].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 1");


  await sleep(1000);
  const botMove1 = [...body.querySelectorAll('.cell')].some(cell => cell.getAttribute('class').includes('Yellow'));
  expect(botMove1).toBe(true);
  console.log("Bot has made its move successfully.");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Human Move 2: Column 2
  console.log("Simulating human move in column 2");
  click(body.querySelector('.cell:nth-child(2)'));
  await sleep(500)
  //was Red
  expect(app.board.matrix[5][1].color).toBe('Yellow');
  console.log("Human (Red) has placed a piece in column 2");


  await sleep(1000);
  const botMove2 = [...body.querySelectorAll('.cell')].some(cell => cell.getAttribute('class').includes('Yellow'));
  expect(botMove2).toBe(true);
  console.log("Bot has made its second move.");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  // Third move from human 
  console.log("Simulating human move in column 3");
  click(body.querySelector('.cell:nth-child(3)'));
  await sleep(500);
  //was [5][2]
  expect(app.board.matrix[4][3].color).toBe('Red');
  console.log("Human (Red) has placed a piece in column 3");


  await sleep(1000);
  const botMove3 = [...body.querySelectorAll('.cell')].some(cell => cell.getAttribute('class').includes('Yellow'));
  expect(botMove3).toBe(true);
  console.log("Bot has made its third move.");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  console.log("Final board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

}, 20000);



//test nummer 2:
test('Bot makes its move automatically BEFORE human move', async () => {
  const { body, app } = await regPlayHumanStart();

  console.log("Initial board state:");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  await sleep(1000);  

  const botMadeMove = [...body.querySelectorAll('.cell')]
    .some(cell => cell.getAttribute('class').includes('Red'));


  console.log("Checking if the bot made a move (Red)");
  console.table(app.board.matrix.map(row => row.map(cell => cell.color || ' ')));

  expect(botMadeMove).toBe(true);
  console.log("Bot has made a move successfully.");
}, 10000);