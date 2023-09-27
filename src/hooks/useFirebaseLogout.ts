import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext } from '../index';
import { UserContextType } from '../types/userContextTypes';
import { useLogout } from './useLogout';

export const useFirebaseLogout = <T extends Record<string, undefined>>(backScreen:any) => {
  const { performLogout } = useLogout();
  const { authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<T>>();

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