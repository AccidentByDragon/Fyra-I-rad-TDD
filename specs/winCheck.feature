
Feature: Check winning functionality

  Scenario: Start a game
    Given game is tarted by joining the nerwrok
    Then players make their moves till someone has won
    Then winning message should be wisible for both players, try to check sound as well