import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

// Step 1: Join the network game with both players
Given('that two players are in a network game', () => {
  cy.visit('/iframed-network-play.html');

  // First player (Red) creates a game
  getIframeBody('iframe#Red').should('exist');  // Ensure the iframe exists
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');

  // Ensure joinCode input is visible and retrieve the join code
  getIframeBody('iframe#Red').find('input[name="joinCode"]', { timeout: 10000 }).should('be.visible').then((element) => {
    const joinCode = element.val().toUpperCase();

    // Second player (Yellow) joins the game using the join code
    getIframeBody('iframe#Yellow').should('exist');  // Ensure Yellow's iframe exists
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();

    // Ensure Yellow player's input is ready for the join code
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]', { timeout: 10000 })
      .should('be.visible')
      .type(joinCode + '{enter}');

    cy.log(`Join code used: ${joinCode}`);

    // Wait for the network game to sync
    cy.wait(10000);
  });
});

// Step 2: First player's turn
When('it\'s the first player\'s turn', () => {
  // Ensure the iframe and body are loaded, then check if it's the first player's turn (Red)
  getIframeBody('iframe#Red').find('body', { timeout: 50000 }).should('exist');

  // Verify it's the first player's turn by checking that the body does not have the 'notMyTurn' class
  getIframeBody('iframe#Red').find('body').should('not.have.class', 'notMyTurn');

  // Log all cells to debug
  getIframeBody('iframe#Red').find('.cell').each(($cell, index) => {
    cy.log(`Cell ${index + 1}: `, $cell.attr('id'), $cell.attr('class'));
  });

  // Ensure the specific cell exists and click it
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();

  // Ensure Yellow player can't interact with the same cell
  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});

When('it\'s the second player\'s turn', () => {
  // Ensure the iframe and body are loaded, then check if it's the second player's turn (Yellow)
  getIframeBody('iframe#Yellow').find('body', { timeout: 50000 }).should('exist');

  // Verify it's the second player's turn
  getIframeBody('iframe#Yellow').find('body').should('not.have.class', 'notMyTurn');

  // Log all cells to debug
  getIframeBody('iframe#Yellow').find('.cell').each(($cell, index) => {
    cy.log(`Cell ${index + 1}: `, $cell.attr('id'), $cell.attr('class'));
  });

  // Ensure the specific cell exists and click it
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();

  // Ensure Red player can't interact with the same cell
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});

// First player making a move and only first player is allowed
Then('only the first player can make a move on their board', () => {
  // Ensure Red player can make a move on the 39th cell
  getIframeBody('iframe#Red').find('.cell:nth-child(39)', { timeout: 20000 }).should('exist');

  // Ensure Yellow player cannot make a move on the 39th cell
  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});

// Second player cannot make a move
Then('the second player cannot make a move', () => {
  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});

// Only second player can make a move on their board
Then('only the second player can make a move on their board', () => {
  // Ensure Yellow player can make a move on the 38th cell
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38).player-yellow', { timeout: 10000 }).should('exist');

  // Ensure Red player cannot make a move on the 38th cell
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});

// First player cannot make a move
Then('the first player cannot make a move', () => {
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});
