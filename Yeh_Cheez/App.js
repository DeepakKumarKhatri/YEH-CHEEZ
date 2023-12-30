import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Context} from './src/context/Context';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';
import Home from './src/routes/Home';
import NewUser from './src/screens/NewUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [fav, setFav] = useState(0);
  const [first, setFirst] = useState(null);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('first');
      setFirst(data);
    }
    getData();
  }, []);
  return (
    <Context.Provider value={{userAuth: [user, setUser], cartCount: [cartItems, setCartItems], favCount: [fav, setFav]}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={first === 'yes' ? 'Login' : 'NewUser'}>
          {user == null ? (
            <>
              <Stack.Screen 
                name="NewUser"
                component={NewUser}
                options={{headerShown: false}}
              />
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
                name="Home"
                component={Home}
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
