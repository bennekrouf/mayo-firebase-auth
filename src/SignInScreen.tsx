import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { signIn } from './signIn';
import { UserContext } from './UserContext';
import { EventEmitter } from 'events';

export const authEvents = new EventEmitter();

type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logOut: () => void;
};

export const SignInScreen = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const handleSignIn = async () => {
    const newUser = await signIn();
    setUser(newUser);
    authEvents.emit('signedIn', newUser);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignIn}>
        <Image
          source={require('../assets/google_button.png')}
          style={{ width: 192, height: 48 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });