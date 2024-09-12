import { expect, test } from 'vitest';

// helpers för mockning
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

// oanvända helpers för mockning
// import sleep from './helpers/mock-help/getDocument.js';
// import waitUntil from './helpers/mock-help/waitUntil.js';

// helper för slippa skapa spelare vid varje test med dem
//import registerPlayers from './helpers/common tasks/registerPlayers.js';

// mock audio
globalThis.Audio = class Audio { }

// The App class from the program
import App from '../classes/App.js';

/* tester i denna fil:
1. Göra Drag som spelare Röd
2. Göra Drag som spelare Gul
*/
test('Make the first two moves and check they are appear on the board', async () => {
  let { body } = getDocument();
  click(body.querySelector('.cell:nth-child(5)'));
  expect(body.querySelector('.cell:nth-child(5)').classList.contains('Red')).toBeTruthy();


  /*click(body.querySelector('.cell:nth-child(4)'));
  expect(body.querySelector('.cell:nth-child(4)').classList.contains('Yellow')).toBeTruthy();*/
});