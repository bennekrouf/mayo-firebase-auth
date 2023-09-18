export type UserContextType = {
    user: any; // Consider using a more specific type
    setUser: React.Dispatch<React.SetStateAction<any>>;
    logOut: () => void;
  };
