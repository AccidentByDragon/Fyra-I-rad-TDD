import { expect, test } from 'vitest'
import {promptQuestions, consoleOutput,setMockAnswers,log
       } from './helpers/mockPromptAndConsoleLog.js'
import Board from '../classes/Board.js'


test('Play all the positions on the board for a tie',
  () => {
    expect(app.board.matrix).toEqual([
      ['O', 'O', 'O', 'X', 'X', 'X', 'O'],
      ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
      ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
      ['O', 'X', 'O', 'X', 'O', 'X', 'O'],
      ['X', 'O', 'X', 'O', 'X', 'O', 'X'],
      ['O', 'X', 'O', 'X', 'O', 'X', 'O']
    ])
  })

test('Check if the game is a tie', () => {
  let aBoard = new Board()
  expect(!aBoard.matrix.flat()).not.includes(' ')
})





// return !this.winCheck() && !this.matrix.flat().includes(' ')
