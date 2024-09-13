import { expect, test } from "vitest";

import getDocument from "./helpers/mock-help/getDocument.js";
import click from './helpers/mock-help/triggerOnclick.js';

import registerPlayers from "./helpers/common tasks/registerPlayers.js";
import App from "../classes/App.js";

// Modyfied examples test 1 (changed the headline text of the name)
test('Does the logoheadline have the text: Four in a Row?', () => {
  let { body } = getDocument;
  new App();
  let h1 = body.querySelecor('h1');
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
test('4: Does the game app return the correct winner name and color when it plays a winning game', () => {
  let { body } = getDocument();
  new App();

  let board = document.querySelector('.cell:nth-child(4)').click();
      board = document.querySelector('.cell:nth-child(4)').click();
      board = document.querySelector('.cell:nth-child(3)').click();
      board = document.querySelector('.cell:nth-child(4)').click();
      board = document.querySelector('.cell:nth-child(4)').click();
      board = document.querySelector('.cell:nth-child(2)').click();
      board = document.querySelector('.cell:nth-child(4)').click();
      board = document.querySelector('.cell:nth-child(1)').click();

  expect(p.innerText).toBe('Red: Anna won!')
})

test('4: Does the game app return the correct winner name and color when it plays a winning game', () => {
  let { body } = getDocument();
  new App();
      //Play the first row
  let board = body.querySelector('.cell:nth-child(1)').click();
      board = body.querySelector('.cell:nth-child(2)').click();
      board = body.querySelector('.cell:nth-child(3)').click();
      board = body.querySelector('.cell:nth-child(4)').click();
      board = body.querySelector('.cell:nth-child(5)').click();
      board = body.querySelector('.cell:nth-child(6)').click();
      board = body.querySelector('.cell:nth-child(7)').click();
      //Play the second row
      board = body.querySelector('.cell:nth-child(1)').click();
      board = body.querySelector('.cell:nth-child(2)').click();
      board = body.querySelector('.cell:nth-child(3)').click();
      board = body.querySelector('.cell:nth-child(4)').click();
      board = body.querySelector('.cell:nth-child(5)').click();
      board = body.querySelector('.cell:nth-child(6)').click();
      board = body.querySelector('.cell:nth-child(7)').click();
      //Play the third row
      board = body.querySelector('.cell:nth-child(2)').click();
      board = body.querySelector('.cell:nth-child(1)').click();
      board = body.querySelector('.cell:nth-child(4)').click();
      board = body.querySelector('.cell:nth-child(3)').click();
      board = body.querySelector('.cell:nth-child(6)').click();
      board = body.querySelector('.cell:nth-child(5)').click();
      board = body.querySelector('.cell:nth-child(7)').click();
      //Play the fourth row
      board = body.querySelector('.cell:nth-child(2)').click();
      board = body.querySelector('.cell:nth-child(1)').click();
      board = body.querySelector('.cell:nth-child(4)').click();
      board = body.querySelector('.cell:nth-child(3)').click();
      board = body.querySelector('.cell:nth-child(6)').click();
      board = body.querySelector('.cell:nth-child(5)').click();
      board = body.querySelector('.cell:nth-child(7)').click();
      //Play the fifth row
      board = body.querySelector('.cell:nth-child(1)').click();
      board = body.querySelector('.cell:nth-child(2)').click();
      board = body.querySelector('.cell:nth-child(3)').click();
      board = body.querySelector('.cell:nth-child(4)').click();
      board = body.querySelector('.cell:nth-child(5)').click();
      board = body.querySelector('.cell:nth-child(6)').click();
      board = body.querySelector('.cell:nth-child(7)').click();
      //Play the sixth row
      board = body.querySelector('.cell:nth-child(1)').click();
      board = body.querySelector('.cell:nth-child(2)').click();
      board = body.querySelector('.cell:nth-child(3)').click();
      board = body.querySelector('.cell:nth-child(4)').click();
      board = body.querySelector('.cell:nth-child(5)').click();
      board = body.querySelector('.cell:nth-child(6)').click();
      board = body.querySelector('.cell:nth-child(7)').click();

  expect(p.innerText).toBe('It\'s a tie...')
})