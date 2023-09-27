import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authEvents from './authEvents';

export const useLogout = () => {
  const [user, setUser] = useState(null);

  const performLogout = async () => {
    console.log('RN In performLogout');
    await AsyncStorage.removeItem('user');
    setUser(null);
    authEvents.emit('signedOut', true);
    console.log('RN signedOut event emitted');
  };

  return { performLogout };
};