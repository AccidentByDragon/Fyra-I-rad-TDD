import { expect, test } from 'vitest'
import Board from '../classes/Board.js'

test('Check if the game is a tie', () => {
  let aBoard = new Board()
  expect(!aBoard.matrix.flat()).not.includes(' ')
})




// return !this.winCheck() && !this.matrix.flat().includes(' ')