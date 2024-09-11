import fs from 'fs';
import { expect, test } from "vitest";
// mocking helpers
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

//automate player name input
import registerPlayers from './helpers/commonTasks/registerPlayers.js';


import App from "../classes/App.js";


test('The Board should ask if the player wishes to restart', () => {
  // setting mocked answers
  setMockAnswers('nej', 'end-test');
  // create an instance of App in case the program needs it.
  let app = new App().boardReset();
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ');
  //expect(() => app.boardReset()).toThrow('end-test');
})

test('The Board should reset itself if the player wishes to play again', () => {
  // setting mocked answers
  setMockAnswers('ja', 'end-test');
  // create an instance of App in case the program needs it.
  let app = new App();
  // checking program asks the correct questions
  //expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ')
  // when answered yes the board should reset and be clear
  expect(app.createBoard().matrix).toEqual([
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ]);
  //expect(() => app.createBoard()).toThrow('end-test');
})

test('The Board should not change from its final state id the Player does not want to restart', () => {
  // setting mcoked answers
  setMockAnswers('nej', 'end-test');
  // create an instance of App in case the program needs it.
  let app = new App().boardReset();
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ');
  expect(app).toBe(false);
  //expect(() => app.boardReset()).toThrow('end-test');
})
