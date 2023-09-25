import React, {useState, createContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authEvents from './authEvents';
import { UserContextType } from './userContextTypes';
import { useLogout } from './useLogout';

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState(null);

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
    <UserContext.Provider value={{user, setUser, useLogout, authEvents}}>
      {children}
    </UserContext.Provider>
  );
};
