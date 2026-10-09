# CIPHER QUEST: The Science of Secret Messages

> **Class 7 · Computer Science Project**  
> **Student:** Chris Juan  
> **Class:** 7  
> **Subject:** Computer Science  
> **Topic:** Encryption and Decryption  
> **Project Type:** Interactive Computer Science Project  
> **Intended Public Website:** [https://shaun6jrome.github.io/chris-juan-project/](https://shaun6jrome.github.io/chris-juan-project/)

---

## Project Overview

**Cipher Quest** is an educational web application designed for a Class 7 Computer Science demonstration. It investigates what happens when information is transmitted over the internet, demonstrating how encryption transforms readable text into secret codes, how keys help recover the original message, and how simple codes can be broken.

The project emphasizes computer science principles—algorithms, keys, modular arithmetic, and system boundaries—while introducing cybersecurity as a real-world application of encryption.

---

## Key Features

1. **Understanding Encryption Pipeline:**  
   An interactive 6-stage transmission diagram (`SENDER → PLAINTEXT → ENCRYPTION + KEY → CIPHERTEXT → DECRYPTION + KEY → ORIGINAL MESSAGE`) with clickable stages explaining the role of each component.

2. **Live Caesar Cipher Lab:**  
   - Interactive message input with real-time recalculation.
   - Dynamic key slider (shifts 1 to 25).
   - Case preservation (uppercase and lowercase).
   - Preserves spaces, punctuation, symbols, and numbers.
   - Alphabet wraparound from Z to A using modular arithmetic (`(offset + shift) % 26`).
   - Alphabet shift dual-track visualizer (A–Z aligned with shifted alphabet).
   - Step-by-step letter progression preview (e.g., $M \rightarrow N \rightarrow O \rightarrow P$).
   - One-click copy, swap input/output, clear, and reset to standard example (`MEET ME AT THE LIBRARY` with Shift 3).

3. **Decryption Chamber & Key-Mismatch Experiment:**  
   - Dedicated message recovery interface with side-by-side comparison of ciphertext and decrypted output.
   - Interactive 3-step experiment illustrating how decrypting with the wrong key (e.g., Shift 5 instead of Shift 3) produces scrambled gibberish, and how restoring the matching key recovers the original message.

4. **Crack the Code (Brute-Force Cryptanalysis):**  
   - Challenge intercepting `PHHW PH DW WKH OLEUDUB`.
   - Manual key scrubber with live preview.
   - **TRY ALL SHIFTS** feature computing all 26 possible shifts (0 through 25) with automatic highlighting of the readable match.
   - **New Challenge** generator producing random phrases with non-zero shifts.
   - Educational breakdown explaining why having only 26 possible shifts makes the Caesar cipher weak against computers.

5. **One Key or Two? (Symmetric vs. Asymmetric):**  
   - Clear visual comparison of Single-Key (shared secret) vs. Two-Key (public/private keypair) cryptography.
   - Highlights the key distribution problem in symmetric systems and how public-key systems solve it.

6. **Real-World Uses & Limits:**  
   - Five familiar applications: HTTPS website padlocks, online banking & digital payments, private messaging, personal files/backups, and online shopping.
   - Realistic boundaries of encryption: phishing, compromised devices, weak passwords, and recipient disclosures.

7. **Judge Presentation Mode:**  
   - Distraction-free live demonstration console with 8 sequential steps.
   - Directly controls live cipher tools and provides concise cue cards for Chris Juan to glance at while speaking to judges.

8. **Interactive 5-Question Quiz:**  
   - Tests core curriculum concepts with immediate feedback, detailed explanations, and scoring summary.

9. **Presentation Guide:**  
   - Complete 3–5 minute speaking script for Chris Juan.
   - Five likely judge questions and age-appropriate model answers.
   - Cryptography glossary and suggested demonstration sequence.

---

## Educational Disclaimer

> **Important:** The Caesar cipher used in this experiment is an ancient substitution cipher useful for learning how keys and offsets work. It has a key space of only 25 non-zero shifts and is trivially broken by brute force. It must **never** be used to protect real passwords, confidential files, or sensitive information. Modern systems use advanced algorithms such as AES-256 and RSA/ECC.

---

## Technologies Used

- **HTML5:** Semantic, accessible layout and custom vector SVG diagrams.
- **CSS3:** Clean laboratory-inspired design matching the required palette (`#15191E`, `#252B33`, `#0F8B8D`, `#F5F7F8`, `#AAB3BD`, `#3B444F`).
- **JavaScript (ES Modules):** Modular cryptography engine (`src/js/cipher.js`) separated from presentation components.
- **Node.js Native Test Runner (`node:test`):** Automated unit tests validating encryption, decryption, wraparound, case preservation, edge shifts, and brute-force cracking.
- **GitHub Actions:** Automated CI/CD pipeline deploying static files to GitHub Pages.

---

## Local Installation & Testing

No external dependencies or build tools are required to run or test the project:

### 1. Run Automated Unit Tests
```bash
npm test
```
Or directly using Node:
```bash
node --test tests/cipher.test.js
```

### 2. Run the Application Locally
You can simply open `index.html` in any modern web browser, or serve it using Python or Node:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node / npx
npx serve .
```
Then navigate to `http://localhost:8000` (or the port displayed in your terminal).

---

## GitHub Pages Deployment

The project is preconfigured for deployment to GitHub Pages under the repository:
`https://github.com/shaun6jrome/chris-juan-project`

### GitHub Actions Workflow
The repository includes `.github/workflows/deploy.yml` which automatically:
1. Runs the automated test suite (`npm test`).
2. Packages the static application.
3. Deploys to GitHub Pages at `https://shaun6jrome.github.io/chris-juan-project/`.

### Setting up GitHub Pages in Repository Settings:
1. Go to the repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push changes to the `main` branch to trigger automatic deployment.
