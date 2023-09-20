import { EventEmitter } from 'events';

export type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logOut: () => void;
  authEvents: EventEmitter;
};
