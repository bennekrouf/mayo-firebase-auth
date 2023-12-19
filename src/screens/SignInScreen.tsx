import React, { useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Platform, View, TouchableOpacity, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { extractFirebaseConfig } from 'mayo-firebase-config';

import { signInGoogle } from '../utils/signInGoogle';
import authEvents from '../authEvents';
import { Logger } from 'mayo-logger';
import { RootStackParamList } from '../types/RootStackParamList';

const img = require('../../assets/google_button.png');

type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;

export const SignInScreen = ({ route }: { route: SignInScreenRouteProp }) => {
  const { config = null } = route.params || {};
  const [firebaseConfig, setFirebaseConfig] = useState<any | null>(null);

  useEffect(() => {
    const fetchConfig = async (config:any) => {
      setFirebaseConfig(config || await extractFirebaseConfig());
    };

    fetchConfig(config);
  }, []);

  if (!firebaseConfig) {
    return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
  }
  const webClientId = firebaseConfig?.webClientId ?? "";

  const handleSignIn = async () => {
    Logger.info("Initiating Google sign-in.", null, { tag: 'mayo-firebase-auth'});

    try {
      if (Platform.OS === 'android' && !webClientId) {
        Logger.warn("webClientId is not provided for Android.", null, { tag: 'mayo-firebase-auth'});
        throw Error(`RN SignInScreen - webClientId is not provided for Android`);
      } else {
        Logger.info(`Requesting authentication with webclientId: ${webClientId}`, null, { tag: 'mayo-firebase-auth'});
        const googleCredential = await signInGoogle(webClientId);
        
        if(!googleCredential) {
          const errorMsg = `signInGoogle did not return any user for webClientId ${webClientId}`;
          Logger.error(errorMsg, null, { tag: 'mayo-firebase-auth'});
          throw Error(`RN SignInScreen - ${errorMsg}`);
        }

        Logger.info("User signed in successfully.", { googleCredential }, { tag: 'mayo-firebase-auth'});
        authEvents.emit('signedIn', googleCredential);
      }
    } catch (error) {
      Logger.error(`Authentication error: ${JSON.stringify(error)}`, error, { tag: 'mayo-firebase-auth'});
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