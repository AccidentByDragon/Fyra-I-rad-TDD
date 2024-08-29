// tests/helpers/mockPromptAndConsoleLog.js
import { vi, beforeEach } from 'vitest';

export const promptQuestions = [], consoleOutput = [];
let mockAnswers = [];

export function setMockAnswers(...answers) {
  mockAnswers = answers;
}

export const log = console.log;

beforeEach(() => {  
  promptQuestions.length = 0;

  vi.mock('../../helpers/prompt.js', async () => {
    return {
      default: (question) => {
        promptQuestions.push(question);
        let nextAnswer = mockAnswers.shift();
        if (nextAnswer === 'end-test') {
          throw new Error('end-test');
        }
        return nextAnswer;
      }
    }
  });

  consoleOutput.length = 0;
  console.log = (...args) => consoleOutput.push(args);
});
