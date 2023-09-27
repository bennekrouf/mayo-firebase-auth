import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authEvents from '../authEvents';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UserContext } from '../index';
import { UserContextType } from '../types/userContextTypes';

export const useFirebaseLogout = <T extends Record<string, undefined>>(backScreen:any) => {
  const [user, setUser] = useState(null);
  const { authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<T>>();

  const performLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    authEvents.emit('signedOut', true);
  };

  useEffect(() => {
    const onSignedOut = async () => {
      navigation.navigate(backScreen);
    };
    authEvents.on('signedOut', onSignedOut);

    return () => {
      authEvents.off('signedOut', onSignedOut);
    };
  }, []);

  return { performLogout };
};
