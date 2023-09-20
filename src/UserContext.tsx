import React, {createContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import authEvents from './authEvents';
import { UserContextType } from './userContextTypes';

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState(null);

  const logOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    authEvents.emit('signedOut', true);
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      console.log('RN AUTH - Stored user :', storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser, logOut, authEvents}}>
      {children}
    </UserContext.Provider>
  );
};
