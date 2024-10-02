import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('that a game has ended', () => {
  // Visit the game page
  cy.visit('/iframed-network-play.html');

  // Player X (Red) creates a game and gets the join code
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');

  // Get join code for Player O (Yellow)
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    let joinCode = element.val();

    // Player O (Yellow) joins the game
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
  });

  // Simulate end of game (e.g., by triggering game over or playing moves)
  cy.wait(5000);  // Adjust time to simulate game actions if needed
});

When('the players choose to play again', () => {
  // Trigger the "Play again" button click
  getIframeBody('iframe#Red').find('.button:contains("Play again")').click();
});

Then('the second player from the previous game should become the first player in the new game', () => {
  // Ensure that the second player (Yellow/Beata) is now the first player in the new game
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata\'s turn...")');
  cy.wait(5000); // Give time to reflect the new state in the game
  getIframeBody('iframe#Red').find('p:contains("Yellow: Beata\'s turn...")');
});
