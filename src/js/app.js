/**
 * CIPHER QUEST - Interactive Application Logic
 * Student: Chris Juan | Class 7 | Computer Science
 */

import {
  caesarEncrypt,
  caesarDecrypt,
  getLetterShiftPath,
  bruteForceCaesar,
  generateChallenge,
  ALPHABET_UPPER,
} from './cipher.js';
import { QUIZ_QUESTIONS } from './quizData.js';
import { PRESENTATION_STEPS } from './presentationSteps.js';

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  initUnderstandingPipeline();
  initLiveEncryptionLab();
  initDecryptionChamber();
  initCrackTheCode();
  initSymmetricAsymmetric();
  initPresentationMode();
  initQuiz();
  initGuideAccordions();
});

/* =========================================================================
 * 1. SECTION ONE: UNDERSTANDING ENCRYPTION PIPELINE
 * ========================================================================= */
const PIPELINE_DATA = {
  sender: {
    title: 'Sender',
    body: 'The person or computer that wants to transmit a private message across a communication channel.',
    example: 'Alice wants to send a secret meeting note to Bob.',
  },
  plaintext: {
    title: 'Plaintext',
    body: 'The original, readable message before any encryption has been applied. Anyone can understand it if it is left unprotected.',
    example: 'Original message: "MEET ME AT THE LIBRARY"',
  },
  encryption: {
    title: 'Encryption + Key',
    body: 'The process of transforming readable information into an unreadable form using an encryption method (cipher) and a secret key.',
    example: 'Method: Caesar Cipher | Key: 3 (shift every letter by 3 positions).',
  },
  ciphertext: {
    title: 'Ciphertext',
    body: 'The disguised, unreadable result produced by the cipher. If an eavesdropper intercepts this, they cannot easily read it.',
    example: 'Disguised output: "PHHW PH DW WKH OLEUDUB"',
  },
  decryption: {
    title: 'Decryption + Key',
    body: 'The reverse transformation that recovers the original message from ciphertext using the appropriate key.',
    example: 'Reverse shift of 3 moves each letter back by 3 positions.',
  },
  original: {
    title: 'Original Message',
    body: 'The recovered readable plaintext safely received and understood by the recipient.',
    example: 'Recovered text: "MEET ME AT THE LIBRARY"',
  },
};

function initUnderstandingPipeline() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const titleEl = document.getElementById('pipeline-detail-title');
  const bodyEl = document.getElementById('pipeline-detail-body');
  const exampleEl = document.getElementById('pipeline-detail-example');

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const stepKey = node.getAttribute('data-step');
      const data = PIPELINE_DATA[stepKey];
      if (!data) return;

      nodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      if (titleEl) titleEl.textContent = data.title;
      if (bodyEl) bodyEl.textContent = data.body;
      if (exampleEl) exampleEl.textContent = data.example;
    });
  });
}

/* =========================================================================
 * 2. SECTION TWO: LIVE ENCRYPTION LAB
 * ========================================================================= */
function initLiveEncryptionLab() {
  const messageInput = document.getElementById('lab-message-input');
  const shiftSlider = document.getElementById('lab-shift-slider');
  const shiftValueBadge = document.getElementById('lab-shift-value');
  const keyExplanation = document.getElementById('lab-key-explanation');
  const outputText = document.getElementById('lab-output-text');
  const outputLabel = document.getElementById('lab-output-label');
  const btnEncrypt = document.getElementById('btn-lab-encrypt');
  const btnDecrypt = document.getElementById('btn-lab-decrypt');
  const btnClear = document.getElementById('btn-lab-clear');
  const btnCopy = document.getElementById('btn-lab-copy');
  const btnSwap = document.getElementById('btn-lab-swap');
  const btnReset = document.getElementById('btn-lab-reset');
  const alphabetTrackShifted = document.getElementById('alphabet-track-shifted');
  const letterWalkthroughContainer = document.getElementById('letter-walkthrough-preview');

  let currentMode = 'encrypt'; // 'encrypt' or 'decrypt'

  function updateVisualShiftTrack(shift) {
    if (!alphabetTrackShifted) return;
    alphabetTrackShifted.innerHTML = '';
    for (let i = 0; i < 26; i++) {
      const origChar = ALPHABET_UPPER[i];
      const shiftedChar = ALPHABET_UPPER[(i + shift) % 26];
      const cell = document.createElement('div');
      cell.className = 'alphabet-cell shifted';
      cell.textContent = shiftedChar;
      cell.title = `${origChar} -> ${shiftedChar} (shift +${shift})`;
      alphabetTrackShifted.appendChild(cell);
    }
  }

  function updateLetterWalkthrough(text, shift) {
    if (!letterWalkthroughContainer) return;
    letterWalkthroughContainer.innerHTML = '';

    // Find the first alphabetical character to demonstrate
    const match = text.match(/[a-zA-Z]/);
    if (!match) {
      letterWalkthroughContainer.innerHTML = `<span class="letter-walkthrough-title">Type a letter above to see the step-by-step shift.</span>`;
      return;
    }

    const firstChar = match[0];
    const path = getLetterShiftPath(firstChar, shift);
    const targetChar = path[path.length - 1];

    let html = `<span class="letter-walkthrough-title">Letter shift example for <strong>'${firstChar}'</strong> (+${shift}):</span><div class="step-chain">`;
    path.forEach((step, idx) => {
      const isLast = idx === path.length - 1;
      html += `<span class="step-node ${isLast ? 'target' : ''}">${step}</span>`;
      if (!isLast) {
        html += `<span style="color:var(--text-muted);">&rarr;</span>`;
      }
    });
    html += `</div>`;
    letterWalkthroughContainer.innerHTML = html;
  }

  function runCipherAction() {
    const text = messageInput ? messageInput.value : '';
    const shift = parseInt(shiftSlider ? shiftSlider.value : '3', 10) || 0;

    let result = '';
    if (currentMode === 'encrypt') {
      result = caesarEncrypt(text, shift);
      if (outputLabel) outputLabel.textContent = 'Encrypted Ciphertext:';
    } else {
      result = caesarDecrypt(text, shift);
      if (outputLabel) outputLabel.textContent = 'Decrypted Plaintext:';
    }

    if (outputText) {
      outputText.textContent = result || '(No text entered)';
    }

    if (shiftValueBadge) {
      shiftValueBadge.textContent = shift;
    }

    if (keyExplanation) {
      const sampleFrom = 'A';
      const sampleTo = String.fromCharCode(((0 + shift) % 26) + 65);
      keyExplanation.textContent = `Shift of +${shift}: Every letter shifts forward by ${shift} position${shift === 1 ? '' : 's'} (e.g. ${sampleFrom} becomes ${sampleTo}).`;
    }

    updateVisualShiftTrack(shift);
    updateLetterWalkthrough(text, shift);
  }

  if (messageInput) {
    messageInput.addEventListener('input', runCipherAction);
  }

  if (shiftSlider) {
    shiftSlider.addEventListener('input', runCipherAction);
  }

  if (btnEncrypt) {
    btnEncrypt.addEventListener('click', () => {
      currentMode = 'encrypt';
      runCipherAction();
    });
  }

  if (btnDecrypt) {
    btnDecrypt.addEventListener('click', () => {
      currentMode = 'decrypt';
      runCipherAction();
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (messageInput) messageInput.value = '';
      runCipherAction();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const textToCopy = outputText ? outputText.textContent : '';
      if (!textToCopy || textToCopy === '(No text entered)') return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<span style="color:var(--success-color);">Copied!</span>`;
        setTimeout(() => {
          btnCopy.innerHTML = originalText;
        }, 1800);
      }).catch(() => {
        // Fallback
        alert('Copied result: ' + textToCopy);
      });
    });
  }

  if (btnSwap) {
    btnSwap.addEventListener('click', () => {
      const currentOutput = outputText ? outputText.textContent : '';
      if (!currentOutput || currentOutput === '(No text entered)') return;

      if (messageInput) {
        messageInput.value = currentOutput;
      }
      currentMode = currentMode === 'encrypt' ? 'decrypt' : 'encrypt';
      runCipherAction();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (messageInput) messageInput.value = 'MEET ME AT THE LIBRARY';
      if (shiftSlider) shiftSlider.value = '3';
      currentMode = 'encrypt';
      runCipherAction();
    });
  }

  // Initial Run
  runCipherAction();
}

/* =========================================================================
 * 3. SECTION THREE: DECRYPTION CHAMBER & KEY MISMATCH EXPERIMENT
 * ========================================================================= */
function initDecryptionChamber() {
  const cipherInput = document.getElementById('chamber-cipher-input');
  const shiftSelect = document.getElementById('chamber-shift-select');
  const btnDecrypt = document.getElementById('btn-chamber-decrypt');
  const recoveredOutput = document.getElementById('chamber-recovered-output');
  const sideCipherDisplay = document.getElementById('chamber-side-cipher');

  function runChamberDecryption() {
    const ciphertext = cipherInput ? cipherInput.value : '';
    const shift = parseInt(shiftSelect ? shiftSelect.value : '3', 10) || 0;
    const decrypted = caesarDecrypt(ciphertext, shift);

    if (sideCipherDisplay) sideCipherDisplay.textContent = ciphertext || '(None)';
    if (recoveredOutput) recoveredOutput.textContent = decrypted || '(Empty)';
  }

  if (cipherInput) cipherInput.addEventListener('input', runChamberDecryption);
  if (shiftSelect) shiftSelect.addEventListener('change', runChamberDecryption);
  if (btnDecrypt) btnDecrypt.addEventListener('click', runChamberDecryption);

  // Key Mismatch Experiment Buttons
  const btnMismatch1 = document.getElementById('btn-mismatch-setup');
  const btnMismatch2 = document.getElementById('btn-mismatch-wrong');
  const btnMismatch3 = document.getElementById('btn-mismatch-correct');
  const mismatchExplain = document.getElementById('mismatch-explanation-text');

  if (btnMismatch1) {
    btnMismatch1.addEventListener('click', () => {
      if (cipherInput) cipherInput.value = 'PHHW PH DW WKH OLEUDUB';
      if (shiftSelect) shiftSelect.value = '3';
      runChamberDecryption();
      if (mismatchExplain) {
        mismatchExplain.textContent = 'Step 1: Loaded ciphertext "PHHW PH DW WKH OLEUDUB" created with Key 3. Matching key 3 successfully recovers "MEET ME AT THE LIBRARY".';
      }
    });
  }

  if (btnMismatch2) {
    btnMismatch2.addEventListener('click', () => {
      if (cipherInput) cipherInput.value = 'PHHW PH DW WKH OLEUDUB';
      if (shiftSelect) shiftSelect.value = '5';
      runChamberDecryption();
      if (mismatchExplain) {
        mismatchExplain.textContent = 'Step 2: Key mismatch! When decrypted with Key 5 instead of Key 3, the output becomes "KEEQ KE YQ RFC JGYPYPW". An incorrect key produces scrambled text.';
      }
    });
  }

  if (btnMismatch3) {
    btnMismatch3.addEventListener('click', () => {
      if (cipherInput) cipherInput.value = 'PHHW PH DW WKH OLEUDUB';
      if (shiftSelect) shiftSelect.value = '3';
      runChamberDecryption();
      if (mismatchExplain) {
        mismatchExplain.textContent = 'Step 3: Restored Key 3! The correct mathematical offset aligns the letters and the original message "MEET ME AT THE LIBRARY" returns.';
      }
    });
  }

  // Initial Run
  runChamberDecryption();
}

/* =========================================================================
 * 4. SECTION FOUR: CRACK THE CODE (BRUTE FORCE)
 * ========================================================================= */
function initCrackTheCode() {
  const interceptedTextEl = document.getElementById('crack-intercepted-text');
  const manualSlider = document.getElementById('crack-manual-slider');
  const manualShiftVal = document.getElementById('crack-manual-shift-val');
  const manualPreview = document.getElementById('crack-manual-preview');
  const btnTryAll = document.getElementById('btn-crack-try-all');
  const btnNewChallenge = document.getElementById('btn-crack-new-challenge');
  const tableContainer = document.getElementById('crack-table-container');
  const tableBody = document.getElementById('crack-table-body');
  const challengeTargetKey = document.getElementById('crack-known-key');

  let currentIntercepted = 'PHHW PH DW WKH OLEUDUB';
  let expectedKey = 3;

  function updateManualPreview() {
    const shift = parseInt(manualSlider ? manualSlider.value : '0', 10);
    if (manualShiftVal) manualShiftVal.textContent = shift;
    const decrypted = caesarDecrypt(currentIntercepted, shift);
    if (manualPreview) {
      manualPreview.textContent = decrypted;
      if (shift === expectedKey) {
        manualPreview.style.color = 'var(--teal-hover)';
      } else {
        manualPreview.style.color = 'var(--text-main)';
      }
    }
  }

  function renderBruteForceTable() {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const allShifts = bruteForceCaesar(currentIntercepted);

    allShifts.forEach((item) => {
      const tr = document.createElement('tr');
      const isMatch = item.shift === expectedKey;
      if (isMatch) tr.className = 'highlight-match';

      tr.innerHTML = `
        <td style="font-weight:700;">Shift ${item.shift}</td>
        <td>${item.decrypted} ${isMatch ? '<span class="badge-match">READABLE MATCH</span>' : ''}</td>
      `;
      tableBody.appendChild(tr);
    });

    if (tableContainer) {
      tableContainer.style.display = 'block';
    }
  }

  if (manualSlider) {
    manualSlider.addEventListener('input', updateManualPreview);
  }

  if (btnTryAll) {
    btnTryAll.addEventListener('click', () => {
      renderBruteForceTable();
    });
  }

  if (btnNewChallenge) {
    btnNewChallenge.addEventListener('click', () => {
      const challenge = generateChallenge();
      currentIntercepted = challenge.ciphertext;
      expectedKey = challenge.shift;

      if (interceptedTextEl) interceptedTextEl.textContent = currentIntercepted;
      if (manualSlider) manualSlider.value = '0';
      if (challengeTargetKey) challengeTargetKey.textContent = `Hidden key: Shift ${expectedKey}`;

      updateManualPreview();
      if (tableContainer && tableContainer.style.display !== 'none') {
        renderBruteForceTable();
      }
    });
  }

  // Initial state
  updateManualPreview();
}

/* =========================================================================
 * 5. SECTION FIVE: SYMMETRIC VS ASYMMETRIC
 * ========================================================================= */
function initSymmetricAsymmetric() {
  const tabs = document.querySelectorAll('.crypto-tab-btn');
  const panels = document.querySelectorAll('.crypto-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add('active');
    });
  });
}

/* =========================================================================
 * 6. SECTION SEVEN: JUDGE PRESENTATION MODE
 * ========================================================================= */
function initPresentationMode() {
  const overlay = document.getElementById('presentation-overlay');
  const btnLaunch = document.getElementById('btn-launch-presentation');
  const btnClose = document.getElementById('btn-close-presentation');
  const btnPrev = document.getElementById('btn-pres-prev');
  const btnNext = document.getElementById('btn-pres-next');
  const btnReset = document.getElementById('btn-pres-reset');

  const stepNumberBadge = document.getElementById('pres-step-number');
  const stepTitle = document.getElementById('pres-step-title');
  const stepHeadline = document.getElementById('pres-step-headline');
  const interactiveContent = document.getElementById('pres-interactive-box');
  const noteText = document.getElementById('pres-note-text');

  let currentStepIndex = 0;

  function renderStep(index) {
    if (index < 0) index = 0;
    if (index >= PRESENTATION_STEPS.length) index = PRESENTATION_STEPS.length - 1;
    currentStepIndex = index;

    const step = PRESENTATION_STEPS[currentStepIndex];
    if (!step) return;

    if (stepNumberBadge) {
      stepNumberBadge.textContent = `STEP ${step.stepNumber} OF ${PRESENTATION_STEPS.length}`;
    }
    if (stepTitle) stepTitle.textContent = step.title;
    if (stepHeadline) stepHeadline.textContent = step.headline;
    if (noteText) noteText.textContent = step.note;

    // Render interactive simulation according to the step
    if (interactiveContent) {
      renderPresentationStepInteractive(step, interactiveContent);
    }

    if (btnPrev) btnPrev.disabled = currentStepIndex === 0;
    if (btnNext) {
      if (currentStepIndex === PRESENTATION_STEPS.length - 1) {
        btnNext.textContent = 'Finish Demo';
      } else {
        btnNext.textContent = 'Next Step &rarr;';
      }
    }
  }

  function renderPresentationStepInteractive(step, container) {
    switch (step.stepNumber) {
      case 1:
        container.innerHTML = `
          <div style="font-size:1.1rem; line-height:1.6; color:var(--text-main);">
            <p style="margin-bottom:0.75rem;"><strong>The Question:</strong> How can we send a message without making it easy for everyone to understand?</p>
            <p style="color:var(--text-secondary);">When we send messages online, the data travels across many computers and routers. If left as plain text, anyone who intercepts it can read it immediately.</p>
          </div>
        `;
        break;
      case 2:
        container.innerHTML = `
          <div style="font-family:var(--font-mono); font-size:1.1rem;">
            <div style="color:var(--text-muted); font-size:0.8rem; margin-bottom:0.3rem;">PLAINTEXT MESSAGE:</div>
            <div style="padding:0.75rem 1rem; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:4px; color:var(--text-main);">MEET ME AT THE LIBRARY</div>
            <div style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.75rem;">This readable text has not yet been processed by an encryption algorithm.</div>
          </div>
        `;
        break;
      case 3:
        container.innerHTML = `
          <div style="font-family:var(--font-mono);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span>Shift Key: <strong>+3</strong></span>
              <span style="color:var(--primary-teal);">M &rarr; P (M + 3 = P)</span>
            </div>
            <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:0.75rem; align-items:center;">
              <div style="padding:0.6rem; background:var(--bg-surface); border:1px solid var(--border-color); text-align:center;">MEET ME AT THE LIBRARY</div>
              <div style="color:var(--primary-teal); font-weight:bold;">&rarr; ENCRYPT &rarr;</div>
              <div style="padding:0.6rem; background:var(--teal-subtle); border:1px solid var(--primary-teal); color:#FFF; font-weight:bold; text-align:center;">PHHW PH DW WKH OLEUDUB</div>
            </div>
          </div>
        `;
        break;
      case 4:
        container.innerHTML = `
          <div style="font-family:var(--font-mono);">
            <div style="color:var(--primary-teal); font-size:0.8rem; margin-bottom:0.3rem; font-weight:bold;">INTERCEPTED CIPHERTEXT:</div>
            <div style="padding:1rem; background:var(--bg-surface); border:1px dashed var(--primary-teal); font-size:1.25rem; color:#FFF; letter-spacing:0.05em;">PHHW PH DW WKH OLEUDUB</div>
            <div style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.75rem;">Without knowing the secret shift key, an observer sees only scrambled letters.</div>
          </div>
        `;
        break;
      case 5:
        container.innerHTML = `
          <div style="font-family:var(--font-mono);">
            <div style="margin-bottom:0.5rem; color:var(--danger-color); font-weight:bold;">Attempting Decryption with Incorrect Key: 5</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div style="padding:0.75rem; background:var(--bg-surface); border:1px solid var(--border-color);">
                <div style="font-size:0.75rem; color:var(--text-muted);">CIPHERTEXT (Key 3):</div>
                <div style="color:#FFF;">PHHW PH DW WKH OLEUDUB</div>
              </div>
              <div style="padding:0.75rem; background:rgba(217,83,79,0.15); border:1px solid var(--danger-color);">
                <div style="font-size:0.75rem; color:var(--danger-color);">DECRYPTED WITH KEY 5:</div>
                <div style="color:#FFF; font-weight:bold;">KEEQ KE YQ RFC JGYPYPW</div>
              </div>
            </div>
            <div style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.75rem;">With an incorrect key, the letters do not realign into sensible words.</div>
          </div>
        `;
        break;
      case 6:
        container.innerHTML = `
          <div>
            <div style="font-size:0.9rem; margin-bottom:0.75rem; color:var(--text-main);">
              Caesar cipher has only <strong>25 possible non-zero shifts</strong>. A computer checks all 25 shifts instantaneously:
            </div>
            <div style="font-family:var(--font-mono); font-size:0.85rem; background:var(--bg-surface); padding:0.75rem; border-radius:4px; max-height:140px; overflow-y:auto; border:1px solid var(--border-color);">
              <div>Shift 0: PHHW PH DW WKH OLEUDUB</div>
              <div>Shift 1: OGGV OG CV VJG NKDTCTA</div>
              <div>Shift 2: NFFU NF BU UIF MJCSBSZ</div>
              <div style="color:var(--primary-teal); font-weight:bold; background:var(--teal-subtle); padding:2px 4px; border-radius:2px;">Shift 3: MEET ME AT THE LIBRARY &larr; (Readable!)</div>
              <div>Shift 4: LDDS LD ZS SGD KHBQZQY</div>
              <div>Shift 5: KEEQ KE YQ RFC JGYPYPW</div>
            </div>
          </div>
        `;
        break;
      case 7:
        container.innerHTML = `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-size:0.875rem;">
            <div style="padding:1rem; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:4px;">
              <div style="color:var(--primary-teal); font-weight:bold; margin-bottom:0.3rem;">SYMMETRIC</div>
              <p>Alice and Bob share one secret key. Fast, but they must securely exchange the key beforehand.</p>
            </div>
            <div style="padding:1rem; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:4px;">
              <div style="color:var(--primary-teal); font-weight:bold; margin-bottom:0.3rem;">ASYMMETRIC</div>
              <p>Bob shares a Public Key to lock data. Only Bob's Private Key can unlock it. Solves the key sharing problem.</p>
            </div>
          </div>
        `;
        break;
      case 8:
        container.innerHTML = `
          <div style="font-size:0.95rem; line-height:1.6; color:var(--text-main);">
            <p style="margin-bottom:0.5rem;"><strong>Conclusion:</strong></p>
            <p style="color:var(--text-secondary); margin-bottom:0.75rem;">
              "This experiment helped me understand how encryption changes readable information and why keys matter. The Caesar cipher is easy to demonstrate but not secure enough for real use. Modern encryption helps protect our messages, payments, and personal information."
            </p>
            <p style="color:var(--primary-teal); font-weight:600;">Thank you, respected judges! I am ready for any questions.</p>
          </div>
        `;
        break;
    }
  }

  if (btnLaunch) {
    btnLaunch.addEventListener('click', () => {
      if (overlay) overlay.classList.add('active');
      renderStep(0);
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (overlay) overlay.classList.remove('active');
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      renderStep(currentStepIndex - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStepIndex === PRESENTATION_STEPS.length - 1) {
        if (overlay) overlay.classList.remove('active');
      } else {
        renderStep(currentStepIndex + 1);
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      renderStep(0);
    });
  }
}

/* =========================================================================
 * 7. SECTION EIGHT: QUIZ
 * ========================================================================= */
function initQuiz() {
  const container = document.getElementById('quiz-box');
  if (!container) return;

  let currentQuestionIndex = 0;
  let userScore = 0;
  let hasSubmitted = false;

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    if (!q) {
      renderQuizResults();
      return;
    }

    hasSubmitted = false;
    const progressPercent = ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;

    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
      optionsHtml += `
        <button class="quiz-option-btn" data-index="${idx}">
          <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt.text}
        </button>
      `;
    });

    container.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--primary-teal); font-weight:700;">Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length} &middot; Topic: ${q.topic}</span>
        <span style="font-size:0.875rem; color:var(--text-muted);">Score: ${userScore}/${currentQuestionIndex}</span>
      </div>
      <div class="quiz-question-text">${q.question}</div>
      <div class="quiz-options-list">${optionsHtml}</div>
      <div id="quiz-feedback-area" style="display:none;"></div>
      <div style="display:flex; justify-content:flex-end; margin-top:1.5rem;">
        <button id="btn-quiz-next" class="btn btn-primary" style="display:none;">Next Question &rarr;</button>
      </div>
    `;

    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    const feedbackArea = container.getElementById ? container.getElementById('quiz-feedback-area') : container.querySelector('#quiz-feedback-area');
    const btnNext = container.getElementById ? container.getElementById('btn-quiz-next') : container.querySelector('#btn-quiz-next');

    optionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (hasSubmitted) return;
        hasSubmitted = true;

        const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
        const selectedOption = q.options[selectedIndex];

        optionBtns.forEach((b) => (b.disabled = true));

        if (selectedOption.isCorrect) {
          btn.classList.add('selected-correct');
          userScore++;
        } else {
          btn.classList.add('selected-wrong');
          // Highlight correct one
          q.options.forEach((opt, idx) => {
            if (opt.isCorrect) {
              optionBtns[idx].classList.add('selected-correct');
            }
          });
        }

        if (feedbackArea) {
          feedbackArea.style.display = 'block';
          feedbackArea.innerHTML = `
            <div class="quiz-feedback-box" style="border-left: 3px solid ${selectedOption.isCorrect ? 'var(--success-color)' : 'var(--danger-color)'};">
              <div class="quiz-feedback-title" style="color:${selectedOption.isCorrect ? 'var(--success-color)' : 'var(--danger-color)'};">
                ${selectedOption.isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div class="quiz-feedback-text">${q.explanation}</div>
            </div>
          `;
        }

        if (btnNext) {
          btnNext.style.display = 'inline-flex';
        }
      });
    });

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuizQuestion();
      });
    }
  }

  function renderQuizResults() {
    container.innerHTML = `
      <div class="quiz-results-card">
        <div style="font-size:0.875rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:0.5rem;">Quiz Complete</div>
        <div class="quiz-score-number">${userScore} / ${QUIZ_QUESTIONS.length}</div>
        <div style="font-size:1.125rem; font-weight:600; color:var(--text-main); margin-bottom:1rem;">
          ${userScore === 5 ? 'Outstanding! Perfect score on Cryptography basics.' : userScore >= 3 ? 'Well done! Solid understanding of encryption principles.' : 'Good effort! Review the sections above to master each concept.'}
        </div>
        <p style="color:var(--text-secondary); max-width:500px; margin:0 auto 2rem; font-size:0.9rem;">
          You have reviewed plaintext, encryption keys, ciphertext, symmetric vs. asymmetric systems, and the weaknesses of the Caesar cipher.
        </p>
        <button id="btn-quiz-restart" class="btn btn-primary">Restart Quiz</button>
      </div>
    `;

    const btnRestart = container.querySelector('#btn-quiz-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userScore = 0;
        renderQuizQuestion();
      });
    }
  }

  // Initial Run
  renderQuizQuestion();
}

/* =========================================================================
 * 8. SECTION NINE: PRESENTATION GUIDE ACCORDIONS
 * ========================================================================= */
function initGuideAccordions() {
  const headers = document.querySelectorAll('.guide-item-header');
  headers.forEach((h) => {
    h.addEventListener('click', () => {
      const parent = h.parentElement;
      const content = parent.querySelector('.guide-item-content');
      const arrow = h.querySelector('.guide-arrow');
      if (!content) return;

      const isClosed = content.style.display === 'none' || !content.style.display;
      content.style.display = isClosed ? 'block' : 'none';
      if (arrow) arrow.textContent = isClosed ? '▲' : '▼';
    });
  });
}
