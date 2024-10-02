Feature: Switch first player when clicking "Play again"

  Scenario: The second player becomes the first player in the next game
    Given that a game has ended
    When the players choose to play again
    Then the second player from the previous game should become the first player in the new game
