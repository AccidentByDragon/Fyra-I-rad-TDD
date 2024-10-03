import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

// Scenario 1: Play a full game

Given('the game is started by joining the network', () => {
  cy.visit('/iframed-network-play.html');

  // Player X (Red) starts the game
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');

  // Get the join code for Player O (Yellow)
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    let joinCode = element.val();
    // Player O (Yellow) joins the game
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

When('the players make their moves until one player wins', () => {
  // Close any visible dialog box if present before starting the game
  getIframeBody('iframe#Red').find('dialog').then(dialog => {
    if (dialog.is(':visible')) {
      dialog.find('button').click(); // Close the dialog if it's open
    }
  });

  // Simulate moves for both players until Player X (Red) wins
  const moves = [
    { player: 'Red', cell: 39 },
    { player: 'Yellow', cell: 38 },
    { player: 'Red', cell: 32 },
    { player: 'Yellow', cell: 37 },
    { player: 'Red', cell: 25 },
    { player: 'Yellow', cell: 36 },
    { player: 'Red', cell: 18 }  // Winning move
  ];

  moves.forEach(({ player, cell }, index) => {
    cy.wait(1000); // Reduced wait time to speed up the test
    getIframeBody(`iframe#${player}`).find(`.cell:nth-child(${cell})`).click({ force: true }); // Use force to bypass overlay issues
  });

  // Adding an extra wait after the winning move to allow for UI updates
  cy.wait(2000);
});

Then('the winning message should be visible for both players', () => {
  // Ensure the winning message appears
  cy.wait(2000); // Wait for the message to render
  getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")').should('be.visible');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")').should('be.visible');
});

// Scenario 2: Switch first player

Given('that the game has ended', () => {
  // Ensure that the game has ended
  getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")').should('be.visible');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")').should('be.visible');
});

When('the players choose to play again', () => {
  // Ensure the "Play Again" button is visible, then click it for both players
  getIframeBody('iframe#Red').find('.button.PlayAgain', { timeout: 10000 }).should('be.visible').click();
  getIframeBody('iframe#Yellow').find('.button.PlayAgain', { timeout: 10000 }).should('be.visible').click();
});

Then('the second player from the previous game should become the first player in the new game', () => {
  // Verify that Player O (Yellow) becomes the first player in the new game
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata\'s turn...")').should('be.visible');
});
