import React from 'react';
import { EventEmitter } from 'events';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types/RootStackParamList';

declare module '*.png' {
    const content: any;
    export default content;
}

export declare function signInGoogle(webClientId: string): Promise<any | undefined>;
export declare function signInGoogle(): Promise<void>;
// export declare const SignInScreen: React.FC<{ route: any }>;
export declare function useLogout(): { performLogout: () => Promise<void> };
export * from './screens/UserContext';
export type UserContextType = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    useLogout: () => void;
    authEvents: EventEmitter;
    userContextLoading: boolean;
};

export declare const SignInScreen: React.FC<{
    route: RouteProp<RootStackParamList, 'SignIn'>;
}>;