import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 3000;
/* No duplicate steps, this one already in playForATieGame.js
Given('We have started a game', () => {});*/

Then('We should be able to see the Titles', () => {
  // check that the h1 displays the right thing on both screens
  getIframeBody('iframe#Red').find('h1:contains("Four in a Row")');
  getIframeBody('iframe#Yellow').find('h1:contains("Four in a Row")');
  // Expect both players to have 'Red: Anna's turn...' displayed on their screens
  getIframeBody('iframe#Red').find('p:contains("Red: Anna\'s turn...")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna\'s turn...")');
  cy.wait(cyWaitTime);
});

Then('after some moves all titles should be correct', () => {
  cy.wait(cyWaitTime);
  //First move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(36)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Second move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(37)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  getIframeBody('iframe#Red').find('h1:contains("Four in a Row")');
  getIframeBody('iframe#Yellow').find('h1:contains("Four in a Row")');
  // Expect both players to have 'Red: Anna's turn...' displayed on their screens
  getIframeBody('iframe#Red').find('p:contains("Red: Anna\'s turn...")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna\'s turn...")');
  cy.wait(cyWaitTime);
});