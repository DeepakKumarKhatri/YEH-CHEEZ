import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

const PasswordInput = ({placeHolderText}) => {
  const [secureText, setSecureText] = useState(true);

  const handleIconPress = () => {
    setSecureText(!secureText);
  };

  return (
    <TextInput
      label={placeHolderText}
      secureTextEntry={secureText}
      right={
        <TextInput.Icon
          icon={secureText ? 'eye' : 'eye-off'}
          onPress={handleIconPress}
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
  );
};

export default PasswordInput;

const styles = StyleSheet.create({});
