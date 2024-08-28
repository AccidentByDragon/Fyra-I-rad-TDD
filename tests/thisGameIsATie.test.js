import { expect, test } from 'vitest'
import {promptQuestions, consoleOutput,setMockAnswers,log
       } from './helpers/mockPromptAndConsoleLog.js'
import Board from '../classes/Board.js'
import App from '../classes/App.js'


// 1) Testar att alla brickor är spelade utan vinst.
test('Check that the game is a draw when all the positions on the board are played without a win',
  () => {
    let app = new App
   
    expect(app.itIsATie()).toEqual([
      ['O', 'O', 'O', 'X', 'X', 'X', 'O'],
      ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
      ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
      ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
      ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
      ['O', 'X', 'O', 'X', 'O', 'X', 'O']
    ])
  })

// 2) Ska testa att rätt meddelande skickas om det blivit oavgjort.
  test('Checking the correct massage when it is a draw game.', () => {
    let app = new App
    expect(app.winnerAtGameOver()).toBe('Spelet blev oavgjort')
  })
  
