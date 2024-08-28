Starta test genom att skriva _"npm test"_ i konsollen.

# Testkod snippets
```js
// Försök till alternativ oavgjord-test:
test('Check that the game is a draw when all the positions on the board are played without a win',
  () => {
    let app = new App
    let board = new Board
    expect(app.itIsATie().flat()).not.toBe(board.checkForDraw())
    // expect(app.itIsATie().flat()).not.includes(board.winCheck() && ' ')
  })

// Grundkod från Tre-i-rad för att avgöra oavgjort.
!this.winCheck() && !this.matrix.flat().includes(' ')


test('Check if the game is a tie', () => {
  let aBoard = new Board()
  expect(!aBoard.matrix.flat()).not.includes(' ')
})

test('Check if the game is a tie', () => {
  let aBoard = new Board()
  expect(!aBoard.matrix.flat()).not.includes(' ')
})



return !this.winCheck() && !this.matrix.flat().includes(' ')
```



# Exempel för Class / Constructor (receptet)
Beskriver hur klass fungerar:
```js

/*export default*/class Receptet {

  constructor( inparameter ) {
    this.egenskaper = inparameter
  }
  theMethod() {
    return `Använd inparametern ${this.egenskaper}!`
    }
}
//export default Receptet - Kan exporteras här eller direkt vid klassen

let instans_av_klassen = new Receptet(inparameter)


render() { // render = skriver ut något...
  console.table(this.matrisen) //skriver ut enkla tabeller i konsollen.
}

.map = ta alla världen i en array och omvanlda dem till ny array. 

//Exempel på kod som ändrar till versal begynelsebokstav och sedan gemener
['firstName', 'lastName'].map(x=>x[0].toUpperCase()+x.slice(1).toLowerCase())


Rita upp board

render() {
  let line = '\n' + '-'.repeat(10) + '\n'
  console.log(
    line + 
    this.matrix.map(row => row.map(column => `| ${column}`).join('')+')  )
}
