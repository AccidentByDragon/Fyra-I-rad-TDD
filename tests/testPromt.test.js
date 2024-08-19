import { test, expect, vi, beforeEach } from 'vitest';


import App from './classes/App.js';


// promptQuestion = an array of questions the program calls prompt with
// mockAnswers = an array of answers we want to give for the questions
// consoleOutput = an array of output the program calls console.log with
let promptQuestions, mockAnswers, consoleOutput;

// since we are going to mock console.log - save the original console.log
// so we can still use it by calling log
let log = console.log;

// beforeEach -> do this before each test
beforeEach(() => {
  // set promptQuestions and mockAnswers to empty arrays;
  promptQuestions = [];
  mockAnswers = [];
  // mock the prompt!
  // vi.mock replaces parts of an import
  // and if the export is done using 'export default'
  // then the part we want to replace is 'default'
  vi.mock(import('../helpers/prompt.js'), async () => {
    return {
      default: (question) => {
        // remember the question the program sends to prompt
        promptQuestions.push(question);
        // return a mock answers to the program
        return mockAnswers.shift();
      }
    }
  });
  // set consoleOutput to an empty array
  consoleOutput = [];
  // mock console.log - not using vi.mock since
  // console.log is a global built in function
  console.log = (...args) => consoleOutput.push(args);
});

test('prompt ska ta emot ett namn för första spelare',() => { 

    mockAnswers = ['Olle', 'Anna'];
    let app = new App();

    expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
    expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
})

/*test('Check that a new instance of Person gets the firstName set as a property with the same value as sent to the constructor', () => {
    let gabriella = new Person('Gabriella', 'Johansson');
    expect(gabriella.firstName).toBe('Gabriella');
});*/