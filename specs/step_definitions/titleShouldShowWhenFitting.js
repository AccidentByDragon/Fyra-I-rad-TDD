import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

let cyWaitTime = 600;

Given('We have started a game', () => {
  // visit the 'helper' we set up with two iframes
  // where each iframe emulates one player in a network
  cy.visit('/iframed-network-play.html');

  // player X - first player - start network game and get code
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    // we have the join code
    let joinCode = element.val();

    // player O - second player join the game
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

Then('We should be able to see the Titles', () => {
  // check that the h1 displays the right thing on both screens
  getIframeBody('iframe#Red').find('h1:contains("Four in a Row")');
  getIframeBody('iframe#Yellow').find('h1:contains("Four in a Row")');
  // Expect both players to have 'Red: Anna's turn...' displayed on their screens
  getIframeBody('iframe#Red').find('p:contains("Red: Anna\'s turn...")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna\'s turn...")');
});

Then('after some moves all titles should be correct', () => {
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
});