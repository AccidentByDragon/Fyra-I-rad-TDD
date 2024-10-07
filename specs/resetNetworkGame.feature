Feature: Reset the game 

  Scenario: Start a game
    Given that Player X creates a game and Player O joins it
    Then game should start
    Then should select to quit game
    Then game should select Play again and start a new game 
    Then new game should begin 
    