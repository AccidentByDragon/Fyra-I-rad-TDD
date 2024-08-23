import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/App.js';


test('prompt ska ta emot ett namn för första spelare',() => { 

    setMockAnswers ('Olle', 'Anna');
    let app = new App();
 log('Hej')
    expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
    expect(promptQuestions[1]).toBe('Spelare O:s namn: ');


})

