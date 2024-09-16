import { expect, test } from 'vitest';

// helpers for mockning
// import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

// Unused helpers for mockning
// import sleep from './helpers/mock-help/getDocument.js';
// import waitUntil from './helpers/mock-help/waitUntil.js';

// A helper for auto-mocking new players before any test
import registerPlayers from './helpers/common tasks/registerPlayers.js';

// mock audio
globalThis.Audio = class Audio { }

// The App class from the program
import App from '../classes/App.js';

/* testings in this file:
1. Make a move as player Red
2. Make a move as player Yellow
*/
test('Make the first two moves and check they appear on the board', async () => {
  let body = await registerPlayers();
  click(body.querySelector('.cell:nth-child(5)'));
  expect(body.querySelector('.cell:nth-child(5)').classList.contains('Red')).toBeTruthy();


  /*click(body.querySelector('.cell:nth-child(4)'));
  expect(body.querySelector('.cell:nth-child(4)').classList.contains('O')).toBeTruthy();*/
});
