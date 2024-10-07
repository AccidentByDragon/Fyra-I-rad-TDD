import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';


Given('the game is started by joining the network', () => {
  cy.visit('/iframed-network-play.html');  // Visit the helper page with iframes

  //Red starts the game
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

// Step 2: Players make their moves until one player wins
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
