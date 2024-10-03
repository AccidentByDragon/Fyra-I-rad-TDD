import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

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