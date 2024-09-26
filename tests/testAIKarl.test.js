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
import regPlayAiVsHuman from './helpers/common tasks/registerPlayersAIvsHuman.js';

import { getMoveFromExternalAI } from './helpers/common tasks/miner.js';

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
  //console.log(body.innerHTML);
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
  expect(body.querySelector('main p').innerText).toBe('Yellow: Beata won!')
}, 50000)
 
// sDenna test fungerar inte då något pajar, den externa boten gör idiotiska drag som gör att den förlorar oavsett vilken svårighet den är på
test('2. Can our Smart bot beat the external AI if it starts', async () => {
  const { body, app } = await regPlayAiVsHuman();
  let state = '';
  let externalAiLevel = 1;

  while (!app.board.gameOver && state.length < 42) {
    // Get our bot move.
    let before = [...body.querySelectorAll('.cell')].map(x => x.getAttribute('class'));
    await sleep(500);
    console.log(state.length, state);
    console.table(app.board.matrix.map(x => x.map(y => y.color === 'Red' ? 'X' : y.color === 'Yellow' ? 'O' : ' ')));

    console.log('Winner', app.board.winner);
    console.log('isADraw', app.board.isADraw);

    if (app.board.gameOver) { break; }
    let after = [...body.querySelectorAll('.cell')].map(x => x.getAttribute('class'));
    let changedCell = before.findIndex((x, i) => x !== after[i] && after[i].includes('Yellow'));
    let botMove = changedCell % 7 + 1;
    state += botMove;
    console.log(state.length, state);
    console.table(app.board.matrix.map(x => x.map(y => y.color === 'Red' ? 'X' : y.color === 'Yellow' ? 'O' : ' ')));

    console.log('Winner', app.board.winner);
    console.log('isADraw', app.board.isADraw);

    // external Ai move
    await sleep(500);
    let aiMove = await getMoveFromExternalAI(externalAiLevel, state)
    state += aiMove;
    await sleep(800);
    console.log('.cell:nth-child(' + aiMove + ')');
    click(body.querySelector('.cell:nth-child(' + aiMove + ')'));
  }

}, 100000)