import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Logger } from 'mayo-logger'; 

export const signInGoogle = async (webClientId: string) => {
  try {
    Logger.info("Configuring GoogleSignin with webClientId.", { webClientId });
    GoogleSignin.configure({ webClientId: webClientId });

    const playServicesAvailable = await GoogleSignin.hasPlayServices();
    Logger.info("Checking availability of Google Play Services.", { playServicesAvailable });

    const signInResult = await GoogleSignin.signIn();
    Logger.info("User signed in using Google.", { userId: signInResult.user.id });  // Log only user ID for privacy reasons

    if (webClientId) {
      await AsyncStorage.setItem('webClientId', webClientId);  // Store webClientId for convenience during logout
      Logger.info("Stored webClientId in AsyncStorage.");
    }

    return auth.GoogleAuthProvider.credential(signInResult.idToken);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Logger.warn("User cancelled the Google sign-in process.");
    } else {
      Logger.error("Error during Google sign-in.", { message: error.message, errorCode: error.code });
    }
  }
};
