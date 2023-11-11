
The context of using this package is:
- You have a react-native app
- You need to do google authentication
- You need to cache the connected user to avoid requesting login every time
- You need to save in a firestore db the last connection date.

Basically, you just have to import the library, wrap your app and navigate to the SignIn screen provided by the library.

And then, after login, an event 'signedIn' is emitted, that you can catch to describe what should be done on successfull login.

Here I am showing you all the things to do :


## Install

```bash
  # use yarn, it is faster and safer
  yarn add mayo-firebase-auth @react-native-google-signin/google-signin
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

!! You can avoid this step by using this npm component : may-firebase-config

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

### HomeScreen.tsx : 

```Javascript
  import { useLogout, UserContext, UserContextType } from 'mayo-firebase-auth';
  const HomeScreen = () => {
    const { authEvents } = useContext(UserContext) as UserContextType;
    const navigation = useNavigation<NavigationProp<RootStackParamList, 'SignIn'>>();

    const { performLogout } = useLogout();
    useEffect(() => {
      const onSignedOut = async () => {
        navigation.navigate('SignIn');
      };
      
      authEvents.on('signedOut', onSignedOut);
      return () => authEvents.off('signedOut', onSignedOut);
    }, []);
  }
```


### InitialScreen.tsx :

```Javascript
  import { UserContext, UserContextType } from 'mayo-firebase-auth';
  const InitialScreen = () => {
    const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        navigation.navigate(user ? 'Home':'SignIn');
    }, [user]);

    useEffect(() => {
      const onSignedIn = async (googleCredentials) => {
        if(!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await signInFirebase(googleCredentials);
        if(!newUser) throw Error('InitialScreen - Firebase sign do not return any user !');
        setUser(newUser);
      };
      authEvents.on('signedIn', onSignedIn);

      return () => {
        authEvents.off('signedIn', onSignedIn);
      };
    }, []);

    return null;
  };
```


### AppNavigator.tsx:

```Javascript
  import { SignInScreen, UserProvider } from 'mayo-firebase-auth';

  export const MainApp: React.FC = () => {
    // For android WebClientId is mandatory. Also don't forget to add the SHA key in firebase console
    const webClientId = "XXXXXXXX.apps.googleusercontent.com";

    return (

      <NavigationContainer>
        <UserProvider>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={InitialScreen}
                options={{ headerShown: false }} 
              />
              <Stack.Screen name="SignIn" component={SignInScreen} 
              options={{
                headerLeft: () => null,  // Hide back button
                headerShown: false,
              }}
              initialParams={{ webClientId }}
              />
              <Stack.Screen name="Home" component={HomeScreen} 
                  options={{ 
                    headerLeft: () => null,  // Hide back button
                    headerShown: false,
                  }}
              />
            </Stack.Navigator>
        </UserProvider>
      </NavigationContainer>
      );
    }
```


## 📚 License

This project is licensed under the MIT License.