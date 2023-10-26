import React from 'react';
import { Platform, View, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';

import { extractFirebaseConfig } from 'rn-firebase-config';

import { signInGoogle } from '../utils/signInGoogle';
import authEvents from '../authEvents';
import { Logger } from 'rn-logging';

const img = require('../../assets/google_button.png');

export const SignInScreen = ({ }: { route: any }) => {
  const firebaseConfig = extractFirebaseConfig();
  const webClientId = firebaseConfig?.webClientId ?? "";

  const handleSignIn = async () => {
    Logger.info("Initiating Google sign-in.");

    try {
      if (Platform.OS === 'android' && !webClientId) {
        Logger.warn("webClientId is not provided for Android.");
        throw Error(`RN SignInScreen - webClientId is not provided for Android`);
      } else {
        Logger.info(`Requesting authentication with webclientId: ${webClientId}`);
        const googleCredential = await signInGoogle(webClientId);
        
        if(!googleCredential) {
          const errorMsg = `signInGoogle did not return any user for webClientId ${webClientId}`;
          Logger.error(errorMsg);
          throw Error(`RN SignInScreen - ${errorMsg}`);
        }

        Logger.info("User signed in successfully.", { googleCredential });
        authEvents.emit('signedIn', googleCredential);
      }
    } catch (error) {
      Logger.error(`Authentication error: ${JSON.stringify(error)}`, error);
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