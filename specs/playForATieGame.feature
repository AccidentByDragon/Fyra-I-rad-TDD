Feature: Play until the game is a tie
  As two gamers participate in a network game and the continue playing until the board is a full plate without a win

  Background: We have started a game
    Given We have started a game

  Scenario: Play the game 

    When Anna and Beata plays the game until the board is a full plate, without any winning combinations

    Then The winner text should be: its a tie...
    