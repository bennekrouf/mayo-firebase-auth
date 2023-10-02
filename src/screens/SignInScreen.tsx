import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { signInGoogle } from '../utils/signInGoogle';
import authEvents from '../authEvents';

const img = require('../assets/google_button.png');

export const SignInScreen = (webClientId:string) => {
  const handleSignIn = async () => {
    const googleCredential = await signInGoogle(webClientId);
    // console.log('RN EMIT signedIn : ', googleCredential);
    authEvents.emit('signedIn', googleCredential);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
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