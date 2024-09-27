import { expect, test } from "vitest";
import getDocument from "./helpers/mock-help/getDocument.js";
import App from "../classes/App.js";
import sleep from "./helpers/sleep.js";

import registerPlayers from './helpers/common tasks/registerPlayers.js';

globalThis.Audio = class Audio { play() { } };

test('Does the buttons div contain player type buttons?', async () => {
  let { body } = getDocument();
  new App(); 

  await registerPlayers();
  await new Promise(resolve => setTimeout(resolve, 100)); 
  let buttonsDiv = body.querySelector('div.buttons');

  expect(buttonsDiv).toBeDefined();

  let humanButton = buttonsDiv.querySelector('input[value="Human"]');
  let dumbBotButton = buttonsDiv.querySelector('input[value="A dumb bot"]');
  let smartBotButton = buttonsDiv.querySelector('input[value="A smart bot"]');

  expect(humanButton).toBeDefined();
  expect(dumbBotButton).toBeDefined();
  expect(smartBotButton).toBeDefined();
});
