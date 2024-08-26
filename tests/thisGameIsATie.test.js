import { expect, test } from 'vitest'
import {promptQuestions, consoleOutput,setMockAnswers,log
       } from './helpers/mockPromptAndConsoleLog.js'
import Board from '../classes/Board.js'
import App from '../classes/App.js'


test('Check that it is a draw when all the positions on the board are played without a win',
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





// test('Check if the game is a tie', () => {
//   let aBoard = new Board()
//   expect(!aBoard.matrix.flat()).not.includes(' ')
// })





// return !this.winCheck() && !this.matrix.flat().includes(' ')
