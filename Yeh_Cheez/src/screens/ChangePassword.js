import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PasswordInput from '../components/atoms/PasswordInput';

const ChangePassword = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <PasswordInput placeHolderText={'Old Password'} />
        </View>
        <View style={styles.inputBox}>
          <PasswordInput placeHolderText={'New Password'} />
        </View>
        <View style={styles.inputBox}>
          <PasswordInput placeHolderText={'Confirm New Password'} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 80,
    width: '100%',
    borderWidth: 15,
    borderRadius: 16,
    borderColor: '#FFA800',
    padding: 10,
  },
  inputBox: {
    padding: 10,
  },
  keyboardView: {flex: 1, justifyContent: 'center'},
  buttonContainer: {alignSelf: 'flex-end', marginTop: 20},
  button: {
    backgroundColor: '#FFA800',
    width: '40%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 50,
  },
  buttonText: {color: 'white', fontSize: 15, textAlign: 'center'},
});

export default ChangePassword;
