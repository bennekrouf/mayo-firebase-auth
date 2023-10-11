import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { signInGoogle } from '../utils/signInGoogle';
import authEvents from '../authEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';

const img = require('../../assets/google_button.png');

export const SignInScreen = ({ route }: { route: any }) => {
  const { webClientId } = route.params;

  const handleSignIn = async () => {
    try {
      console.log('RN - handleSignInScreen - Request authenticate with webclientId: ', webClientId);
      const googleCredential = await signInGoogle(webClientId);
      if(!googleCredential) throw Error(`RN SignInScreen - signInGoogle do not return any user for webClientId ${webClientId}`);
      console.log('RN EMIT signedIn : ', googleCredential);
      authEvents.emit('signedIn', googleCredential);
    } catch (error) {
      console.log(`Authentication error ${JSON.stringify(error)}`);
      return error;
    }
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