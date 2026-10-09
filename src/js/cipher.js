/**
 * CIPHER QUEST - Core Cryptography Engine
 * Student: Chris Juan | Class 7 | Computer Science
 *
 * Implements Caesar cipher algorithms with strict case preservation,
 * non-alphabetic character preservation, wraparound (Z to A),
 * and educational letter-by-letter transformation tracking.
 */

export const ALPHABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ALPHABET_LOWER = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Normalizes a shift to a value between 0 and 25.
 * @param {number} shift
 * @returns {number}
 */
export function normalizeShift(shift) {
  const s = parseInt(shift, 10);
  if (isNaN(s)) return 0;
  return ((s % 26) + 26) % 26;
}

/**
 * Encrypts a single character by the given shift.
 * Preserves uppercase, lowercase, and leaves non-alphabetical characters unchanged.
 * @param {string} char
 * @param {number} shift
 * @returns {string}
 */
export function shiftChar(char, shift) {
  const normShift = normalizeShift(shift);
  if (normShift === 0) return char;

  const code = char.charCodeAt(0);

  // Uppercase A-Z (65-90)
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + normShift) % 26) + 65);
  }

  // Lowercase a-z (97-122)
  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + normShift) % 26) + 97);
  }

  // Non-alphabetic character (space, punctuation, number, symbol)
  return char;
}

/**
 * Encrypts an arbitrary message using the Caesar cipher.
 * @param {string} text
 * @param {number} shift
 * @returns {string}
 */
export function caesarEncrypt(text, shift) {
  if (typeof text !== 'string' || text.length === 0) return '';
  const normShift = normalizeShift(shift);
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += shiftChar(text[i], normShift);
  }
  return result;
}

/**
 * Decrypts a Caesar ciphertext by reversing the shift.
 * @param {string} ciphertext
 * @param {number} shift
 * @returns {string}
 */
export function caesarDecrypt(ciphertext, shift) {
  if (typeof ciphertext !== 'string' || ciphertext.length === 0) return '';
  const normShift = normalizeShift(shift);
  const reverseShift = (26 - normShift) % 26;
  return caesarEncrypt(ciphertext, reverseShift);
}

/**
 * Generates an educational step-by-step path for shifting a letter.
 * Example: for char 'M' with shift 3 -> ['M', 'N', 'O', 'P']
 * @param {string} char
 * @param {number} shift
 * @returns {string[]}
 */
export function getLetterShiftPath(char, shift) {
  const normShift = normalizeShift(shift);
  if (!char || !char.match(/[a-zA-Z]/)) {
    return [char || ' '];
  }
  const isUpper = char === char.toUpperCase();
  const baseCode = isUpper ? 65 : 97;
  const startOffset = char.charCodeAt(0) - baseCode;

  const path = [];
  for (let s = 0; s <= normShift; s++) {
    const code = ((startOffset + s) % 26) + baseCode;
    path.push(String.fromCharCode(code));
  }
  return path;
}

/**
 * Computes all 26 possible decrypted results for a given ciphertext (Shifts 0 through 25).
 * Used for the Brute-Force Code Breaking experiment.
 * @param {string} ciphertext
 * @returns {Array<{ shift: number, decrypted: string }>}
 */
export function bruteForceCaesar(ciphertext) {
  const results = [];
  for (let shift = 0; shift < 26; shift++) {
    results.push({
      shift,
      decrypted: caesarDecrypt(ciphertext, shift),
    });
  }
  return results;
}

/**
 * Curated list of school-friendly sample phrases for the code-breaking challenge.
 */
export const CHALLENGE_PHRASES = [
  'MEET ME AT THE LIBRARY',
  'DEFEND THE CASTLE GATE',
  'SECRET MESSAGE RECEIVED',
  'DISCOVERY AT MIDNIGHT',
  'TREASURE BURIED IN THE PARK',
  'THE CIPHER HAS BEEN SOLVED',
  'SCIENCE FAIR EXPERIMENT',
  'RETURN TO HEADQUARTERS',
];

/**
 * Generates a challenge with a random non-zero shift.
 * @returns {{ plaintext: string, shift: number, ciphertext: string }}
 */
export function generateChallenge() {
  const randomIndex = Math.floor(Math.random() * CHALLENGE_PHRASES.length);
  const plaintext = CHALLENGE_PHRASES[randomIndex];
  // Random shift between 1 and 25 (non-zero)
  const shift = Math.floor(Math.random() * 25) + 1;
  const ciphertext = caesarEncrypt(plaintext, shift);
  return { plaintext, shift, ciphertext };
}
