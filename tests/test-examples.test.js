import { expect, test } from 'vitest';

// some helpers for mockings
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


test('Does the logo/headline have the text "Fyra-I-Rad" ?', () => {
  let { body } = getDocument();
  new App();
  // check that the h1 contains the text 'Tic-Tac-Toe';
  let h1 = body.querySelector('h1');
  expect(h1.innerText).toBe('Fyra-I-Rad');
});

test('Does the board contain 42 cells?', () => {
  let { body } = getDocument();
  new App();
  let board = body.querySelector('.board');
  let cells = board.querySelectorAll('.cell')
  expect(cells.length).toBe(42);
});

test('Check that player names are registrered correctly', async () => {
  await registerPlayers();
});

