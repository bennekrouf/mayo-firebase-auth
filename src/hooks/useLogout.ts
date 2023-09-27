import AsyncStorage from '@react-native-async-storage/async-storage';
import authEvents from '../authEvents';

export const useLogout = () => {
   const performLogout = async () => {
      await AsyncStorage.removeItem('user');
      authEvents.emit('signedOut', true);
   };

   return { performLogout };
};
