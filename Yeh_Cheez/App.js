import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Context} from './src/context/Context';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user);
    });
    // auth().signOut();
    // setUser(null);
  }, []);
  return (
    <Context.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user === null ? 'Login' : 'Deepak'}>
          {user == null ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Deepak"
                component={SignUp}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
