import test from 'node:test';
import assert from 'node:assert';
import {
  normalizeShift,
  shiftChar,
  caesarEncrypt,
  caesarDecrypt,
  getLetterShiftPath,
  bruteForceCaesar,
  generateChallenge,
} from '../src/js/cipher.js';

test('normalizeShift handles standard, negative, and oversized values', () => {
  assert.strictEqual(normalizeShift(0), 0);
  assert.strictEqual(normalizeShift(3), 3);
  assert.strictEqual(normalizeShift(26), 0);
  assert.strictEqual(normalizeShift(29), 3);
  assert.strictEqual(normalizeShift(-1), 25);
  assert.strictEqual(normalizeShift(-3), 23);
  assert.strictEqual(normalizeShift('7'), 7);
  assert.strictEqual(normalizeShift('invalid'), 0);
});

test('shiftChar encrypts letters correctly with wrapping and case preservation', () => {
  assert.strictEqual(shiftChar('A', 3), 'D');
  assert.strictEqual(shiftChar('Z', 1), 'A');
  assert.strictEqual(shiftChar('Z', 3), 'C');
  assert.strictEqual(shiftChar('a', 3), 'd');
  assert.strictEqual(shiftChar('z', 1), 'a');
  assert.strictEqual(shiftChar('M', 3), 'P');
  assert.strictEqual(shiftChar('m', 3), 'p');

  // Punctuation, digits and spaces must remain untouched
  assert.strictEqual(shiftChar(' ', 3), ' ');
  assert.strictEqual(shiftChar('!', 3), '!');
  assert.strictEqual(shiftChar('7', 5), '7');
  assert.strictEqual(shiftChar('@', 10), '@');
});

test('Primary project example: MEET ME AT THE LIBRARY with key 3', () => {
  const original = 'MEET ME AT THE LIBRARY';
  const shift = 3;
  const encrypted = caesarEncrypt(original, shift);
  assert.strictEqual(encrypted, 'PHHW PH DW WKH OLEUDUB');

  const decrypted = caesarDecrypt(encrypted, shift);
  assert.strictEqual(decrypted, original);
});

test('Edge shifts: shift 1, 25, 0', () => {
  const text = 'Quick Brown Fox 123!';
  assert.strictEqual(caesarEncrypt(text, 0), text);
  assert.strictEqual(caesarDecrypt(text, 0), text);

  const enc1 = caesarEncrypt(text, 1);
  assert.strictEqual(enc1, 'Rvjdl Cspxo Gpy 123!');
  assert.strictEqual(caesarDecrypt(enc1, 1), text);

  const enc25 = caesarEncrypt(text, 25);
  assert.strictEqual(caesarDecrypt(enc25, 25), text);
});

test('Empty input handles safely without errors', () => {
  assert.strictEqual(caesarEncrypt('', 3), '');
  assert.strictEqual(caesarDecrypt('', 3), '');
});

test('Letter shift path generation for educational visualizer', () => {
  const pathM = getLetterShiftPath('M', 3);
  assert.deepStrictEqual(pathM, ['M', 'N', 'O', 'P']);

  const pathZ = getLetterShiftPath('Z', 2);
  assert.deepStrictEqual(pathZ, ['Z', 'A', 'B']);

  const pathSpace = getLetterShiftPath(' ', 3);
  assert.deepStrictEqual(pathSpace, [' ']);
});

test('Brute force produces all 26 shifts and finds the original', () => {
  const ciphertext = 'PHHW PH DW WKH OLEUDUB';
  const attempts = bruteForceCaesar(ciphertext);
  assert.strictEqual(attempts.length, 26);

  // Shift 3 must recover the original
  const recovered = attempts.find((a) => a.shift === 3);
  assert.ok(recovered, 'Shift 3 should exist');
  assert.strictEqual(recovered.decrypted, 'MEET ME AT THE LIBRARY');
});

test('generateChallenge produces consistent plaintext, ciphertext, and valid shift', () => {
  for (let i = 0; i < 10; i++) {
    const challenge = generateChallenge();
    assert.ok(challenge.shift >= 1 && challenge.shift <= 25);
    assert.strictEqual(challenge.ciphertext, caesarEncrypt(challenge.plaintext, challenge.shift));
    assert.strictEqual(caesarDecrypt(challenge.ciphertext, challenge.shift), challenge.plaintext);
  }
});
