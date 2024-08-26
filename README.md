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

# Test 5: Ingen vinst (ändå pågår spelet)
Skapa ett scenario där det inte finns någon rad med fyra brickor i rad för någon spelare.
Förväntat resultat: Systemet ska identifiera att ingen har vunnit och spelet fortsätter.  


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



# kolla kiras kod - går den alla diagonalter 

jdsnvkjdsnjkdsnvjks