import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';
let cyWaitTime = 1000;

Given('We have started a game', () => {
  // visit the 'helper' we set up with two iframes
  // where each iframe emulates one player in a network
  cy.visit('/iframed-network-play.html');

  // player X - first player - start network game and get code
  getIframeBody('iframe#Red').find('.button.Yes').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('.button.Create').click();
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  cy.wait(cyWaitTime);
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    // we have the join code
    let joinCode = element.val();

    // player O - second player join the game
    cy.wait(cyWaitTime);
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    cy.wait(cyWaitTime);
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    cy.wait(cyWaitTime);
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    cy.wait(cyWaitTime);
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

When('Anna and Beata plays the game until the board is a full plate, without any winning combinations', () => {
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

  //Third move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(38)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Forth move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(39)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Fifth move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(40)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Sixth move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(41)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Seventh move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(42)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Second row --------------
  //8:ht move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(29)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //9:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(30)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //10:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(31)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //11:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(32)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //12:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(33)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //13:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(34)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //14:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(35)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //third row ------------
  //15:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(22)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //16:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(23)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //17:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(24)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //18:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(25)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //19:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(26)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //20:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(27)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //21:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(28)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Forth row ------------
  //22:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(16)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //23:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(17)')
    .should('exist').click();
  cy.wait(cyWaitTime);

  //24:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(18)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //25:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(19)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //26:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(20)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //27:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(21)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //28:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(10)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //29:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(15)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //30:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(8)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //31:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(9)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //32:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(12)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //33:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(11)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //34:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(14)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //35:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(13)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //Seventh row
  //36:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(2)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //37:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(1)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //38:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(4)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //39:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(3)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //40:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(6)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //41:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(5)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);

  //42:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(7)')
    .should('exist')
    .click();
  cy.wait(cyWaitTime);
});

Then('The winner text should be: its a tie...', () => {
  //Message at Red player Anna's browser
  getIframeBody('iframe#Red')
    .find('p:contains("It\'s a tie...")')
    .should('exist');

  //Message at Yellow player Beata's browser
  getIframeBody('iframe#Yellow')
    .find('p:contains("It\'s a tie...")')
    .should('exist');
});