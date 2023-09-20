import { useContext } from 'react';
import { UserContext } from './UserContext';
import { UserContextType } from './userContextTypes';

export const useLogout = () => {
  const { logOut } = useContext(UserContext) as UserContextType;

  const performLogout = () => {
    logOut();
  };

  return { performLogout };
};