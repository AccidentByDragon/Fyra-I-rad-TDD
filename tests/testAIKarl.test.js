import { expect, test } from 'vitest';

// helpers for mocking
// import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';

// Unused helpers for mocking
// import sleep from './helpers/mock-help/getDocument.js';
// import waitUntil from './helpers/mock-help/waitUntil.js';

// A helper for auto-mocking new players before any test
import registerPlayers from './helpers/common tasks/registerPlayers.js';

// mock audio
globalThis.Audio = class Audio { play() { } }

// The App class from the program
import App from '../classes/App.js';
import sleep from './helpers/mock-help/sleep.js';

/* testings in this file:

*/