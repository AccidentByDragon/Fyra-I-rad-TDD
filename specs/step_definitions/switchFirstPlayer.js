import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 2000;


/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

When('the players make their moves until one player wins', () => {
  cy.wait(5000);  
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Red').find('.cell:nth-child(25)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Red').find('.cell:nth-child(18)').should('exist').click();
  cy.wait(5000); 
});


Then('the winning message should be visible for both players', () => {
  getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")').should('be.visible');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")').should('be.visible');
});

Given('that the game has ended', () => {
  getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")').should('be.visible');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")').should('be.visible');
});

When('the players choose to play again', () => {
  getIframeBody('iframe#Red').find('.button:contains("Play again")').should('be.visible').click();
  //getIframeBody('iframe#Yellow').find('.button:contains("Play again")').should('be.visible').click();
});

Then('the second player from the previous game should become the first player in the new game', () => {
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata\'s turn...")').should('be.visible');
});
