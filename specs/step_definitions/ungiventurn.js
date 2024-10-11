import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 4000;
/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

Then('Player Red makes the first move', () => {
  cy.wait(4000); // Wait for UI update
  // Player Yellow (O) tries to make a move when it's Red's turn (should not work)
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').click()
    // .should('not.exist');

  /*cy.on('window:alert', (alertText) => {
  expect(alertText).to.contain('It is not your turn');
    expect(alertText).to.eq('It is not your turn');*/

  // Player Red (X) makes the first move
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').click();
  cy.wait(4000);
  getIframeBody('iframe#Red').find('.cell:nth-child(40)').click();
  cy.wait(4000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(40)').click();
});
