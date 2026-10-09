/**
 * Quiz Data for CIPHER QUEST
 * 5 questions matching Class 7 Computer Science curriculum.
 */
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    topic: 'Plaintext',
    question: 'What is plaintext in cryptography?',
    options: [
      { text: 'A secret code that has been scrambled with a key', isCorrect: false },
      { text: 'The original, readable message before it is encrypted', isCorrect: true },
      { text: 'A computer password saved in an encrypted database', isCorrect: false },
      { text: 'The mathematics used to break an unknown code', isCorrect: false },
    ],
    explanation: 'Plaintext is the original message in ordinary, human-readable form before any encryption process is applied.'
  },
  {
    id: 2,
    topic: 'Encryption Keys',
    question: 'What is the purpose of an encryption key?',
    options: [
      { text: 'To specify the exact secret rule or shift used to transform and recover the message', isCorrect: true },
      { text: 'To permanently erase unneeded characters from the message', isCorrect: false },
      { text: 'To speed up internet transmission by compressing file size', isCorrect: false },
      { text: 'To display error warnings when a message is too long', isCorrect: false },
    ],
    explanation: 'An encryption key provides the specific parameter (such as a shift number or secret formula) that determines how the message is scrambled and how it can be unlocked.'
  },
  {
    id: 3,
    topic: 'Encryption vs Decryption',
    question: 'What is the difference between encryption and decryption?',
    options: [
      { text: 'Encryption deletes messages, while decryption creates new ones', isCorrect: false },
      { text: 'Encryption is only used for numbers, while decryption works on text', isCorrect: false },
      { text: 'Encryption scrambles readable text into secret ciphertext; decryption reverses it back to original plaintext', isCorrect: true },
      { text: 'Encryption happens on the receiver side, and decryption happens on the sender side', isCorrect: false },
    ],
    explanation: 'Encryption turns understandable plaintext into disguised ciphertext, whereas decryption reverses the process to restore the original message using the proper key.'
  },
  {
    id: 4,
    topic: 'Symmetric vs Asymmetric',
    question: 'What is the difference between symmetric and asymmetric encryption?',
    options: [
      { text: 'Symmetric uses one shared key for both locking and unlocking; asymmetric uses a public key to encrypt and a private key to decrypt', isCorrect: true },
      { text: 'Symmetric encryption can never be broken, while asymmetric encryption is easily cracked', isCorrect: false },
      { text: 'Symmetric works only offline, while asymmetric works only on mobile phones', isCorrect: false },
      { text: 'Symmetric scrambles every letter, but asymmetric only scrambles vowels', isCorrect: false },
    ],
    explanation: 'Symmetric encryption relies on a single shared secret key, whereas asymmetric encryption uses a mathematical pair: a public key for encryption and a private key for decryption.'
  },
  {
    id: 5,
    topic: 'Caesar Cipher Weakness',
    question: 'Why is the Caesar cipher considered weak and not secure for modern communication?',
    options: [
      { text: 'Because it takes over 100 hours for a computer to compute', isCorrect: false },
      { text: 'Because it only has 25 possible shifts, making it trivial to test every shift by brute force', isCorrect: true },
      { text: 'Because it converts characters into audio frequencies instead of text', isCorrect: false },
      { text: 'Because it requires satellite connections to transmit the letters', isCorrect: false },
    ],
    explanation: 'With only 26 letters in the alphabet (and only 25 non-zero shifts), an interceptor can test all possible keys in a fraction of a second using a brute-force search.'
  }
];
