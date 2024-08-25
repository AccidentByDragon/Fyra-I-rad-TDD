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

test('Spelare måste ha möjlighet att välja drag', () => {
  // Set up mock answers:
  // - Player X's name
  // - Player O's name
  // - The column for the move (e.g., column 3)
  // - Finally, set "end-test" to stop the game
  setMockAnswers('Olle', 'Anna', '3', 'end-test');
  
  let app = new App();
  
  // We expect the game to throw 'end-test' to indicate it's time to stop testing
  expect(() => app.start()).toThrow('end-test');
  
  // Verify that the game asked for Player X's name
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  
  // Verify that the game asked for Player O's name
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  
  // Verify that the game prompted Player X to make a move
  expect(promptQuestions[2]).toBe('Ange ditt drag X Olle - skriv in column: ');
  
  // Verify that a move was made in the specified column (column 3)
  // Depending on the implementation, you may want to check the board state or similar
  //let board = app.board;
  
  // Optionally, you can also verify the log to check if the board was rendered
  //expect(consoleOutput.length).toBeGreaterThan(0);
});

