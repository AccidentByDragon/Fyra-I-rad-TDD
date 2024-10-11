import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 4000;
/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

Then('Player Red makes the first move', () => {
  cy.wait(cyWaitTime); // Wait for UI update

  // Player Yellow (O) tries to make a move when it's Red's turn (should not work)
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').click().should('not.exist');
 

  // Player Red (X) makes the first move
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').click();


  cy.wait(cyWaitTime); // Wait for UI update

  // Player Yellow (O) makes a move when it's their turn
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  
});

/* Then('winning message should be visible for both players, try to check sound as well', () => {
  
});
 */