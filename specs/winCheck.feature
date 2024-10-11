
 Feature: Check winning functionality

  Background: We have started a game
    Given We have started a game
  Scenario: Check vertical win

    Then players make their moves until someone wins on a vertical line
    Then the winning message should be visible for both players, try to check sound as well

  Scenario: Check horizontal win

    Then players make their moves until someone wins on a horizontal line
    Then the winning message should be visible for both players, try to check sound as well

  Scenario: Check diagonal win

    Then players make their moves until someone wins on a diagonal line
    Then the winning message that youllow wills should be visible for both players
