import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 2000;

/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

Then('game should start', () => {
  cy.wait(500);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(500);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(500);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(3000);
});


Then('should select to quit game', () => {
  getIframeBody('iframe#Red').find('.button').contains('Quit this game').should('exist').click();   
  cy.wait(cyWaitTime)
});

Then('game should select Play again and start a new game', () => {
  getIframeBody('iframe#Red').find('input.button[value="Play again"]').should('exist').click();
  cy.wait(cyWaitTime)
});


Then('new game should begin', () => {
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata\'s turn...")').should('be.visible');
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(40)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(30)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.cell:nth-child(18)').should('exist').click();
});