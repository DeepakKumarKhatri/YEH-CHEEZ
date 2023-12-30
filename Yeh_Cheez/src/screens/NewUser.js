import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewUser = () => {
  const navigation = useNavigation();
  const loginBtn = async () => {
    await AsyncStorage.setItem('first', 'yes');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  const signupBtn = async () => {
    await AsyncStorage.setItem('first', 'yes');
    navigation.reset({
      index: 0,
      routes: [{name: 'SignUp'}],
    });
  };
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('first');
      if (data == 'yes') {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Onboarding.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={[styles.text, {color: '#2D4990'}]}>Buy </Text>
          <Text style={styles.text}>And </Text>
          <Text style={[styles.text, {color: '#2D4990'}]}>Sell </Text>
          <Text style={styles.text}>Anything Faster</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.text}>With The </Text>
          <Text style={[styles.text, {color: '#2D4990'}]}>YEH-CHEEZ </Text>
          <Text style={styles.text}>App</Text>
        </View>
        <Text style={styles.text2}>
          Massive discounts and offers when you shop.
        </Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={{width: '100%', alignItems: 'center', paddingTop: 15}}>
          <TouchableOpacity style={styles.button} onPress={() => loginBtn()}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signupBtn()}
            style={[styles.button, {backgroundColor: 'white', marginTop: 15}]}>
            <Text style={[styles.buttonText, {color: '#2D4990'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 150,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  image: {
    height: '80%',
    width: '80%',
  },
  textContainer: {
    marginTop: -80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRow: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  text2: {
    paddingTop: 10,
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    paddingBottom: 20,
  },
  logo: {
    height: 60,
    width: 60,
  },
  button: {
    backgroundColor: '#2D4990',
    width: '80%',
    padding: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2D4990',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
});
