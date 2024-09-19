import WinCombo from "./winCombo.js";

export default class WinChecker {

  constructor(board) {
    this.board = board;
    this.matrix = board.matrix;
    this.winCombos = [];
    this.calculateWinCombos();
  }

  calculateWinCombos() {
    let m = this.matrix;

    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2], [3, -3]] // diagonal 2 win
    ];


    // r = row, c = column
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        // ro = row offset, co = column offset
        for (let winType of offsets) {
          let combo = [];
          for (let [ro, co] of winType) {
            if (r + ro < 0 || r + ro >= m.length) { continue; }
            if (c + co < 0 || c + co >= m[0].length) { continue; }
            combo.push(m[r + ro][c + co]);
          }
          if (combo.length === 4) {
            this.winCombos.push(new WinCombo(combo));
          }
        }
      }
    }
  }

}
// winningSound.play();

// Befinner mig i Thomas "video 2-5.mp4" vid ca 21:03 i tidslinjen...