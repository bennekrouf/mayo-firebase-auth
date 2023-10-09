import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const signInGoogle = async (webClientId:string) => {
  try {
    console.log(`RNA - 0 - GoogleSignin.configure with param ${JSON.stringify(webClientId)}`);
    const configureRes = GoogleSignin.configure({webClientId: webClientId});
    console.log(`RNA - 0.1 - GoogleSignin.configure result : ${JSON.stringify(configureRes)}`);
    
    const res = await GoogleSignin.hasPlayServices();
    console.log(`RNA - 1 - GoogleSignin.hasPlayServices : ${JSON.stringify(res)}`);

    const result = await GoogleSignin.signIn();
    console.log(`RNA - 2 - GoogleSignin.hasPlayServices : ${JSON.stringify(result)}`);

    return auth.GoogleAuthProvider.credential(result.idToken);
  } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else {
        console.log('ERROR in sign in: ', error);
      }
      console.log(`RNA - X - GoogleSignin.hasPlayServices : ${JSON.stringify(error)}`);
  }
};
