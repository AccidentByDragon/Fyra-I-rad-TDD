import { expect } from 'vitest';
import getDocument from '../mock-help/getDocument.js';
import waitUntil from '../mock-help/waitUntil.js';
import App from '../../../classes/App.js';

// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

// Register players and ensure the App is fully set up
export default async function registerPlayers() {
  let { body } = getDocument(); // Get the document
  globalThis.mockAnswers = ['Anna', 'Beata']; // Mock the names for player Red and Yellow


  let app = new App({ name: 'Anna', color: 'Red' }, { name: 'Beata', color: 'Yellow' });


  await waitUntil(() => {
    let pTag = body.querySelector('main p');
    return pTag && !pTag.innerText.includes('Enter names'); 
  });

  
  expect(app.playerRed).toBeDefined();  
  expect(app.playerRed.name).toBe('Anna');  
  expect(app.playerYellow).toBeDefined(); 
  expect(app.playerYellow.name).toBe('Beata'); 

  return body; 
}
