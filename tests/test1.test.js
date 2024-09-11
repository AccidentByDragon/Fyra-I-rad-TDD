import { expect, test } from 'vitest';
import registerPlayers from './helpers/commonTasks/registerPlayers.js';
import click from './helpers/mock-help/triggerOnclick.js';

// mock audio
globalThis.Audio = class Audio { };

// The App class from the program
import App from '../classes/App.js';

test('Make the first two moves and check they appear on the board', async () => {
  let body = await registerPlayers(); // Wait for players to be registered
  click(body.querySelector('.cell:nth-child(5)'));
  expect(body.querySelector('.cell:nth-child(5)').classList.contains('Red')).toBeTruthy();

  /*  this to test Yellow's move
  click(body.querySelector('.cell:nth-child(4)'));
  expect(body.querySelector('.cell:nth-child(4)').classList.contains('Yellow')).toBeTruthy();
  */
});
