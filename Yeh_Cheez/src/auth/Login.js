import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Context} from '../context/Context';
import auth from '@react-native-firebase/auth'; 

const Login = ({navigation,route}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [toggleIcon, setToggleIcon] = useState('times');
  const {userAuth} = useContext(Context);
  const [user, setUser] = userAuth;

  const handleLogin = () => {
    if (userEmail != '' && userPassword != '') {
      auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(userCredential => {
          setUserEmail('');
          setUserPassword('');
          setUser(userCredential.user);
        })
        .catch(error => Alert.alert('Error', error.message));
    } else {
      Alert.alert('Error', 'Please fill fields!');
    }
  };

  const iconValidity = () => {
    toggleIcon === 'times' ? setToggleIcon('check') : setToggleIcon('times');
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
        <Text style={styles.introText}>Welcome back!</Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
        <Text style={[styles.introText, {fontSize: 18}]}>
          Log In to your account
        </Text>
      </View>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={'black'}
          onChangeText={text => setUserEmail(text)}
          value={userEmail}
          style={[styles.textInput, {marginTop: 15}]}
        />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor={'black'}
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
          style={styles.textInput}
          secureTextEntry={true}
        />
      </KeyboardAvoidingView>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <TouchableOpacity onPress={iconValidity} style={styles.iconHolder}>
          <Icon name={toggleIcon} size={18} color="black" />
        </TouchableOpacity>

        <Text style={styles.text1}>Remember Me</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttonText1}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.text2}>OR</Text>

        <TouchableOpacity style={styles.button2}>
          <Icon name="google" size={20} color="#2D4990" />
          <Text style={styles.buttonText2}>
            Log in with your Google account
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.text4}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text3}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  introContainer: {alignItems: 'center'},
  introText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4990',
    marginBottom: 15,
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
    color: 'black'
  },
  iconHolder: {
    borderWidth: 1,
    width: 20,
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
