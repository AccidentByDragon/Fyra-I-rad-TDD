import { expect, test } from 'vitest';

// helpers for mockning
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import sleep from './helpers/mock-help/sleep.js';
import regPlayHumanVsAi from './helpers/common tasks/registerPlayersAIvsHuman.js';

test('Does the logoheadline have the text: Four in a Row?', () => {
  let { body } = getDocument();
  new App();
  expect((body.querySelector('h1')).innerText).toBe('Four in a Row');
});

test('That the smart bot chooses the highest scor from futureState when it is about to make the move', () => {

  let body = regPlayHumanVsAi();
  new App();

  expect(body.querySelector('something').toBe('something'));

});

// Starta ett spel med en smart bot. Anropa registerPlayersAIvsAI.js