import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

const AddProduct = () => {
  useEffect(() => {}, [productImage]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [qunatity, setQunatity] = useState('');
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [beforeImage, setBeforeImage] = useState('Add Image');

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
        setProductImage(response.assets[0].uri);
        setBeforeImage('Change Image');
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
      <View style={styles.mainContainer}>
        <TextInput
          mode="outlined"
          label="Title"
          placeholder="Title"
          onChangeText={text => setTitle(text)}
          value={title}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Price"
          placeholder="Price"
          onChangeText={text => setPrice(text)}
          value={price}
          style={styles.inputBox}
          keyboardType="numeric"
        />

        <TextInput
          mode="outlined"
          label="Quantity"
          placeholder="Quantity"
          onChangeText={text => setQunatity(text)}
          value={qunatity}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Description"
          placeholder="Description"
          onChangeText={text => setDescription(text)}
          value={description}
          style={styles.descriptionInput}
        />

        <View>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.imageButton}>
            {productImage ? (
              <Image source={{uri: productImage}} style={styles.imageStyle} />
            ) : (
              <View style={styles.iconHolder}>
                <Text style={styles.buttonText}>+</Text>
              </View>
            )}
            <Text style={styles.messageText}>{beforeImage}</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSubmission}>
              <Text style={styles.buttonText2}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FFA800',
    padding: 10,
    marginBottom: 100,
  },
  inputBox: {fontWeight: 'bold', width: '98%'},
  descriptionInput: {
    fontWeight: 'bold',
    width: '98%',
    height: '25%',
    marginBottom: 15,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#D4A065',
    backgroundColor: '#F4F4F4',
    width: '40%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    borderRadius: 5,
  },
  imageStyle: {width: '100%', height: '100%', borderRadius: 5},
  iconHolder: {
    borderWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 50,
    backgroundColor: '#2D4990',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  messageText: {fontWeight: 'bold', color: 'black'},
  buttonContainer: {alignSelf: 'flex-end'},
  buttonSubmission: {
    backgroundColor: '#FFA800',
    width: '30%',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText2: {color: 'white', fontSize: 15, textAlign: 'center'},
});
