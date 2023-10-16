import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authEvents from '../authEvents';
import { Logger } from 'rn-logging';

export const useLogout = () => {
   const performLogout = async () => {
      Logger.info("Attempting to perform logout.");
      try {
         const webClientId = await AsyncStorage.getItem('webClientId');
         if(webClientId) {
            Logger.info("WebClientId retrieved successfully.", { webClientId });
            GoogleSignin.configure({webClientId: webClientId});
            await GoogleSignin.revokeAccess();
            Logger.info("Google access revoked successfully.");
            await GoogleSignin.signOut();
            Logger.info("Google sign out successful.");
         } else {
            Logger.warn("No WebClientID found in AsyncStorage.");
         }
      } catch (error) {
         Logger.error("Error during logout process.", error);
      } finally {
         await AsyncStorage.removeItem('user');
         Logger.info("'user' removed from AsyncStorage.");
         authEvents.emit('signedOut', true);
         Logger.info("Emitting 'signedOut' event.");
      }
   };

   return { performLogout };
};
