import { expect, test } from "vitest";
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPromptAndConsoleLog.js';
import App from "../classes/App.js";

test('The Board should ask if the player wishes to restart'), () => {
  // setting mocked answers
  setMockAnswers('nej');
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ')
}

test('The Board should reset itself if the player wishes to play again'), () => {
  // setting mcoked answers
  setMockAnswers('ja');
  // create and instance of board OBS this may need to be App or something else instead
  let app = new App();
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ')
  // when answered yes the board should reset and be clear
  expect(app.board.matrix).toEqual([
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ]);
}

test('The Board should not change from its final state id the Player does not want to restart'), () => {
  // setting mcoked answers
  setMockAnswers('nej');
  // create and instance of board OBS this may need to be App or something else instead
  let app = new App();
  // checking program asks the correct questions
  expect(promptQuestions[0]).toBe('Vill ni spela igen? (ja/nej)? ');
  expect(app.keepPlaying).toBe(false);
}
