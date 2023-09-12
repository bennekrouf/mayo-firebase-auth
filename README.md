
# 


## Import GoogleService-Info.plist


## Update Info.plist:

Add CLIENT_ID:

```
	<key>GIDClientID</key>
	<string>XXXXXXXXXXXX.apps.googleusercontent.com</string>
```


Add REVERSED_CLIENT_ID:

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

## Example of use:

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
import { readAllFromAsyncStorage, SignInScreen, UserContext } from 'rn-auth-firebase';

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
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readAllFromAsyncStorage();
      setAllData(data);
    };

    fetchData();
  }, []);

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