import { expect, test } from 'vitest';
import registerPlayers from './helpers/commonTasks/registerPlayers.js';

test('Player Red can enter a name', async () => {
  let body = await registerPlayers();
  let playerRedName = body.querySelector('.player-red-name').innerText;
  expect(playerRedName).toBe('Anna'); // Assuming 'Anna' is the entered name
});
import { expect, test } from 'vitest';
import registerPlayers from './helpers/commonTasks/registerPlayers.js';

test('Player Red can enter a name', async () => {
  let body = await registerPlayers();

  // Debugging the DOM structure
  console.log("Rendered body HTML:", body.innerHTML);

  let playerRedNameElement = body.querySelector('.player-red-name');
  expect(playerRedNameElement).not.toBeNull(); // Ensure the element is found
  let playerRedName = playerRedNameElement.innerText;
  expect(playerRedName).toBe('Anna'); // Assuming 'Anna' is the entered name
});
