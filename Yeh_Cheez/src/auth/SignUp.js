import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Context} from '../context/Context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleIcon, setToggleIcon] = useState('times');
  const [toggleState, setToggleState] = useState(false);
  const {user, setUser} = useContext(Context);

  const handleSignup = () => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      userEmail != '' &&
      userPassword != ''
    ) {
      if (userPassword === confirmPassword) {
        if (toggleState) {
          auth()
            .createUserWithEmailAndPassword(userEmail, userPassword)
            .then(userCredential => {
              Keyboard.dismiss();
              setUserEmail('');
              setUserPassword('');
              firestore()
                .collection('Users')
                .add({
                  firstName: firstName,
                  lastName: lastName,
                  email: userEmail,
                })
                .then(() => {
                  Alert.alert('Success', 'Signed up successfully!');
                  setUser(userCredential.user);
                })
                .catch(error => Alert.alert('Error', error.message));
            })
            .catch(error => Alert.alert('Error', error.message));
        } else {
          Alert.alert('Error', 'Please check our terms and conditions');
        }
      } else {
        Alert.alert('Error', 'Password did not match!');
      }
    } else {
      Alert.alert('Error', 'Please fill fields!');
    }
  };

  const iconValidity = () => {
    toggleIcon === 'times' ? setToggleIcon('check') : setToggleIcon('times');
    toggleState === true ? setToggleState(false) : setToggleState(true);
  };

  return (
    <View
      style={{
        backgroundColor: '#E29500',
        flex: 1,
        padding: 30,
        justifyContent: 'center',
      }}>
      <View style={styles.introContainer}>
        <Text style={styles.introText}>Welcome!</Text>

        <Text style={[styles.introText, {fontSize: 18, marginBottom: 10}]}>
          Sign up for the YEH-CHEEZ
        </Text>
      </View>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="First Name"
          placeholderTextColor={'black'}
          onChangeText={text => setFirstName(text)}
          value={firstName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={'black'}
          onChangeText={text => setLastName(text)}
          value={lastName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={'black'}
          onChangeText={text => setUserEmail(text)}
          value={userEmail}
          style={[styles.textInput]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'black'}
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
          style={styles.textInput}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor={'black'}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          style={styles.textInput}
          secureTextEntry={true}
        />
      </KeyboardAvoidingView>
      <View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
        <TouchableOpacity onPress={iconValidity} style={styles.iconHolder}>
          <Icon name={toggleIcon} size={18} color="black" />
        </TouchableOpacity>

        <Text style={styles.text1}>
          By clicking on 'sign up', you're agreeing to the YEH-CHEEZ Terms of
          Service and Privacy Policy
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button1} onPress={handleSignup}>
          <Text style={styles.buttonText1}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  introContainer: {alignItems: 'center'},
  introText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4990',
    marginBottom: 30,
  },
  image: {
    width: 60,
    height: 60,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 3,
    borderColor: 'white',
    paddingLeft: 15,
    marginTop: 30,
  },
  iconHolder: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 10,
  },
  text1: {fontSize: 14, fontWeight: 'bold', color: '#000000'},
  button1: {
    backgroundColor: '#2D4990',
    padding: 10,
    width: '45%',
    borderRadius: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 25,
  },
  button2: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-evenly',
  },
  buttonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  text3: {
    color: '#2D4990',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  text4: {color: 'black', fontSize: 14, fontWeight: 'normal'},
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});
