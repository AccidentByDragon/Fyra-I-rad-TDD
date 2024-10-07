import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

// Common 'Given' step to initialize the game
Given('the game is started by joining the network', () => {
  cy.visit('/iframed-network-play.html');

  // Player X (Red) starts the game and gets the code
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    let joinCode = element.val();

    // Player O (Yellow) joins the game using the join code
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    cy.wait(1000);
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    cy.wait(1000);
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
  });
});

Then('players make their moves until someone wins on a vertical line', () => {
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(25)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(18)').should('exist').click();
  
});


Then('players make their moves until someone wins on a horizontal line', () => {
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(42)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(41)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(40)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  
});




Then('the winning message should be visible for both players, try to check sound as well', () => {
  getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")');
});


Then('players make their moves until someone wins on a diagonal line', () => {
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(37)').should('exist').click();
  
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('exist').click();
  
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(30)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(31)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(24)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(18)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(25)').should('exist').click();

  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(11)').should('exist').click();
});



Then('the winning message that youllow wills should be visible for both players', () => {
  getIframeBody('iframe#Red').find('p:contains("Yellow: Beata won!")');
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata won!")');
});