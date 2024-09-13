import { expect, test } from "vitest";

import getDocument from "./helpers/mock-help/getDocument.js";
import click from './helpers/mock-help/triggerOnclick.js';

import registerPlayers from "./helpers/common tasks/registerPlayers.js";
import App from "../classes/App.js";

globalThis.Audio = class Audio {
  play() { }
}

// Modyfied examples test 1 (changed the headline text of the name)
test('Does the logoheadline have the text: Four in a Row?', () => {
  let { body } = getDocument();
  new App();
  let h1 = body.querySelector('h1');
  expect(h1.innerText).toBe('Four in a Row');
});

// Modyfied examples test 2 (changed the number of cells in the game)
test('Does the board contains 42 cell positions?', () => {
  let { body } = getDocument();
  new App();

  let board = body.querySelector('.board');
  let cells = body.querySelectorAll('.cell')

  expect(cells.length).toBe(42);
})

//Trying to built my own testing
test('4: Does the game app return the correct winner name and color when it plays a winning game', async () => {
  let { body } = getDocument();

  new App()
  await registerPlayers();

  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(1)'));

  expect(body.querySelector('p').innerText).toBe('Red: Anna won!')
})

test('5: Does the game app return the correct winner fraze when the game is a tie?', async () => {
  let { body } = getDocument();
  new App()
  await registerPlayers();

  //Play the first row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the second row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the third row
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the fourth row
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the fifth row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  //Play the sixth row
  click(body.querySelector('.cell:nth-child(1)'));
  click(body.querySelector('.cell:nth-child(2)'));
  click(body.querySelector('.cell:nth-child(3)'));
  click(body.querySelector('.cell:nth-child(4)'));
  click(body.querySelector('.cell:nth-child(5)'));
  click(body.querySelector('.cell:nth-child(6)'));
  click(body.querySelector('.cell:nth-child(7)'));

  expect(p.innerText).toBe('It\'s a tie...')
})