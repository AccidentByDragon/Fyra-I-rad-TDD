import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 4000;

/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

Then('players make their moves till someone has won', () => {

  cy.wait(cyWaitTime);  // Wait for UI update
    getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  cy.wait(cyWaitTime);  // Wait for UI update
    getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(cyWaitTime);
    getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(cyWaitTime);  // Wait for UI update
    getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(cyWaitTime)
    getIframeBody('iframe#Red').find('.cell:nth-child(25)').should('exist').click();
  cy.wait(cyWaitTime);  // Wait for UI upda
    
    
    getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(cyWaitTime)
    getIframeBody('iframe#Red').find('.cell:nth-child(18)').should('exist').click();
  cy.wait(cyWaitTime);  // Wait for UI update
getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();

});
  
Then('we should both see that its the first players turn', () => {
  // Expect both players to have 'X: Anna's turn...' displayed on their screens
  getIframeBody('iframe#Red').find('p:contains("Red: Anna\'s turn...")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna\'s turn...")');
});

  Then('winning message should be wisible for both players, try to check sound as well', () =>{
    getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")');
    getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")');
  });