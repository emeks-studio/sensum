# sensum-mobile

[React Native](https://reactnative.dev/) mobile app that serve as the UI for the sensum project.

What is sensum? 

[sensum](https://emeks.gitlab.io/sensum/) is an a open and anonymous pool of electrons (people), that broadcast their "sensations" upon the network (plain texts messages received as push notifications) when the Oracle randomly choose a choseone.

## Download

- For Android: https://play.google.com/store/apps/details?id=com.sensumapp

## Related repositories

- sensum-backend; Temporally private (for technical reasons), full of randomness and mystery, contains in a safe environment the Oracle's heart. This backend is hosted by a bunch of "granujas".

- [sensum-landing](https://gitlab.com/emeks/sensum); The sensum landing page, considered the mainly entry point to sensum universe, contains a developers logbook plenty of poetry, and philosophical reviews.

- [sensumbot](https://github.com/ariedro/sensumbot); Telegram Bot for fetching the last messages from sensum to a chat or a group.

## Development

### Prerequisites

- Install Android SDK 
  - Via the offical IDE: [Android Studio](https://developer.android.com/studio)
  - Using the command line: [sdkmanager](https://developer.android.com/studio/command-line/sdkmanager)
- Install NodeJs
  - Via [Node Version Manager](https://github.com/nvm-sh/nvm#node-version-manager---)
  - An Android device or emulator

### Setup

```bash
# Setup NodeJS supported version
nvm use 
# Install project dependencies
npm install
```

### Run

#### Android

Follow the official guide: [Running On Device](https://reactnative.dev/docs/running-on-device). Tl;dr

```bash (console 1)
# Bundle the application
npx react-native start
```

Then, having your phone connected to the PC via USB:

```bash (console 2)
# Installation on your device
npx react-native run-android
```

### Deploy

#### Android

1- Generate .apk

1.1- Before generating the APK, first download the `my-release-key.keystore` from the emacs drive, and leave it `./android/app/`
	
1.2- Execute command
	
```bash
cd android && ./gradlew bundleRelease && cd ..
# generated output (APK file): `.android/app/build/outputs/bundle/release/app.aab`
``` 

2- Optional, gets apk signature (Credentials are in `./android/keystores/release.keystore.properties`)

```bash
keytool -exportcert -alias sensum -keystore ./android/app/my-release-key.keystore | openssl sha1 -binary | openssl base64
```

### Troubleshooting

1. In case of an Android update is needed, always check https://developer.android.com/studio/releases/gradle-plugin


2. Info about android build tools issues:
```
android $ gradle -q dependencies your-app-project:dependencies
```

3. Clean up the developer's bundle:
```
$ npx react-native start --reset-cache
```