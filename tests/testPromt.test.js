import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPrompt.js';
import App from '../classes/App.js';


test('App ska fråga efter spelare X och spelare O:s namn', () => {
  setMockAnswers('Olle', 'Anna', 'end-test');
  let app = new App();
  expect(() => app.start()).toThrow('end-test');
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
});

/*test('Spelare X och Spelare O kan inte ha samma namn', () => { 
  setMockAnswers('Olle', 'Olle', 'Anna', 'end-test');
  expect(() => new App()).toThrow('end-test');

  // Validate that the console output includes the message asking Player O to choose a different name
expect(consoleOutput).toThrow(['Vänligen välj ett annat namn för Spelare O.']);

// Validate that the players were created with the expected names
  expect(playerX.name).toBe('Olle');
  expect(playerO.name).toBe('Anna');
});*/

test('Spelare X och Spelare O kan inte ha samma namn', () => {
  // Mock the console output
  
  setMockAnswers('Olle', 'Olle',  'end-test');
  let app = new App()
  // Validate that an error is thrown when initializing the App
   expect(() => app.createPlayers()).toThrow('end-test');
  

  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  //expect(promptQuestions[1]).toBe('Spelare O:s namn: ');

  // Validate that the console output includes the message asking Player O to choose a different name
  expect(consoleOutput[1]).toContain('Vänligen välj ett annat namn för Spelare O.');

  //let app = new App()
  // Validate that the players were created with the expected names
  //expect(app.playerX.name).toBe('Olle');
  //expect(app.playerO.name).toBe('Anna');

});


test('Spelare X och Spelare O sparas i egenskaper', () => {
  // Mock the console output
  
  setMockAnswers('Olle', 'Anna');
  let app = new App()
  
  app.createPlayers();
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  //expect(promptQuestions[1]).toBe('Spelare O:s namn: ');


  // Validate that the players were created with the expected names
  expect(app.playerX.name).toBe('Olle');
  expect(app.playerO.name).toBe('Anna');

});

