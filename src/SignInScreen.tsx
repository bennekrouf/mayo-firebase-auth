import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { signInGoogle } from './signInGoogle';
// import { UserContext } from './UserContext';
import { EventEmitter } from 'events';
// import { signInFirebase } from 'rn-write-firestone';
export const authEvents = new EventEmitter();
const img = require('../assets/google_button.png');

type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logOut: () => void;
};

export const SignInScreen = (paramsObj: any) => {
  const firebaseConfig = paramsObj.route.params.firebaseConf;
  const app = paramsObj.route.params.app;

  // const { user, setUser } = useContext(UserContext) as UserContextType;

  const handleSignIn = async () => {
    console.log('RN AUTH - BEFORE SIGN IN GOOGLE');
    const googleCredential = await signInGoogle();

    console.log('RN AUTH - BEFORE SIGN IN FIREBASE');
    // const newUser = signInFirebase(app, firebaseConfig, googleCredential);
    // setUser(newUser);
    // authEvents.emit('signedIn', newUser);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignIn}>
        <Image
          source={img}
          style={{ width: 192, height: 48 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });