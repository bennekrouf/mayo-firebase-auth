
This package provides a Google sign login screen based on use of Firebase and react-native for iOS.

It is using AsnyStorage to save the user credentials.

Basically, you just have to import the library, wrap your app and navigate to the SignIn screen provided by the library. And then, after login, an event 'signedIn' is emitted, that you can catch to describe what should be done on successfull login. Here I am showing you all the things to do :


## Install

```
  yarn add rn-auth-firebase @react-native-google-signin/google-signin
  npx pod-install
```

## Firebase configuration
- Connect to firebase, create a project and an iOS application.
- Export GoogleService-Info.plist and import it in your project/ios


## Update Info.plist:

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

## Usage:

index.js

```javascript
import { UserProvider } from 'rn-auth-firebase';

const Main = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};
```


App.tsx

```javascript
import { SignInScreen, UserContext } from 'rn-auth-firebase';

const HomeScreen = ({ navigation }) => {
  const [storageData, setStorageData] = useState(null);
  const { logOut } = useContext(UserContext);

  const signOut = async () => {
    logOut();
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
      {/* Rest of home screen content */}
    </View>
  );
};
export default function App() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```


And here the interesting part about catching event :

```javascript
import { authEvents } from 'rn-auth-firebase';

// ... inside a component :

useEffect(() => {
    const handleSignIn = (newUser) => {
      // Do navigate or something else
    };
  
    authEvents.on('signedIn', handleSignIn);
    return () => {
      authEvents.off('signedIn', handleSignIn);
    };
  }, []);

```