Feature: Ensure players can only make moves on their own board

  Scenario: Each player can only make moves on their own board
    Given that two players are in a network game
    When it's the first player's turn
    Then only the first player can make a move on their board
    And the second player cannot make a move
    When it's the second player's turn
    Then only the second player can make a move on their board
    And the first player cannot make a move
