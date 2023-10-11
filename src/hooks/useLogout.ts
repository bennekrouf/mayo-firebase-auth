import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authEvents from '../authEvents';

export const useLogout = () => {
   const performLogout = async () => {
      try {
         const webClientId = await AsyncStorage.getItem('webClientId');
         if(webClientId) {
            GoogleSignin.configure({webClientId: webClientId});
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
         }
         await AsyncStorage.removeItem('user');
         authEvents.emit('signedOut', true);
      } catch (error) {
         console.error(error);
      }
   };

   return { performLogout };
};
