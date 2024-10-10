Feature: Switch first player when clicking "Play again"

  Scenario: Play a full game
    Given the game starts by joining the network
    When the players make their moves until one player wins
    Then the winning message should be visible for both players

  Scenario: The second player becomes the first player in the next game
    Given that the game has ended
    When the players choose to play again
    Then the second player from the previous game should become the first player in the new game
