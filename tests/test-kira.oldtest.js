import { expect, test } from 'vitest';

// some helpers for mockings
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

// other helpers for mocking not used right now
import sleep from './helpers/mock-help/sleep.js';
import waitUntil from './helpers/mock-help/waitUntil.js';

// A common task - something we do in the prgoram flow
// in several tests
import registerPlayers from './helpers/common tasks/registerPlayers.js';

// The App class from the program
import App from '../classes/App.js';

// mock audio
globalThis.Audio = class Audio { }

test('Check if message "Enter names" availeble on the screen ', () => {
  let { body } = getDocument();
  new App();

  let message = body.querySelector('main p');
  //expect(message).toBeTruthy();
  expect(message.innerText).toContain('Enter names').toBeTruthy();

})

test('Does message "Enter the name of player Red:" appear', () => {
  let { body } = getDocument();
  new App();

  let h2 = body.querySelector('h2');
  expect(h2.innerText).toBe('Enter the name of player Red:');

})

test('Does dialog box for entering names appear', () => {
  let { body } = getDocument();
  new App();

  let dialog = body.querySelector('div.dialog-content');
  expect(dialog.innerText).toContain('Enter the name of player Red:').toBeTruthy();

})



test('Does the logo/headline have the text "Four in a Row" ?', () => {
  let { body } = getDocument();
  new App();
  // check that the h1 contains the text 'Tic-Tac-Toe';
  let h1 = body.querySelector('h1');
  expect(h1.innerText).toBe('Four in a Row');
});

test('Does the board contain 42 cells?', () => {
  let { body } = getDocument();
  new App();
  let board = body.querySelector('.board');
  let cells = board.querySelectorAll('.cell')
  expect(cells.length).toBe(42);
});

test('Check that player names are registrered correctly', async () => {
  
  new App()
  await registerPlayers();
});









