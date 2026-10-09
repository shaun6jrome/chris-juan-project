/**
 * Presentation Mode Data & Step Configurations
 * 8 sequential steps for live school judge demonstration.
 * Controls actual application state and provides concise presenter cue cards for Chris Juan.
 */
export const PRESENTATION_STEPS = [
  {
    stepNumber: 1,
    title: 'Introduce the Problem',
    headline: 'How can we send a message without making it easy for everyone to understand?',
    actionLabel: 'Explore the Challenge',
    targetSection: 'hero',
    message: 'MEET ME AT THE LIBRARY',
    shift: 3,
    note: 'Welcome the judges and introduce the core challenge: when information travels across a public network or messenger, anyone can intercept it unless we disguise it with a secret rule.'
  },
  {
    stepNumber: 2,
    title: 'Enter a Message (Plaintext)',
    headline: 'Starting with readable information: "MEET ME AT THE LIBRARY"',
    actionLabel: 'Load Sample Plaintext',
    targetSection: 'lab',
    message: 'MEET ME AT THE LIBRARY',
    shift: 3,
    note: 'Explain that the unencrypted, human-readable text is called "Plaintext". This is what the sender writes before applying any cipher.'
  },
  {
    stepNumber: 3,
    title: 'Encrypt the Message',
    headline: 'Applying Caesar Shift Key: 3',
    actionLabel: 'Perform Encryption',
    targetSection: 'lab',
    message: 'MEET ME AT THE LIBRARY',
    shift: 3,
    note: 'Demonstrate the shift key set to 3. Show how each letter moves forward 3 positions: M becomes P (M -> N -> O -> P), E becomes H, and spaces remain unchanged.'
  },
  {
    stepNumber: 4,
    title: 'Show the Intercepted Message (Ciphertext)',
    headline: 'The result: "PHHW PH DW WKH OLEUDUB"',
    actionLabel: 'Inspect Ciphertext',
    targetSection: 'chamber',
    message: 'PHHW PH DW WKH OLEUDUB',
    shift: 3,
    note: 'Point out the scrambled output, called "Ciphertext". If an interceptor glances at this, it looks like meaningless gibberish.'
  },
  {
    stepNumber: 5,
    title: 'Change the Key (Key Mismatch)',
    headline: 'What happens when someone guesses the wrong key (e.g., Key 5)?',
    actionLabel: 'Test Incorrect Key',
    targetSection: 'chamber',
    message: 'PHHW PH DW WKH OLEUDUB',
    shift: 5,
    note: 'Change the decryption key to 5. Show that the output remains scrambled ("KEEQ KE YQ RFC JGYPYPW"). Explain that without the matching key, the original message cannot be restored.'
  },
  {
    stepNumber: 6,
    title: 'Crack the Code (Brute Force)',
    headline: 'Systematically testing all 26 possible shifts',
    actionLabel: 'Launch Brute Force',
    targetSection: 'crack',
    message: 'PHHW PH DW WKH OLEUDUB',
    shift: 3,
    note: 'Show "Try All Shifts". Because the alphabet has only 26 letters, trying every possible key takes less than a millisecond on a computer. This makes the Caesar cipher weak.'
  },
  {
    stepNumber: 7,
    title: 'Explain Modern Encryption',
    headline: 'Symmetric vs. Asymmetric Cryptography',
    actionLabel: 'View Key Architecture',
    targetSection: 'comparison',
    message: '',
    shift: 0,
    note: 'Contrast our classroom cipher with modern cryptography: Symmetric (one shared secret) vs Asymmetric (public key to lock, private key to unlock). Explain that modern algorithms use massive 256-bit keys that cannot be brute-forced.'
  },
  {
    stepNumber: 8,
    title: 'Everyday Applications & Conclusion',
    headline: 'Where encryption protects us daily',
    actionLabel: 'View Applications',
    targetSection: 'real-world',
    message: '',
    shift: 0,
    note: 'Conclude by pointing out real-world uses: HTTPS website padlocks, banking apps, and private chats. Thank the judges and invite questions.'
  }
];
