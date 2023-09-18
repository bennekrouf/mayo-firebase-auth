import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';

const customInitializeFirebase = (firebaseConfig:any) => {
  if (!firebase.apps.length) {
    console.log(`RN Init firebase app with : ${firebaseConfig}`);
    firebase.initializeApp(firebaseConfig);
  } else {
    console.log(`RN Found firebase app`);
    firebase.app();
  }
};

export const signInFirebase = async (firebaseConfig:any, app:string, googleCredential:any) => {
  console.log(`RN firebaseConfig : ${JSON.stringify(firebaseConfig)} app : ${JSON.stringify(app)}`);
  customInitializeFirebase(firebaseConfig);

  // Sign in to Firebase
  const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
  // Save user to AsyncStorage
  await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));

  // Save the last connection date in Firestore
  const id = firebaseUserCredential.user.email || firebaseUserCredential.user.uid;
  const appCollection = app?.toLocaleLowerCase();
  console.log(`Try to persist in : ${appCollection}/${id}`);
  await firestore()
    .collection(appCollection)
    .doc(id)
    .set(
      {
        lastConnectionDate: new Date(),
      },
      { merge: true }
    );
  console.log('AFTER firestore()');
  return firebaseUserCredential.user;
}