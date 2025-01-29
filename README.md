# Summary
## Code
### Project as a hole
The aim of the project was to create a connect four game that was playable through a browser
### This Branch
this branch was focused on creating and testing a bot against an external bot
## Test
The tests are designed to determine the intelligence of the bot by letting it play moves against an external bot by feeding its moves into the game with an external bot and returnign and playing the same move as the external bot;
The different tests are to compare the different bots we made against external bots

# More in Depth
## TEST 4A: TESTS FOR THE SYSTEM THAT DETERMINES IF SOMEONE HAS WON
### Step 1: Identify win conditions
A player wins the game if they have four of their pieces in a row, horizontally, vertically, or diagonally on the game board.

### Step 2: Write unit tests
#### Test 1: Horizontal win
A scenario where a player has four of their pieces horizontally in a row. Expected result: The system should identify that the player has won.

#### Test 2: Vertical win
A scenario where a player has four of their pieces vertically in a column. Expected result: The system should identify that the player has won.

#### Test 3: Diagonal win (from left to right)
A scenario where a player has four of their pieces diagonally from the bottom left to the top right. Expected result: The system should identify that the player has won.

#### Test 4: Diagonal win (from right to left)
A scenario where a player has four of their pieces diagonally from the bottom right to the top left. Expected result: The system should identify that the player has won.

## TEST 4B: THE PROGRAM MUST KNOW IF SOMEONE HAS WON

### Step 1: Define methods for win check
Create a method that checks all possible win combinations on the game board.

### Step 2: Implement and run tests
Implement the method according to the requirements above and run the unit tests written earlier.

(The TDD process means you first ensure the tests fail (since no win logic has been implemented yet), then implement the necessary logic and rerun the tests to verify they now pass.)

## TEST 4C: THE PROGRAM MUST REPORT WHICH PLAYER HAS WON

### Step 1: Identify the winning player
When the checkWin() method identifies a winning line, it should return which player has won (e.g., by returning the player's name or symbol).

### Step 2: Write unit tests
#### Test 1: Identify the winning player
Create a scenario where a specific player (e.g., Player 1) has four in a row. Expected result: The system should return Player 1 as the winner.

#### Test 2: No win
Create a scenario where there is no win. Expected result: The system should return null or undefined (depending on how you choose to handle this) to indicate that no one has won.

### Step 3: Implement and run tests
Implement the logic necessary to identify and return the winning player. Be sure to run all tests to verify that the new changes work as intended.

Example from our branch, in express "dependencies":

json
Copy
"dependencies": {
  "prompt-sync": "^4.2.0"
}
## Test Sprint 3
### Smart bot always wins against the dumb bot.
Allow the Smart bot to play against the dumb bot that randomly picks moves by selecting both as options in the startup
When the game is over the smart should win no matter which bot starts, as it is actively trying to create four in a row.
### Smart bot should lsoe against the even smarter online bot.
Inorder to compare how smart the bot is we allow it too play against a online bot, our smart bot should be able tod raw against the lower difficulties but lose against harder bots, in the case of the bots being equally intelligence the bot that played the first mvoe should win.
## Manual Tests:
Test that a name can be entered for Player Red.
Test that a name can be entered for Player Yellow.
Test that the piece is the first player's color.
Test that it switches to the second player's color.
Test that a piece can only be placed in an empty slot.
When someone wins, the game should notify that someone has won.
When someone has won, the four pieces in a row should be "clearly" visible by blinking 5 times and playing a sound.
When clicking "Play again," the game should SHOW that the first player switches - the second player becomes first.
Consistent use of correct language (English as the language).
When clicking "Quit game," three different options should be visible.
The game should indicate when the game is a draw.
## Automatic Tests:
Make a move as Player Red.
Make a move as Player Yellow.
Test that the piece falls to the lowest empty row and, even if you click on an occupied piece, it falls in the correct row.
The correct winner is identified and displayed by the game.
When clicking "Play again," the first player switches - the second player becomes first.
Quit game (three different options): continue the game - test that the game continues with the same players at the paused point.
"Play again" starts the game over with the same players (choosing the opposite player will let them start just like at game over). Same test as Test 5.
"Reset the game" - Test that the game restarts with new players. (Change the text "reset the game" to something clearer.)
When no more moves are possible and no one has won, it should be a draw (it’s a tie).
