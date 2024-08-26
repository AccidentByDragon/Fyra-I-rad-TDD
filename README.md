# Fyra-I-rad-TDD
## Epics
### EPIC:s för denna sprint
Skapa logiken för ett fungerande Fyra i rad-spel (för två människospelare vid samma dator) - inget grafiskt gränssnitt.
Arbeta enligt TDD (Test Driven Development) - bryt ner varje user story till deljarade tasks - dvs. detaljerade specifikationer av vilka klasser och metoder som ska skapas och hur de ska fungera. Skriv heltäckande enhetstester innan motsvarande programlogik.
Arbeta objektorienterat i JavaScript och med Vitest/Jest som testverktyg.
### EPICS i kommande sprinter:
#### Sprint 2: Skapa ett grafiskt användargränssnitt och testa det.
#### Sprint 3: Skapa en regelbaserad AI och testa den.
#### Sprint 4: Lägg till möjlighet att spela över nätverk och testa denna funktionalitet.

## User stories
### Som användare vill jag kunna ange mitt namn vid början av spelet så att datorn sedan kan använda sig av det för att meddela vems tur det är och vem som har vunnit.
### Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i.
### Som användare vill jag inte kunna göra förbjudna drag, dvs. inte kunna lägga till brickor i en full kolumn eller efter det att någon har vunnit, så att spelreglerna följs.
### Som användare vill jag att programmet meddelar om någon har vunnit så att vi vet detta.
### Som användare vill jag att programmet meddelar om det har blivit oavgjort så att vi vet detta.
### Som användare vill jag efter avslutat spel få frågan om vi (jag och den andra användaren) vill spela igen. Om vi svarar ja vill jag att ett nytt spel ska starta (med ett tomt bräde) så att vi kan spela igen.
### Som systemägare vill jag att programmet skrivs objektorienterat så att kodbasen blir enklel att underhålla.
### Som systemägare vill jag att alla metoder i alla klasser testas med unit-tester, så att vi vet att logik och delmängder av programmet fungerar som de ska. (Kanske är detta en delmängd i varje user-story, “att testa”, snarare än en egen user story?)

Kira. User story 2
Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i.

Tests:
++Spelare måste ha möjlighet att välja drag
++Spelare måste ha måglighet välja bara valid column
++Drag måste regestreras på valde plats
??Bricka skulle falla ner till lägsta tom plats i valda column
Column kan skrivas bara med cifror
Cant meka a move if column is full

test('App ska fråga efter spelare X och spelare O:s namn', () => {
  setMockAnswers('Olle', 'Anna', 'end-test');
  let app = new App();
  expect(() => app.start()).toThrow('end-test');
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
});


test('Spelare X och Spelare O kan inte ha samma namn', () => {
  // Mock the console output
  
  setMockAnswers('Olle', 'Olle',  'end-test');
  let app = new App()
  // Validate that an error is thrown when initializing the App
   expect(() => app.createPlayers()).toThrow('end-test');
  

  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  //expect(promptQuestions[1]).toBe('Spelare O:s namn: ');

  // Validate that the console output includes the message asking Player O to choose a different name
  expect(consoleOutput[1]).toContain('Vänligen välj ett annat namn för Spelare O.');

});


test('Spelare X och Spelare O sparas i egenskaper', () => {
  // Mock the console output
  
  setMockAnswers('Olle', 'Anna');
  let app = new App()
  
  app.createPlayers();
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  //expect(promptQuestions[1]).toBe('Spelare O:s namn: ');


  // Validate that the players were created with the expected names
  expect(app.playerX.name).toBe('Olle');
  expect(app.playerO.name).toBe('Anna');

});

test('Spelare måste ha möjlighet att välja drag', () => {
  // Set up mock answers:
  // - Player X's name
  // - Player O's name
  // - The column for the move (e.g., column 3)
  // - Finally, set "end-test" to stop the game
  setMockAnswers('Olle', 'Anna', '3', 'end-test');
  
  let app = new App();
  
  // We expect the game to throw 'end-test' to indicate it's time to stop testing
  expect(() => app.start()).toThrow('end-test');
  
  // Verify that the game asked for Player X's name
  expect(promptQuestions[0]).toBe('Spelare X:s namn: ');
  
  // Verify that the game asked for Player O's name
  expect(promptQuestions[1]).toBe('Spelare O:s namn: ');
  
  // Verify that the game prompted Player X to make a move
  expect(promptQuestions[2]).toBe('Ange ditt drag X Olle - skriv in column: ');
  
  // Verify that a move was made in the specified column (column 3)
  // Depending on the implementation, you may want to check the board state or similar
  //let board = app.board;
  
  // Optionally, you can also verify the log to check if the board was rendered
  //expect(consoleOutput.length).toBeGreaterThan(0);
});

