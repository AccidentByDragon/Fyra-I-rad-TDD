
 Feature: Check winning functionality

  Scenario: Check vertical win
    Given the game is started by joining the network
    Then players make their moves until someone wins on a vertical line
    Then the winning message should be visible for both players, try to check sound as well

  Scenario: Check horizontal win
    Given the game is started by joining the network
    Then players make their moves until someone wins on a horizontal line
    Then the winning message should be visible for both players, try to check sound as well

  Scenario: Check diagonal win
    Given the game is started by joining the network
    Then players make their moves until someone wins on a diagonal line
    Then the winning message that youllow wills should be visible for both players
