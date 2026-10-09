import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { QUIZ_QUESTIONS } from '../src/js/quizData.js';
import { PRESENTATION_STEPS } from '../src/js/presentationSteps.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Quiz data satisfies all 5 required Class 7 curriculum topics', () => {
  assert.strictEqual(QUIZ_QUESTIONS.length, 5, 'Should have exactly 5 questions');

  QUIZ_QUESTIONS.forEach((q, idx) => {
    assert.ok(q.question, `Question ${idx + 1} should have question text`);
    assert.strictEqual(q.options.length, 4, `Question ${idx + 1} should have 4 options`);
    const correctOptions = q.options.filter((o) => o.isCorrect);
    assert.strictEqual(correctOptions.length, 1, `Question ${idx + 1} should have exactly 1 correct answer`);
    assert.ok(q.explanation && q.explanation.length > 10, `Question ${idx + 1} should have an informative explanation`);
  });

  const topics = QUIZ_QUESTIONS.map((q) => q.topic);
  assert.ok(topics.includes('Plaintext'));
  assert.ok(topics.includes('Encryption Keys'));
  assert.ok(topics.includes('Encryption vs Decryption'));
  assert.ok(topics.includes('Symmetric vs Asymmetric'));
  assert.ok(topics.includes('Caesar Cipher Weakness'));
});

test('Presentation steps satisfy all 8 live demonstration steps', () => {
  assert.strictEqual(PRESENTATION_STEPS.length, 8, 'Should have exactly 8 steps');

  PRESENTATION_STEPS.forEach((step, idx) => {
    assert.strictEqual(step.stepNumber, idx + 1, `Step ${idx + 1} should have correct number`);
    assert.ok(step.title, `Step ${idx + 1} should have title`);
    assert.ok(step.headline, `Step ${idx + 1} should have headline`);
    assert.ok(step.note, `Step ${idx + 1} should have presenter note`);
  });

  assert.strictEqual(PRESENTATION_STEPS[0].stepNumber, 1);
  assert.strictEqual(PRESENTATION_STEPS[1].message, 'MEET ME AT THE LIBRARY');
  assert.strictEqual(PRESENTATION_STEPS[2].shift, 3);
  assert.strictEqual(PRESENTATION_STEPS[3].message, 'PHHW PH DW WKH OLEUDUB');
});

test('Color palette matches required hex codes strictly in styles.css', () => {
  const css = fs.readFileSync(path.join(rootDir, 'src/css/styles.css'), 'utf-8');
  assert.ok(css.includes('#15191E'), 'Must include background #15191E');
  assert.ok(css.includes('#252B33'), 'Must include secondary surface #252B33');
  assert.ok(css.includes('#0F8B8D'), 'Must include primary teal #0F8B8D');
  assert.ok(css.includes('#F5F7F8'), 'Must include main text #F5F7F8');
  assert.ok(css.includes('#AAB3BD'), 'Must include secondary text #AAB3BD');
  assert.ok(css.includes('#3B444F'), 'Must include borders #3B444F');
});

test('index.html contains all necessary student details and required DOM IDs', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

  // Exact student details
  assert.ok(html.includes('Chris Juan'), 'Must specify student name Chris Juan');
  assert.ok(html.includes('CIPHER QUEST'), 'Must specify CIPHER QUEST');
  assert.ok(html.includes('The Science of Secret Messages'), 'Must specify project subtitle');
  assert.ok(html.includes('Class 7') || html.includes('Class: 7'), 'Must specify Class 7');
  assert.ok(html.includes('Computer Science'), 'Must specify Computer Science');

  // Critical DOM element IDs
  const requiredIds = [
    'lab-message-input',
    'lab-shift-slider',
    'lab-shift-value',
    'lab-key-explanation',
    'lab-output-text',
    'btn-lab-encrypt',
    'btn-lab-decrypt',
    'btn-lab-clear',
    'btn-lab-copy',
    'btn-lab-swap',
    'btn-lab-reset',
    'chamber-cipher-input',
    'chamber-shift-select',
    'btn-chamber-decrypt',
    'chamber-recovered-output',
    'btn-mismatch-setup',
    'btn-mismatch-wrong',
    'btn-mismatch-correct',
    'crack-intercepted-text',
    'crack-manual-slider',
    'btn-crack-try-all',
    'btn-crack-new-challenge',
    'btn-launch-presentation',
    'presentation-overlay',
    'quiz-box',
  ];

  requiredIds.forEach((id) => {
    assert.ok(html.includes(`id="${id}"`), `index.html must include element with id="${id}"`);
  });
});
