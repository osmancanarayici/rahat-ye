🇬🇧 English | [🇹🇷 Türkçe](README.tr.md)

# Rahat Ye 🍽️

A small React Native (Expo) app for logging what you eat and any stomach discomfort you feel afterwards. It works offline.

## Features

- Meal name, category (home-cooked / restaurant / packaged food) and triggers (spicy, dairy, gluten, fried, etc.)
- Discomfort severity from 1 to 5 and symptom type (bloating, cramps, reflux, etc.)
- If the meal name is empty, the "Submit" button is disabled and an error message is shown
- Data is stored in the phone's local storage, so it isn't lost when offline
- The history screen lists entries with their dates
- Fake server: 1.5 s delay, loading indicator, 10% failure rate, a "Retry" option and a success message

## Setup

Requirements: Node.js (LTS) and the Expo Go app on your phone.

```
git clone https://github.com/osmancanarayici/rahat-ye.git
cd rahat-ye
npm install
npx expo start
```

Scan the QR code in the terminal with Expo Go (your phone and computer must be on the same Wi-Fi).

## Folder structure

```
App.js                  Navigation (bottom tabs)
src/
  constants/options.js  Category, trigger and symptom lists
  services/storage.js   Local storage with AsyncStorage
  services/fakeApi.js   Fake server (1.5 s, 10% failure)
  screens/
    KayitEkrani.js      Meal entry form
    GecmisEkrani.js     History list
```

## Why these libraries?

- **Expo:** Fast development and instant testing on a phone, without installing Android Studio/Xcode.
- **AsyncStorage:** The data is a small, simple list. It's lightweight and enough. Something like SQLite would be unnecessary complexity at this scale.
- **React Navigation (bottom tabs):** Standard and easy switching between two screens (Entry, History).
- **useState:** The app is small, so a state library like Redux wasn't needed.

## Design decisions

- **Local save first, then server:** Entries are written to the phone first, then sent to the fake server. Even if sending fails, no data is lost and the user can tap "Retry".
- The meal name is checked with `trim()`, so an error is also shown if only spaces are entered.
- The history shows whether each entry has been sent to the server.

## Not implemented / ideas

TypeScript, dark mode and unit tests were not added. Automatically resending failed entries when the connection returns could be added.

## Development process

I used an AI assistant (Claude) while building this project. We wrote the code step by step together. I had it explain what each file does, how data flows between the screens and storage, and the reasoning behind each design decision, and I tried to add most of it myself. I can explain most of the codebase.
