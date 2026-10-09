# Decision Maker App

A mobile app that helps people make decisions by presenting two options at a time and refining the choices based on preferences until the user commits to a final selection.

## Features

- Prompt-driven decision categories
- Two-option comparison flow
- Text and image-based choices
- Preference-aware iteration using a similarity model
- Final selection confirmation
- Seed data for recipes, travel ideas, and other categories

## Tech stack

- React Native + Expo
- TypeScript
- Seed dataset and local decision engine (ready for future AI integration)

## Getting started

1. Install dependencies:
   npm install
2. Start the app:
   npm start
3. Run on a simulator or device:
   - iOS: npm run ios
   - Android: npm run android

## How it works

1. The user enters a category prompt such as `recipe ideas using chicken`.
2. The app detects the category and shows two matching options.
3. The user chooses the option they prefer, or chooses it as final.
4. If not final, the app picks a new pair of options that are more similar to the preferred option.
5. This repeats until the user confirms a final decision.

## Future enhancement

This app currently includes a local decision engine and mock data. You can connect it to an LLM or recommendation API to generate richer options dynamically from the user input.
