## TEST 4A TESTER FÖR SYSTEMET SOM AVGÖR OM NÅGON HAR VUNNIT

# Steg 1: Identifiera vinstvillkor

En spelare vinner spelet om de har fyra av sina brickor i rad horisontellt, vertikalt, eller diagonalt på spelbrädet.

# Steg 2: Skriv enhetstester/Unit tests

# Test 1: Horisontell vinst
Ett scenario där en spelare har fyra av sina brickor horisontellt på en rad.
Förväntat resultat: Systemet ska identifiera att spelaren har vunnit.

# Test 2: Vertikal vinst
Ett scenario där en spelare har fyra av sina brickor vertikalt i en kolumn.
Förväntat resultat: Systemet ska identifiera att spelaren har vunnit.

# Test 3: Diagonal vinst (från vänster till höger)
Ett scenario där en spelare har fyra av sina brickor diagonalt från nedre vänstra till övre högra hörnet.
Förväntat resultat: Systemet ska identifiera att spelaren har vunnit.

# Test 4: Diagonal vinst (från höger till vänster)
Ett scenario där en spelare har fyra av sina brickor diagonalt från nedre högra till övre vänstra hörnet.
Förväntat resultat: Systemet ska identifiera att spelaren har vunnit.



## TEST 4B PROGRAMMET SKA KUNNA VETA OM NÅGON HAR VUNNIT

# Steg 1: Definiera metoder för vinstkontroll
Skapa en metod som kontrollerar alla möjliga vinstkombinationer på spelbrädet.

# Steg 2: Implementera och köra tester
Implementera metoden enligt kraven ovan och kör de enhetstester som tidigare skrivits.

(TDD-processen innebär att du först ser till att testerna misslyckas (eftersom ingen vinstlogik ännu finns implementerad), därefter implementerar du den nödvändiga logiken och kör testerna igen för att verifiera att de nu går igenom)


## TEST 4C PROGRAMMET SKA BERÄTTA VILKEN SPELAR SOM HAR VUNNIT

# Steg 1: Identifiera vinnande spelare

När checkWin() metoden identifierar en vinnande rad, ska den returnera vilken spelare som har vunnit (t.ex. genom att returnera spelarens namn eller symbol).
# Steg 2: Skriv enhetstester

# Test 1: Identifiera vinnande spelare
Skapa ett scenario där en viss spelare (t.ex. Spelare 1) har fyra i rad.
Förväntat resultat: Systemet ska returnera Spelare 1 som vinnaren.
# Test 2: Ingen vinst
Skapa ett scenario där det inte finns någon vinst.
Förväntat resultat: Systemet ska returnera null eller undefined (beroende på hur du väljer att hantera detta) för att indikera att ingen har vunnit.

# Steg 3: Implementera och köra tester

Implementera den logik som behövs för att identifiera och returnera den vinnande spelaren.
Se till att kör alla tester för att verifiera att de nya ändringarna fungerar som avsett.


Exaple from our branch, in Thomas express
 "dependencies": {
    "prompt-sync": "^4.2.0",
    
 }


Manuella tester:

1: Test att det går att skriva in ett namn för spelare Röd
2: Test att det går att skriva in ett namn för spelare Gul
3: test att brickan är första spelarens färg
4: test att det skiftar till andra spelares färg
5: test att bricka går att lägga på ENDAST lediga lucka
6: När någon vinner ska spelet meddela att någon vunnit
7: När någon har vunnit syns de fyra brickorna i rad "tydligt" genom att blinka 5 ggr och vi hör en truddelutt
8: Vid Play again ska spelat VISA att första spelare bytas ut - andra spelare blir först
9: Genomgående korrekt/konsekvent språkval (engelska som språk)
10: Vid Quit game SYNS tre olika val
11: Det visas när det blir oavgjort

Automatiska tester:

1: Göra drag som spelar Röd
2: Göra drag som spelar Gul
3: Test att brickan faller till nedersta tomma raden och trots att du trycker på en UPPTAGEN bricka faller brickan i "korrekt" rad.
4: Rätt vinnare vet/visas av spelet
5:  Vid Play again ska första spelare bytas ut - andra spelare blir först
6:  Quit game - (tre olika val): continue the game: test att spelet fortsätter med samma spelare vid pausat tillfället
7: Play again - startar om spelet MED SAMMA SPELARE (väljer motsatt spelar får börja precis som vid game over). Samma test som test 5.
8: "reset the game" - Test att spelet startar om med NYA spelare. (Ändra texten "reset the game" till något tydligare)
9: När inga fler drag är möjliga och ingen har vunnit blir det oavgjort (it´s a tie).


Tester:
1) Test för att visa spelarnamn - se spelarens namn vid korrekt drag
2) Vems tur att spela (korrekt spelar syns)
3) Vinnaren visas
4) Vart det vinnande draget är - (synligt)
5) Play again - funkar - startar nytt spel
6) Quit game - funkar - avslutar spelet

Manuella tester:

1: Test att det går att skriva in ett namn för spelare Röd
2: Test att det går att skriva in ett namn för spelare Gul
3: test att brickan är första spelarens färg
4: test att det skiftar till andra spelares färg
5: test att bricka går att lägga på ENDAST lediga lucka
6: När någon vinner ska spelet meddela att någon vunnit
7: När någon har vunnit syns de fyra brickorna i rad "tydligt" genom att blinka 5 ggr och vi hör en truddelutt
8: Vid Play again ska spelat VISA att första spelare bytas ut - andra spelare blir först
9: Genomgående korrekt/konsekvent språkval (engelska som språk)
10: Vid Quit game SYNS tre olika val
11: Det visas när det blir oavgjort
Automatiska tester:

1: Göra drag som spelar Röd
2: Göra drag som spelar Gul
3: Test att brickan faller till nedersta tomma raden och trots att du trycker på en UPPTAGEN bricka faller brickan i "korrekt" rad.
4: Rätt vinnare vet/visas av spelet
5:  Vid Play again ska första spelare bytas ut - andra spelare blir först
6:  Quit game - (tre olika val): continue the game: test att spelet fortsätter med samma spelare vid pausat tillfället
7: Play again - startar om spelet MED SAMMA SPELARE (väljer motsatt spelar får börja precis som vid game over). Samma test som test 5.
8: "reset the game" - Test att spelet startar om med NYA spelare. (Ändra texten "reset the game" till något tydligare)
9: När inga fler drag är möjliga och ingen har vunnit blir det oavgjort (it´s a tie).