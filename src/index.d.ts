// Import React and other necessary types
import React from 'react';

declare module '*.png' {
    const content: any;
    export default content;
}

export declare function signInGoogle(webClientId: string): Promise<any | undefined>;

// Assuming signInGoogle is a function, define its type here
export declare function signInGoogle(): Promise<void>;

// For the SignInScreen component, define its props and type
export declare const SignInScreen: React.FC<{ config?: any | null }>;
export declare function useLogout(): { performLogout: () => Promise<void> };

// If you have specific types exported from UserContext, declare them here
export * from './screens/UserContext';
  