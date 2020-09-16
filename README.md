# sensum-mobile

[React Native](https://reactnative.dev/) mobile app that serve as the UI for the sensum project.

What is sensum? 

[sensum](https://emeks.gitlab.io/sensum/) is an a open and anonymous pool of electrons (people), that broadcast their "sensations" upon the network (plain texts messages received as push notifications) when the Oracle randomly choose a choseone.

## Download

- For Android: https://play.google.com/store/apps/details?id=com.sensumapp

## Related repositories

- sensum-backend; Temporally private (for technical reasons), full of randomness and mystery, contains in a safe environment the Oracle's heart. This backend is hosted by a bunch of "granujas".

- [sensum-landing](https://gitlab.com/emeks/sensum); The sensum landing page, considered the mainly entry point to sensum universe, contains a developers logbook plenty of poetry, and philosophical reviews.

## Development

// TODO

### Deploy

#### Android

1- Generate .apk
	
	1.1- Before generating the APK, first download the my-release-key.keystore from the emacs drive, and leave it sensum-app/SensumApp/android/app
	
	1.2- Execute command: `$ cd android && ./gradlew bundleRelease && cd ..` (APK file: `.android/app/build/outputs/bundle/release/app.aab`)

2- Optional, gets apk signature (Credentials are in `./android/keystores/release.keystore.properties`)

Execute command: `$ keytool -exportcert -alias sensum -keystore ./android/app/my-release-key.keystore | openssl sha1 -binary | openssl base64`

### Troubleshooting

// TODO
