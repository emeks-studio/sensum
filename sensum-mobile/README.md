# sensum-mobile

[React Native](https://reactnative.dev/) mobile app that serve as the UI for the sensum project.

## Download

- For Android: https://play.google.com/store/apps/details?id=com.sensumapp

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

### Development

#### Run on Android

Follow the official guide: [Running On Device](https://reactnative.dev/docs/running-on-device). Tl;dr

```bash (console 1)
# Bundle the application
npx react-native start
# or
npm start
```

Then, having your phone connected to the PC via USB:

```bash (console 2)
# Installation on your device
npx react-native run-android
# or 
npm run android
```

#### Using Rescript

In case you want to code using Rescript, you should need an additional command:
```bash (console 3)
# Keep compiling and generating .js files from .res files
npm run re:watch
```

Learn about these stack used:

- [rescript](https://rescript-lang.org/)
  - [Introduction](https://rescript-lang.org/docs/manual/latest/introduction)
  - [VS reasonml syntax](https://rescript-lang.org/docs/manual/latest/migrate-from-bucklescript-reason)
- [reason-react-native](https://reason-react-native.github.io/en/docs/usage/)
  - [Styles](https://reason-react-native.github.io/en/docs/apis/Style/)
  
### Deploy

#### Android

1- Generate .apk

1.1- Before generating the APK, first download the `my-release-key.keystore` from the emacs drive, and leave it at `./android/app/`.

1.2- Once the release's .keystore is in place, create a `release.keystore.properties` file over `./android/keystores/` and add the corresponding signing information inside. You can use `release.keystore.properties.example` as a template.

1.3- Execute command
	
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

4. Packages `react-native` and `reason-react-native` MUST use same version number!
