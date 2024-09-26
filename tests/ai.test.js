import { expect, test } from 'vitest';

// helpers for mockning
// import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

import regPlayHumanVsAi from './helpers/common tasks/registerPlayersHumanvsAi.js';
import regPlayAiVsHuman from './helpers/common tasks/registerPlayersAIvsHuman.js';

import { getMoveFromExternalAI } from './helpers/common tasks/miner.js';

import sleep from './helpers/mock-help/sleep.js';

test('Externa test to our own smart bot external bot goes first', async () => {
  const {body, app} = await regPlayHumanVsAi();
  let state = '';
  let externalAiLevel = 1;

  while (!app.board.gameOver && state.length < 42) {
  
    let aiMove = await getMoveFromExternalAI(externalAiLevel, state)
    state += aiMove;
    await sleep(800);

    console.log('.cell:nth-child(' + aiMove + ')');
    click(body.querySelector('.cell:nth-child(' + aiMove + ')'));
    
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
  }

}, 100000)

