import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from '../helpers/iframe.js';

Given('that we have started a network game', () => {
  cy.visit('/iframed-network-play.html');

});
 
Given('that Anna and Beata is registrated as players', () => {

  // Anna join the game
  getIframeBody('iframe#Red').find('.button.Yes').click();
  getIframeBody('iframe#Red').find('.button.Create').click();
  getIframeBody('iframe#Red').find('input[name="answer"]').type('Anna{enter}');
  getIframeBody('iframe#Red').find('input[name="joinCode"]').then(element => {
    // Copying the join-code ("val" equal to "Value")
    let joinCode = element.val();

    // Beata join the game
    getIframeBody('iframe#Yellow').find('.button.Yes').click();
    getIframeBody('iframe#Yellow').find('.button.Join').click();
    getIframeBody('iframe#Yellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#Yellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
  });
});

Given('we can see that its Annas turn to make a move', () => {
  getIframeBody('iframe#Red').find('p:contains("Red: Anna\'s turn...")');
  getIframeBody('iframe#Yellow').find('p:contains("Red: Anna\'s turn...")');
});

When('Anna and Beata plays the game until the board is a full plate, without any winning combinations', () => {
  //First move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(36)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Second move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(37)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Third move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(38)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Forth move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(39)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Fifth move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(40)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Sixth move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(41)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Seventh move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(42)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Second row --------------
  //8:ht move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(29)')
    .should('exist')
    .click();
  cy.wait(4000);

  //9:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(30)')
    .should('exist')
    .click();
  cy.wait(4000);

  //10:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(31)')
    .should('exist')
    .click();
  cy.wait(4000);

  //11:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(32)')
    .should('exist')
    .click();
  cy.wait(4000);

  //12:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(33)')
    .should('exist')
    .click();
  cy.wait(4000);

  //13:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(34)')
    .should('exist')
    .click();
  cy.wait(4000);

  //14:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(35)')
    .should('exist')
    .click();
  cy.wait(4000);

  //third row ------------
  //15:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(22)')
    .should('exist')
    .click();
  cy.wait(4000);

  //16:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(23)')
    .should('exist')
    .click();
  cy.wait(4000);

  //17:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(24)')
    .should('exist')
    .click();
  cy.wait(4000);

  //18:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(25)')
    .should('exist')
    .click();
  cy.wait(4000);

  //19:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(26)')
    .should('exist')
    .click();
  cy.wait(4000);

  //20:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(27)')
    .should('exist')
    .click();
  cy.wait(4000);

  //21:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(28)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Forth row ------------
  //22:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(16)')
    .should('exist')
    .click();
  cy.wait(4000);

  //23:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(17)')
    .should('exist').click();
  cy.wait(4000);

  //24:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(18)')
    .should('exist')
    .click();
  cy.wait(4000);

  //25:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(19)')
    .should('exist')
    .click();
  cy.wait(4000);

  //26:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(20)')
    .should('exist')
    .click();
  cy.wait(4000);

  //27:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(21)')
    .should('exist')
    .click();
  cy.wait(4000);

  //28:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(10)')
    .should('exist')
    .click();
  cy.wait(4000);

  //29:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(15)')
    .should('exist')
    .click();
  cy.wait(4000);

  //30:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(8)')
    .should('exist')
    .click();
  cy.wait(4000);

  //31:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(9)')
    .should('exist')
    .click();
  cy.wait(4000);

  //32:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(12)')
    .should('exist')
    .click();
  cy.wait(4000);

  //33:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(11)')
    .should('exist')
    .click();
  cy.wait(4000);

  //34:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(14)')
    .should('exist')
    .click();
  cy.wait(4000);

  //35:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(13)')
    .should('exist')
    .click();
  cy.wait(4000);

  //Seventh row
  //36:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(2)')
    .should('exist')
    .click();
  cy.wait(4000);

  //37:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(1)')
    .should('exist')
    .click();
  cy.wait(4000);

  //38:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(4)')
    .should('exist')
    .click();
  cy.wait(4000);

  //39:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(3)')
    .should('exist')
    .click();
  cy.wait(4000);

  //40:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(6)')
    .should('exist')
    .click();
  cy.wait(4000);

  //41:th move - Red: Anna
  getIframeBody('iframe#Red')
    .find('.cell:nth-child(5)')
    .should('exist')
    .click();
  cy.wait(4000);

  //42:th move - Yellow: Beata
  getIframeBody('iframe#Yellow')
    .find('.cell:nth-child(7)')
    .should('exist')
    .click();
  cy.wait(4000);
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