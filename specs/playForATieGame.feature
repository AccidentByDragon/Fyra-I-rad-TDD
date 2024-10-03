Feature: Play until the game is a tie
  As two gamers participate in a network game and the continue playing until the board is a full plate without a win

  Scenario: Play the game 
    Given that we have started a network game
    And that Anna and Beata is registrated as players
    And we can see that its Annas turn to make a move

    When Anna and Beata plays the game until the board is a full plate, without any winning combinations

    Then The winner text should be: its a tie...
    