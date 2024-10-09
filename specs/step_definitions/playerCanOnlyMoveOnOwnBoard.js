import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

// Step 1: Join the network game with both players
Given('that two players are in a network game', () => {
  cy.visit('/iframed-network-play.html');

  // First player (Red) creates a game
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  cy.wait(5000);

  // First player gets the join code
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val().toUpperCase();

    // Second player (Yellow) joins the game using the join code
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    cy.wait(5000);
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    cy.wait(5000);
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
    cy.log(`Join code used: ${joinCode}`);
    cy.wait(10000);  // Wait for the network game to sync
  });
});

// Step 2: First player's turn
When('it\'s the first player\'s turn', () => {
  cy.wait(5000);

  // Verify it's the first player's turn (Red)
  getIframeBody('iframe#Red').find('body').should('not.have.class', 'notMyTurn');

  // Debugging: Log all cells and attributes to check if we're targeting correctly
  getIframeBody('iframe#Red').find('.cell').each(($cell, index) => {
    cy.log(`Cell ${index + 1}: `, $cell.attr('id'), $cell.attr('class'));
  });

  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();

  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});

When('it\'s the second player\'s turn', () => {
  cy.wait(5000);

  getIframeBody('iframe#Yellow').find('body').should('not.have.class', 'notMyTurn');

 
  getIframeBody('iframe#Yellow').find('.cell').each(($cell, index) => {
    cy.log(`Cell ${index + 1}: `, $cell.attr('id'), $cell.attr('class'));
  });

 
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();

  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});


Then('only the first player can make a move on their board', () => {
  
  getIframeBody('iframe#Red').find('.cell:nth-child(39).player-red', { timeout: 10000 }).should('exist');

  
  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});


Then('the second player cannot make a move', () => {
  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});

Then('only the second player can make a move on their board', () => {
  
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38).player-yellow', { timeout: 10000 }).should('exist');


  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});

Then('the first player cannot make a move', () => {
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});
