Feature: Network Game Play with Turn Management
  In order to ensure fair turn-based gameplay in a networked game of Connect 4
  As a player
  I want to ensure that players can only make moves during their own turns and that the game displays the correct winning message.

  Background: We have started a game
    Given We have started a game

  Scenario: Players take turns making valid moves
    Then Player Red makes the first move
    

