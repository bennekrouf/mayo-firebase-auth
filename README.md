
The context of using this package is:
- You have a react-native app
- You need to do google authentication
- You need to cache the connected user to avoid requesting login every time
- You need to save in a firestone db the last connection date.

Basically, you just have to import the library, wrap your app and navigate to the SignIn screen provided by the library.

And then, after login, an event 'signedIn' is emitted, that you can catch to describe what should be done on successfull login.

Here I am showing you all the things to do :


## Install

```bash
  # use yarn, it is faster and safer
  yarn add rn-auth-firebase @react-native-google-signin/google-signin
  npx pod-install
```

## Firebase configuration
- Connect to firebase, create a project and an <b>iOS application</b>.
- Export GoogleService-Info.plist and import it in your app/ios folder


## Update Info.plist to add these parameters:

- Add CLIENT_ID:

```
	<key>GIDClientID</key>
	<string>XXXXXXXXXXXX.apps.googleusercontent.com</string>
```


- Add REVERSED_CLIENT_ID:

```
  <key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>com.googleusercontent.apps.XXXXXXXXXXXXXXXXX</string>
			</array>
		</dict>
	</array>
```

## Create a firebaseConfig.json file:

The parameters value are picked from GoogleService-Info.plist and app in the firebase console.

```js
const conf = {
  apiKey: 'XXXX',
  authDomain: 'XXXXXX.firebaseapp.com',
  projectId: 'XXXXXX',
  storageBucket: 'XXXXXX.appspot.com',
  messagingSenderId: 'XXXXXX',
  appId: '1:XXXXXX',
  databaseURL: '',
  measurementId: 'XXXXXX',
};

export {conf};
```

## Usage:


For android WebClientId is mandatory:


```TSX

  const webClientId = 'XXXXXXXX.apps.googleusercontent.com';

....

  <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{title: "Sign In", headerShown: false}}
      initialParams={{ webClientId }}
    />
``````