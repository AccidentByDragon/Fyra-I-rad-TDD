import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 3000;
/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

Then('players make their moves until someone wins on a vertical line', () => {
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(25)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(18)').should('exist').click();
  
});


Then('players make their moves until someone wins on a horizontal line', () => {
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(42)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(41)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(40)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  
});




Then('the winning message should be visible for both players, try to check sound as well', () => {
  getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")');
  cy.wait(3000);
});


Then('players make their moves until someone wins on a diagonal line', () => {
  cy.wait(3000);
  getIframeBody('iframe#Red').find('.cell:nth-child(37)').should('exist').click();
  
  cy.wait(3000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('exist').click();
  
  cy.wait(3000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(30)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Red').find('.cell:nth-child(31)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(24)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(18)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Red').find('.cell:nth-child(25)').should('exist').click();

  cy.wait(3000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(11)').should('exist').click();
});



Then('the winning message that youllow wills should be visible for both players', () => {
  getIframeBody('iframe#Red').find('p:contains("Yellow: Beata won!")');
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata won!")');
  cy.wait(3000);
});