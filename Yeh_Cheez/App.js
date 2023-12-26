import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
  StyleSheet
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUpValidation = () => {
    if (password !== confirmPassword) {
      ToastAndroid.showWithGravityAndOffset(
        'Password Mismatch, Password and Confirm Password do not match',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return false;
    }
    return true;
  };

  const handleUserSignUpData = async () => {
    if (email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
      if (handleSignUpValidation()) {
        try {
          const dataToSend = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );          
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      Alert.alert(
        'Fields can not be empty!',
        'Please fill all the input fields',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <View>
      <View style={styles.mainHeader}>
        <Text style={styles.mainHeaderTitle}>SignUp</Text>
        <Text style={styles.mainHeaderDescription}>
          Get Started by putting your information
        </Text>
      </View>

      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.inputLabel}>E-Mail</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="deepak@gmail.com"
            autoCapitalize="none"
            placeholderTextColor="grey"
            onChangeText={text => setEmail(text)}
            value={email}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Set Password"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
            value={password}
          />

          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Re-Enter Password"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            handleUserSignUpData();
          }}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authenticationButton}>
          <Text style={styles.authenticationButtonText}>
            Log in with Google
          </Text>
          <Icon name="google" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.authenticationButton}>
          <Text style={styles.authenticationButtonText}>
            Log in with Facebook
          </Text>
          <Icon name="facebook" size={30} color="blue" />
        </TouchableOpacity>

        <View style={styles.signUpLink}>
          <Text style={styles.resetText1}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.resetText2}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default App

const styles = StyleSheet.create({
  mainHeader: {
    margin: 10,
    padding: 15,
  },
  mainHeaderTitle: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
    color: '#2D9596',
  },
  mainHeaderDescription: {
    fontSize: 20,
    color: '#9AD0C2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputLabel: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    margin: 5,
  },
  inputBox: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    color: 'black',
    fontSize: 15,
    padding: 15,
    marginBottom: 10,
  },
  reset: {flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20},
  resetText1: {color: 'grey', fontWeight: 'bold', fontSize: 15},
  resetText2: {color: 'black', fontWeight: 'bold', fontSize: 15},
  signInButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2D9596',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2D9596',
  },
  signInButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  signUpLink: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 20,
  },
  authenticationButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2D9596',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authenticationButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'gray',
  },
})