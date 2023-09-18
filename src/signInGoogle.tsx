import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const signInGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();
    return auth.GoogleAuthProvider.credential(result.idToken);
  } catch (error: any) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('SIGN_IN_CANCELLED');
      // User cancelled the login flow
    } else {
      console.log('ERROR in sign in: ', error);
    }
  }
};
