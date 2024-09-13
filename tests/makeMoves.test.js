import { expect, test } from 'vitest';

// helpers för mockning
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import sleep from './helpers/mock-help/getDocument.js';

// oanvända helpers för mockning
// import waitUntil from './helpers/mock-help/waitUntil.js';

// helper för slippa skapa spelare vid varje test med dem
//import registerPlayers from './helpers/common tasks/registerPlayers.js';

// mock audio
globalThis.Audio = class Audio { }

// The App class from the program
import App from '../classes/App.js';
import registerPlayers from './helpers/common tasks/registerPlayers.js';

/* tester i denna fil:
1. Göra Drag som spelare Röd
2. Göra Drag som spelare Gul
*/

test('Make the first move as Red and check if it appears on the board', async () => {
  let { body } = getDocument();
  new App(); 
  click(body.querySelector('.cell:nth-child(1)'));
  expect(body.querySelector('.cell:nth-child(1)').classList.contains('Red')).toBeTruthy();
});

test('Make the first two moves as Red and Yellow and check if they appear on the board', async () => {
  let { body } = getDocument();
  new App();
  click(body.querySelector('.cell:nth-child(1)'));
  sleep(500);
  click(body.querySelector('.cell:nth-child(6)'));
  expect(body.querySelector('.cell:nth-child(6)').classList.contains('Yellow')).toBeTruthy();
});
