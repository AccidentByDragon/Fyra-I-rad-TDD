import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('game is started by joining the network', () => {
  cy.visit('/iframed-network-play.html');

  // Player Red (X) - Create game and get code
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    const joinCode = element.val();

    // Player Yellow (O) - Join the game with the join code
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
  });
});

Then('Player Red makes the first move', () => {
  cy.wait(4000); // Wait for UI update

  // Player Yellow (O) tries to make a move when it's Red's turn (should not work)
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').click().should('not.exist');
 

  // Player Red (X) makes the first move
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').click();


  cy.wait(4000); // Wait for UI update

  // Player Yellow (O) makes a move when it's their turn
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  
});

/* Then('winning message should be visible for both players, try to check sound as well', () => {
  
});
 */