# MANUAL TESTS:

# 1. Manual Test: Test that the Red player can enter a name
- Test Steps:
* Open the game.
* On the player setup screen, enter the name "Anna" for the Red player.
* Click "Start Game" to proceed.
* Expected Result: The name "Anna" should be displayed as the Red player’s name during the game.

# 2. Manual Test: Test that the Yellow player can enter a name
- Test Steps:
* Open the game.
* On the player setup screen, enter the name "Beata" for the Yellow player.
* Click "Start Game" to proceed.
* Expected Result: The name "Beata" should be displayed as the Yellow player’s name during the game.

# 3. Manual Test: Test that the first move is made by the Red player
- Test Steps:
Start the game.
Select any column and place the first game piece.
Expected Result: The first game piece should be Red.

4. Manual Test: Test that it switches to the Yellow player after Red's move
- Test Steps:
* Start the game.
* Make the first move as the Red player.
* Make a second move in any other column.
* Expected Result: The second game piece should be Yellow, indicating that it's the Yellow player's turn.

# 5. Manual Test: Test that the bricks can only be placed in available spots
- Test Steps:
* Start the game.
* Drop the bricks into the same column until it's full.
* Try to place another brick in the same full column.
* Expected Result: The brick should not be placed, and the column should not accept any more bricks once full.

# 6. Manual Test: Test that the game announces a winner when there is a win
- Test Steps:
* Play the game until one player gets four bricks in a row (horizontally, vertically, or diagonally).
* Expected Result: The game should display a message announcing the winner (either "Red wins!" or "Yellow wins!").

# 7. Manual Test: Test that the winning bricks blink and a sound plays when someone wins
- Test Steps:
* Play the game until one player wins.
* Expected Result: The four winning bricks should blink five times, and a sound should play.

# 8. Manual Test: Test that the first player switches after clicking "Play Again"
- Test Steps:
* Start a game and complete a match.
* Click "Play Again."
* Expected Result: The second player from the previous game (Yellow) should go first in the new game.

# 9. Manual Test: Test that the game uses consistent language (English)
- Test Steps:
* Play through the game, navigating all screens and dialogs.
* Expected Result: All text (instructions, button labels, win/lose messages) should be in English.

# 10. Manual Test: Test that three options are visible when clicking "Quit Game"
- Test Steps:
* Start a game.
* Click the "Quit Game" button.
* Expected Result: The game should display three options, such as "continue the game," "Play again," and "reset the game."

# 11. Manual Test: Test that the game declares a tie when the board is full
- Test Steps:
* Play the game until the board is completely filled without a winner.
* Expected Result: The game should display a message indicating a tie or draw

Automatiska tester:

# 1: Göra drag som spelar Röd //Karl
# 2: Göra drag som spelar Gul //Karl
# 3: Test att brickan faller till nedersta tomma raden och trots att du trycker på en UPPTAGEN bricka faller brickan i "korrekt" rad. //Karl
# 4: Rätt vinnare vet/visas av spelet - Skapa ikon?? 
# 5:  Vid Play again ska första spelare bytas ut - andra spelare blir först //jens + Kira + Alex
# 6:  Quit game - (tre olika val): Tester är: continue the game: test att spelet fortsätter med samma spelare vid pausat tillfället // 
# 7: Play again - startar om spelet MED SAMMA SPELARE (väljer motsatt spelar får börja precis som vid game over). Samma test som test 5. //jens + Alex + Kira
# 8: "reset the game" - Test att spelet startar om med NYA spelare. (Ändra texten "reset the game" till något tydligare) //destiney
# 9: När inga fler drag är möjliga och ingen har vunnit blir det oavgjort (it´s a tie). 