import { expect, test } from "vitest";
import getDocument from "./helpers/mock-help/getDocument.js";
import registerPlayers from "./helpers/common tasks/registerPlayers.js"
import sleep from "./helpers/mock-help/sleep.js"
import waitUntil from "./helpers/mock-help/waitUntil.js";
import click from './helpers/mock-help/triggerOnclick.js';
import App from "../classes/App.js";

globalThis.Audio = class Audio { play() { } }

test('1: Does the logoheadline have the text: Four in a Row?', () => {
  let { body } = getDocument();
  new App();
  expect((body.querySelector('h1')).innerText).toBe('Four in a Row');
});

test('2: Does the board contains 42 cell positions?', () => {
  let { body } = getDocument();
  new App();
  expect(body.querySelectorAll('.cell').length).toBe(42);
})

test('3: Does the input of mocked names pass throu the starting sequens?', async () => {
  await registerPlayers();
})

test('4: Try to make the first move', async () => {
  let body = await registerPlayers();

  click(body.querySelector('.cell:nth-child(39)'));
  // await waitUntil()
  await sleep(800)
  // console.log(body.querySelector('.cell:nth-child(39)').classList);
  expect(body.querySelector('.cell:nth-child(39)').classList.contains('Red')).toBeTruthy();

})

test('5: Does the game app return the correct winner name and color when it plays a winning game', async () => {

  let body = await registerPlayers();
  let as = async () => await sleep(400);

  // Playing a winning game
  click(body.querySelector('.cell:nth-child(39)')); await as();
  expect(body.querySelector('.cell:nth-child(39)').classList.contains('Red')).toBeTruthy();

  click(body.querySelector('.cell:nth-child(32)')); await as();
  expect(body.querySelector('.cell:nth-child(32)').classList.contains('Yellow')).toBeTruthy();

  click(body.querySelector('.cell:nth-child(38)')); await as();
  expect(body.querySelector('.cell:nth-child(38)').classList.contains('Red')).toBeTruthy();

  click(body.querySelector('.cell:nth-child(25)')); await as();
  expect(body.querySelector('.cell:nth-child(25)').classList.contains('Yellow')).toBeTruthy();

  click(body.querySelector('.cell:nth-child(40)')); await as();

  expect(body.querySelector('.cell:nth-child(40)').classList.contains('Red')).toBeTruthy();

  click(body.querySelector('.cell:nth-child(37)')); await as();
  expect(body.querySelector('.cell:nth-child(37)').classList.contains('Yellow')).toBeTruthy();

  click(body.querySelector('.cell:nth-child(41)')); await as();
  // expect(body.querySelector('.cell:nth-child(41)').classList.contains('Red')).toBeTruthy(); await as();
  expect(body.querySelector('.cell:nth-child(41)').classList.contains('Redin-win')).toBeTruthy();

  await waitUntil(() => body.querySelector('main p').innerText.includes('won!'))
  expect(body.querySelector('main p').innerText).toBe('Red: Anna won!')
}, 10000);


test('6: Does the game app return the correct winner fraze when the play round is a tie?', async () => {

  // let { body } = getDocument();
  // globalThis.mockAnswers = ['Anna', 'Beata'];

  // new App()

  let body = await registerPlayers();
  let as = async () => await sleep(400);

  //Play the first row
  click(body.querySelector('.cell:nth-child(1)')); await as();
  expect(body.querySelector('.cell:nth-child(36)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(2)')); await as();
  expect(body.querySelector('.cell:nth-child(37)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(3)')); await as();
  expect(body.querySelector('.cell:nth-child(38)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(4)')); await as();
  expect(body.querySelector('.cell:nth-child(39)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(5)')); await as();
  expect(body.querySelector('.cell:nth-child(40)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(6)')); await as();
  expect(body.querySelector('.cell:nth-child(41)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(7)')); await as();
  expect(body.querySelector('.cell:nth-child(42)').classList.contains('Red')).toBeTruthy();

  //Play the second row
  click(body.querySelector('.cell:nth-child(1)')); await as();
  expect(body.querySelector('.cell:nth-child(29)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(2)')); await as();
  expect(body.querySelector('.cell:nth-child(30)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(3)')); await as();
  expect(body.querySelector('.cell:nth-child(31)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(4)')); await as();
  expect(body.querySelector('.cell:nth-child(32)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(5)')); await as();
  expect(body.querySelector('.cell:nth-child(33)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(6)')); await as();
  expect(body.querySelector('.cell:nth-child(34)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(7)')); await as();
  expect(body.querySelector('.cell:nth-child(35)').classList.contains('Yellow')).toBeTruthy();

  //Play the third row
  click(body.querySelector('.cell:nth-child(2)')); await as();
  expect(body.querySelector('.cell:nth-child(23)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(1)')); await as();
  expect(body.querySelector('.cell:nth-child(22)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(4)')); await as();
  expect(body.querySelector('.cell:nth-child(25)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(3)')); await as();
  expect(body.querySelector('.cell:nth-child(24)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(6)')); await as();
  expect(body.querySelector('.cell:nth-child(27)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(5)')); await as();
  expect(body.querySelector('.cell:nth-child(26)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(7)')); await as();
  expect(body.querySelector('.cell:nth-child(28)').classList.contains('Red')).toBeTruthy();

  //Play the fourth row
  click(body.querySelector('.cell:nth-child(2)')); await as();
  expect(body.querySelector('.cell:nth-child(16)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(1)')); await as();
  expect(body.querySelector('.cell:nth-child(15)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(4)')); await as();
  expect(body.querySelector('.cell:nth-child(18)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(3)')); await as();
  expect(body.querySelector('.cell:nth-child(17)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(6)')); await as();
  expect(body.querySelector('.cell:nth-child(20)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(5)')); await as();
  expect(body.querySelector('.cell:nth-child(19)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(7)')); await as();
  expect(body.querySelector('.cell:nth-child(21)').classList.contains('Yellow')).toBeTruthy();

  //Play the fifth row
  click(body.querySelector('.cell:nth-child(1)')); await as();
  expect(body.querySelector('.cell:nth-child(8)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(2)')); await as();
  expect(body.querySelector('.cell:nth-child(9)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(3)')); await as();
  expect(body.querySelector('.cell:nth-child(10)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(4)')); await as();
  expect(body.querySelector('.cell:nth-child(11)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(5)')); await as();
  expect(body.querySelector('.cell:nth-child(12)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(6)')); await as();
  expect(body.querySelector('.cell:nth-child(13)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(7)')); await as();
  expect(body.querySelector('.cell:nth-child(14)').classList.contains('Red')).toBeTruthy();

  //Play the sixth row
  click(body.querySelector('.cell:nth-child(1)')); await as();
  expect(body.querySelector('.cell:nth-child(1)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(2)')); await as();
  expect(body.querySelector('.cell:nth-child(2)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(3)')); await as();
  expect(body.querySelector('.cell:nth-child(3)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(4)')); await as();
  expect(body.querySelector('.cell:nth-child(4)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(5)')); await as();
  expect(body.querySelector('.cell:nth-child(5)').classList.contains('Yellow')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(6)')); await as();
  expect(body.querySelector('.cell:nth-child(6)').classList.contains('Red')).toBeTruthy();
  click(body.querySelector('.cell:nth-child(7)')); await as();
  expect(body.querySelector('.cell:nth-child(7)').classList.contains('Yellow')).toBeTruthy();

  await waitUntil(() => body.querySelector('main p').innerText.includes('tie'))
  expect(body.querySelector('main p').innerText).toBe('It\'s a tie...')

}, 20000); 