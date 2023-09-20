import React, {createContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logOut: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  console.log('IN USER PROVIDER');
  
  const [user, setUser] = useState(null);

  const logOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    console.log('IN USER PROVIDER');

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
    <UserContext.Provider value={{user, setUser, logOut}}>
      {children}
    </UserContext.Provider>
  );
};
