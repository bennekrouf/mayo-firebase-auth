import React, { useState, createContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authEvents from '../authEvents';
import { UserContextType } from '../types/userContextTypes';
import { useLogout } from '../hooks/useLogout';
import { Logger } from 'rn-logging';

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      Logger.info("Attempting to fetch user from AsyncStorage.");

      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          Logger.info("User found in AsyncStorage.", { storedUser: JSON.parse(storedUser) });
          setUser(JSON.parse(storedUser));
        } else {
          Logger.warn("No user found in AsyncStorage.");
        }
      } catch (error) {
        Logger.error("Error fetching user from AsyncStorage.", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, useLogout, authEvents }}>
      {children}
    </UserContext.Provider>
  );
};
