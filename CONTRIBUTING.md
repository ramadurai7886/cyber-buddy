# Contributing to Cyber Buddy

Thank you for your interest in contributing to **Cyber Buddy**! This project is dedicated to supporting women facing cybercrime in India by providing free technical first-aid, legal guidance, and compassionate mental health counseling.

## Code of Conduct

Please be respectful, empathetic, and constructive in all interactions. Cyber Buddy serves vulnerable users; empathy and accessibility are core principles.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramadurai7886/cyber-buddy.git
   cd cyber-buddy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify TypeScript & Production Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

## Adding / Improving Indian Languages

Cyber Buddy supports 11 Indian languages. To add a new dialect or improve existing translations:

1. Locate `src/translations/`.
2. Ensure any additions satisfy the `TranslationSchema` in `src/types/translations.ts`.
3. Register the language in `src/translations/index.ts`.
4. Run `npx tsc --noEmit` to verify type completeness.

## Submitting Pull Requests

1. Fork the repo and create a feature branch (`git checkout -b feature/amazing-feature`).
2. Commit your changes with clear messages (`git commit -m 'feat: add regional helpline support'`).
3. Push to your fork (`git push origin feature/amazing-feature`).
4. Open a Pull Request on GitHub against `main`.
