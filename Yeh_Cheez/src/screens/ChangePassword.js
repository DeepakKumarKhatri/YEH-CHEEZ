import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChangePassword = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={headerStyle.headerTitle}>CHANGE PASSWORD</Text>
      ),
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={30}
            color="#2D4990"
            style={headerStyle.icon}
          />
        </TouchableOpacity>
      ),

      contentStyle: {
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#D4A065',
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [secureText3, setSecureText3] = useState(true);

  const handleIconPress1 = () => {
    setSecureText1(!secureText1);
  };

  const handleIconPress2 = () => {
    setSecureText2(!secureText2);
  };

  const handleIconPress3 = () => {
    setSecureText3(!secureText3);
  };

  const handleSaveChanges = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        // Re-authenticate the user before changing the password
        const credential = auth.EmailAuthProvider.credential(
          user.email,
          oldPassword,
        );
        await user.reauthenticateWithCredential(credential);

        // Change the password
        await user.updatePassword(newPassword);

        Alert.alert('Password updated successfully');
      } catch (error) {
        Alert.alert('Error updating password', error.message);
      }
    } else {
      Alert.alert('User not authenticated');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            label={'Old Password'}
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
            secureTextEntry={secureText1}
            right={
              <TextInput.Icon
                icon={secureText1 ? 'eye' : 'eye-off'}
                onPress={handleIconPress1}
              />
            }
            theme={{
              colors: {
                primary: '#D4A065',
              },
            }}
            style={{
              backgroundColor: 'white',
              shadowColor: 'grey',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.6,
              shadowRadius: 4,
              elevation: 20,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            label={'New Password'}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            secureTextEntry={secureText2}
            right={
              <TextInput.Icon
                icon={secureText2 ? 'eye' : 'eye-off'}
                onPress={handleIconPress2}
              />
            }
            theme={{
              colors: {
                primary: '#D4A065',
              },
            }}
            style={{
              backgroundColor: 'white',
              shadowColor: 'grey',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.6,
              shadowRadius: 4,
              elevation: 20,
              borderRadius: 10,
            }}
          />
        </View>
        <KeyboardAvoidingView style={styles.inputBox}>
          <TextInput
            label={'Confirm New Password'}
            value={confirmNewPassword}
            onChangeText={text => setConfirmNewPassword(text)}
            secureTextEntry={secureText3}
            right={
              <TextInput.Icon
                icon={secureText3 ? 'eye' : 'eye-off'}
                onPress={handleIconPress3}
              />
            }
            theme={{
              colors: {
                primary: '#D4A065',
              },
            }}
            style={{
              backgroundColor: 'white',
              shadowColor: 'grey',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.6,
              shadowRadius: 4,
              elevation: 20,
              borderRadius: 10,
            }}
          />
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
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

const headerStyle = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D4990',
    padding: 25,
  },
  headerRight: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default ChangePassword;
