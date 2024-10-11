Feature: Reset the game 

  Background: We have started a game
    Given We have started a game

  Scenario: Start a game
    Then game should start
    Then should select to quit game
    Then game should select Play again and start a new game 
    Then new game should begin 
    