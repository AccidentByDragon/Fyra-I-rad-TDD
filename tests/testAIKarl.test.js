import { expect, test } from 'vitest';

// helpers for mocking
// import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

// Unused helpers for mocking
import sleep from './helpers/mock-help/getDocument.js';
import waitUntil from './helpers/mock-help/waitUntil.js';

// A helper for auto-mocking new players before any test
//import registerPlayers from './helpers/common tasks/registerPlayers.js';
import regPlayersAIvsAI from './helpers/common tasks/registerPlayersAIvsAI.js';

// mock audio
globalThis.Audio = class Audio { play() { } }

// The App class from the program
import App from '../classes/App.js';
import sleep from './helpers/mock-help/sleep.js';

/* testings in this file:
 Dumb bot vs Smart bot tests
*/

test("1. does the Smart Bot win agaist the Dumb bot", async () => {
  let { body, app } = await regPlayersAIvsAI();  
  let state = '';
  let currentstate = app.board.app.matrix;
  console.table(app.board.matrix.map(x => x.map(y => y.color === 'Red' ? 'X' : y.color === 'Yellow' ? 'O' : ' '))); 
  while (!app.board.gameOver && state.length < 42) 
  {
    let oldstate = app.board.matrix;
    let before = [...body.querySelectorAll('.cell')].map(x => x.getAttribute('class'));
    await sleep(500);
    if (currentstate !== oldstate) {
      console.table(app.board.matrix.map(x => x.map(y => y.color === 'Red' ? 'X' : y.color === 'Yellow' ? 'O' : ' ')));
      currentstate = oldstate;
      let after = [...body.querySelectorAll('.cell')].map(x => x.getAttribute('class'));
      let changedCell = before.findIndex((x, i) => x !== after[i] && after[i].includes('Yellow'));
      let move = changedCell % 7 + 1;
      state += move;
    }       
    if (app.board.gameOver)
    {
      break;
    }
  }
  expect(body.querySelector('main p').innerText).toBe('Red: Beata won!')
 }, 50000)