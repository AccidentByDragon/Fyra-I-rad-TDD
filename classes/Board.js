export default class Board {

  constructor() {
    this.matrix = [...new Array(6)]
      .map(row => [...new Array(7)].map(column => ' '))
    
    this.isADraw = false
  }

  winCheck() {
    // alias for "this.matrix"
    let m = this.matrix

    // Express the different ways of winning
    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],   // Horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],   // Vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],   // Diagonal left win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Diagonal right win
    ]

    for (let color of 'XO') {

      // r =row, c = column
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {

          //ro = row offset, co = column offset
          for (let winType of offsets) {

            let colorOfCombinations = ''

            for (let [ro, co] of winType) {
              colorOfCombinations += (m[r + ro] || [])[c + co]
            }
            if (colorOfCombinations === color.repeat(3)) {
              return color
            }
          }
        }
      }
    }
    return false
  }

  checkForDraw() {
    return !this.winCheck() && !this.matrix.flat().includes(' ')
  }
}


