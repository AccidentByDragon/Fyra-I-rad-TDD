export default class Something {

  constructor() {
    this.matrix = [...new Array(7)]
      .map(row => [...new Array(7)].map(column => ' '))
  }

  checkForDraw() {
    return !this.winCheck() && !this.matrix.flat().includes(' ')
  }

}