import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('game is tarted by joining the nerwrok', () => {

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

  Then('players make their moves till someone has won', () => {


    getIframeBody('iframe#Red').find('.cell[data-column="0"]').should('be.visible');

    
    // Simulating a move in the first column
    getIframeBody('iframe#Red').find('.cell[data-column="0"]').eq(5).click({ force: true }); 
    getIframeBody('iframe#Yellow').get('[data-col="1"]').eq(4).click({ force: true }); 


  });
  


  Then('winning message should be wisible for both players, try to check sound as well', () =>{
    getIframeBody('iframe#Red').find('p:contains("Red: Anna won!")');
    getIframeBody('iframe#Yellow').find('p:contains("Red: Anna won!")');
  });