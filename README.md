# sensum-mobile

Same us Potregol but updated beaches!
^ TODO: Improve description

## Deploy

### Android

1- Generate .apk
	
	1.1- Before generating the APK, first download the my-release-key.keystore from the emacs drive, and leave it sensum-app/SensumApp/android/app
	
	1.2- Execute command: `$ cd android && ./gradlew bundleRelease && cd ..` (APK file: `.android/app/build/outputs/bundle/release/app.aab`)

2- Optional, gets apk signature (Credentials are in `./android/keystores/release.keystore.properties`)

Execute command: `$ keytool -exportcert -alias sensum -keystore ./android/app/my-release-key.keystore | openssl sha1 -binary | openssl base64`
