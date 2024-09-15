import { expect, test } from "vitest";
import getDocument from "./helpers/mock-help/getDocument.js";
import registerPlayers from "./helpers/common tasks/registerPlayers.js"
import waitUntil from "./helpers/mock-help/waitUntil.js";
import click from './helpers/mock-help/triggerOnclick.js';
import App from "../classes/App.js";

globalThis.Audio = class Audio { play() { } }

test('1: Does the logoheadline have the text: Four in a Row?', () => {
  let { body } = getDocument();
  new App();
  expect((body.querySelector('h1')).innerText).toBe('Four in a Row');
});

test('2: Does the board contains 42 cell positions?', () => {
  let { body } = getDocument();
  new App();
  expect(body.querySelectorAll('.cell').length).toBe(42);
})

test('3: Does the input of mocked names pass throu the starting sequens?', async () => {
 await registerPlayers();
})

test('3.5: Try to make the first move', async () => {
  let { body } = await registerPlayers();

  click(body.querySelector('.cell:nth-child(39)'));
  expect(body.querySelector('.cell:nth-child(39)').classList.contains('Red')).toBeTruthy();
  
})

test('4: Does the game app return the correct winner name and color when it plays a winning game', async () => {

  let { body } = await registerPlayers();
  /*let { body } = getDocument();
  globalThis.mockAnswers = ['Anna', 'Beata'];
  new App()
  await waitUntil(() => !body.querySelector('main p').innerText.includes('Enter'))
  expect(body.querySelector('main p').innerText).toBe('Red: Anna\'s turn...'); */

  // Playing a winning game
  click(body.querySelector('.cell:nth-child(39)'));
  expect(body.querySelector('.cell:nth-child(39)').classList.contains('Red')).toBe(true);
  click(body.querySelector('.cell:nth-child(32)'));
  expect(body.querySelector('.cell:nth-child(32)').classList.contains('Yellow')).toBe(true);
  click(body.querySelector('.cell:nth-child(38)'));
  expect(body.querySelector('.cell:nth-child(38)').classList.contains('Red')).toBe(true);
  click(body.querySelector('.cell:nth-child(25)'));
  expect(body.querySelector('.cell:nth-child(25)').classList.contains('Yellow')).toBe(true);
  click(body.querySelector('.cell:nth-child(40)'));
  expect(body.querySelector('.cell:nth-child(40)').classList.contains('Red')).toBe(true);
  click(body.querySelector('.cell:nth-child(37)'));
  expect(body.querySelector('.cell:nth-child(37)').classList.contains('Yellow')).toBe(true);
  click(body.querySelector('.cell:nth-child(41)'));
  expect(body.querySelector('.cell:nth-child(41)').classList.contains('Red')).toBe(true);
  expect(body.querySelector('.cell:nth-child(41)').classList.contains('Redin-win')).toBe(true);
  
  // await waitUntil(() => body.querySelector('.board').classList.contains('.Redin-win'))
  // // await waitUntil(() => body.querySelector('main p').innerText.includes('won!'))
  // expect(body.querySelector('main p').innerText).toBe('Red: Anna won!')
})


test('5: Does the game app return the correct winner fraze when the game is a tie?', async () => {
  let { body } = getDocument();
  globalThis.mockAnswers = ['Anna', 'Beata'];

  new App()

  //Play the first row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the second row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the third row
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the fourth row
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the fifth row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the sixth row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  expect(body.querySelector('main p').innerText).toBe('It\'s a tie...')
}) 



// test('3: Does the input of mocked names pass throu the starting sequens?', async () => {
//   let { body } = getDocument();
//   globalThis.mockAnswers = ['Anna', 'Beata'];
//   new App()
//   await waitUntil( () => !body.querySelector('main p').innerText.includes('Enter'))
//   expect(body.querySelector('main p').innerText).includes('turn...');
 
// })