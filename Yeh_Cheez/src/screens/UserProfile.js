import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

const UserProfile = () => {
  useEffect(() => {}, [productImage]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [qunatity, setQunatity] = useState('');
  const [productImage, setProductImage] = useState(
    require('../assets/images/Rectangle7.png'),
  );

  const handleImagePick = () => {
    const options = {
      title: 'Select Product Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setProductImage({uri: response.assets[0].uri});
      }
    });
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#D4A065',
      placeholder: 'black',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View>
        <TouchableOpacity onPress={handleImagePick}>
          <Image source={productImage} style={styles.userPicture} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputBoxesContainer}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder="First Name"
          onChangeText={text => setTitle(text)}
          value={title}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder="Last Name"
          onChangeText={text => setPrice(text)}
          value={price}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Email"
          onChangeText={text => setQunatity(text)}
          value={qunatity}
          style={styles.inputBox}
        />

        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  userPicture: {
    width: 140,
    height: 140,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#FFA800',
    alignSelf: 'center',
  },
  inputBoxesContainer: {
    borderWidth: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FFA800',
    padding: 10,
    marginBottom: 100,
  },
  inputBox: {
    fontWeight: 'bold',
    width: '98%',
  },
  buttonContainer: {alignSelf: 'flex-end'},
  button: {
    backgroundColor: '#FFA800',
    width: '40%',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {color: 'white', fontSize: 15, textAlign: 'center'},
});
