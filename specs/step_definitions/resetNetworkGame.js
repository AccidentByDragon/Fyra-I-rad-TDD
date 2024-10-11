import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

// Common 'Given' step to initialize the game
Given('that Player X creates a game and Player O joins it', () => {
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
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
  });
});

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
  cy.wait(2000)
});

Then('game should select Play again and start a new game', () => {
  getIframeBody('iframe#Red').find('input.button[value="Play again"]').should('exist').click();
  cy.wait(2000)
});


Then('new game should begin', () => {
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata\'s turn...")').should('be.visible');
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(40)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(32)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(37)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(30)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Yellow').find('.cell:nth-child(36)').should('exist').click();
  cy.wait(1000);
  getIframeBody('iframe#Red').find('.cell:nth-child(18)').should('exist').click();
});