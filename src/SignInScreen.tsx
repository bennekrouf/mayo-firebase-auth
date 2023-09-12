import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { signIn } from './signIn';
import { UserContext } from './UserContext';
type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logOut: () => void;
};

export const SignInScreen = ({ navigation }: { navigation: any }) => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const handleSignIn = async () => {
    const newUser = await signIn();
    setUser(newUser);
    // console.log('handleSignIn: ', newUser);
    navigation.navigate('Home');
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