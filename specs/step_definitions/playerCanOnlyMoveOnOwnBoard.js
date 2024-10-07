import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

// Step 1: Join the network game with both players
Given('that two players are in a network game', () => {
  cy.visit('/iframed-network-play.html');  
 
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  cy.wait(5000);


  getIframeBody('iframe#Red').find('input[name="joinCode"]').then((element) => {
    let joinCode = element.val().toUpperCase();

    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    cy.wait(5000);
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    cy.wait(5000);
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
    cy.log(joinCode + '{enter}');
    cy.wait(10000);
  });
});

When('it\'s the first player\'s turn', () => {
  cy.wait(5000);
  getIframeBody('iframe#Red').find('.cell:nth-child(39)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(39)').should('not.be.enabled');
});


When('it\'s the second player\'s turn', () => {
  cy.wait(5000);

  
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38)').should('exist').click();
  cy.wait(5000);
  getIframeBody('iframe#Red').find('.cell:nth-child(38)').should('not.be.enabled');
});

Then('only the current player can make a move on their board', () => {

  getIframeBody('iframe#Red').find('.cell:nth-child(39).player-red').should('exist');
  cy.wait(5000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(38).player-yellow').should('exist');
});
