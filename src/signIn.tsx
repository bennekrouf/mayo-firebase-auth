import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const signIn = async () => {  
  try {
    console.log('in GoogleSignin.signIn');
    await GoogleSignin.hasPlayServices();
    console.log('After hasPlayServices');
    const result = await GoogleSignin.signIn();
    console.log('GoogleSignin.signIn : ', result);
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    console.log('Google Credential :', googleCredential);
    // Sign in to Firebase
    const firebaseUserCredential = await auth().signInWithCredential(
      googleCredential,
    );
    // Save user to AsyncStorage
    await AsyncStorage.setItem(
      'user',
      JSON.stringify(firebaseUserCredential.user),
    );

    // Save the last connection date in Firestore
    await firestore()
      .collection('users')
      .doc(firebaseUserCredential.user.uid)
      .collection('apps')
      .doc('abjad')
      .set(
        {
          lastConnectionDate: new Date(),
        },
        {merge: true},
      );
      return firebaseUserCredential.user;
  } catch (error: any) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow
    } else {
      // Some other error
    }
  }
};
