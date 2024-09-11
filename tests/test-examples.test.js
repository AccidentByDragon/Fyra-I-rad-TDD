import { expect, test } from 'vitest';
//mock audio
globalThis.Audio = class Audio {}

// some helpers for mocking
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

// other helpers for mocking not used right now
// import sleep from './helpers/mock-help/getDocument.js';
// import waitUntil from './helpers/mock-help/waitUntil.js';

// A common task - something we do in the prgoram flow
// in several tests
import registerPlayers from './helpers/commonTasks/registerPlayers.js';

// The App class from the program
import App from '../classes/App.js';


test('Does the logo/headline have the text "Four-in-a-row" ?', () => {
  let { body } = getDocument();
  new App();
  // check that the h1 contains the text 'Tic-Tac-Toe';
  let h1 = body.querySelector('h1');
  expect(h1.innerText).toBe('Four-in-a-row');
});

test('Does the board contain 9 cells?', () => {
  let { body } = getDocument();
  new App();
  let board = body.querySelector('.board');
  let cells = board.querySelectorAll('.cell')
  expect(cells.length).toBe(42);
});

/* test('Check that player names are registrered correctly', async () => {
  await registerPlayers();
}); */

