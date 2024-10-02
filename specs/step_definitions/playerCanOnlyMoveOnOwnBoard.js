import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('that two players are in a network game', () => {
  // Visit the network play page with two iframes for both players
  cy.visit('/iframed-network-play.html');

  // Player X (Red) creates a game and gets the join code
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');

  // Get the join code
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    let joinCode = element.val();

    // Player O (Yellow) joins the game using the join code
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

When('it\'s the first player\'s turn', () => {
  // Wait until it's Player X's (Red) turn
  getIframeBody('iframe#Red').find('p:contains("Red: Anna\'s turn...")').should('exist');
});

Then('only the first player can make a move on their board', () => {
  // Player X (Red) makes a move
  getIframeBody('iframe#Red').find('.cell').eq(0).click({ force: true });
  getIframeBody('iframe#Red').find('.cell').eq(0).should('have.class', 'Red', { timeout: 10000 });

  // Ensure Player O (Yellow) cannot make a move during Player X's turn
  getIframeBody('iframe#Yellow').find('.cell').eq(0).click({ force: true });
  getIframeBody('iframe#Yellow').find('.cell').eq(0).should('not.have.class', 'Yellow', { timeout: 10000 });
});

When('it\'s the second player\'s turn', () => {
  // Wait until it's Player O's (Yellow) turn
  getIframeBody('iframe#Yellow').find('p:contains("Yellow: Beata\'s turn...")').should('exist');
});

Then('only the second player can make a move on their board', () => {
  // Player O (Yellow) makes a move
  getIframeBody('iframe#Yellow').find('.cell').eq(1).click({ force: true });
  getIframeBody('iframe#Yellow').find('.cell').eq(1).should('have.class', 'Yellow', { timeout: 10000 });

  // Ensure Player X (Red) cannot make a move during Player O's turn
  getIframeBody('iframe#Red').find('.cell').eq(1).click({ force: true });
  getIframeBody('iframe#Red').find('.cell').eq(1).should('not.have.class', 'Red', { timeout: 10000 });
});
