import { EventEmitter } from 'events';

export type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  useLogout: () => void;
  authEvents: EventEmitter;
  userContextLoading: boolean;
};
