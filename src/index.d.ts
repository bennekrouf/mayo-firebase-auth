import React from 'react';
import { EventEmitter } from 'events';

declare module '*.png' {
    const content: any;
    export default content;
}

export declare function signInGoogle(webClientId: string): Promise<any | undefined>;
export declare function signInGoogle(): Promise<void>;
export declare const SignInScreen: React.FC<{ config?: any | null }>;
export declare function useLogout(): { performLogout: () => Promise<void> };
export * from './screens/UserContext';
export type UserContextType = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    useLogout: () => void;
    authEvents: EventEmitter;
    userContextLoading: boolean;
};
  