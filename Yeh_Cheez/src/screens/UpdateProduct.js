import 'react-native-get-random-values';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';

const UpdateProduct = ({route, navigation}) => {
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        const categoryItems = Object.keys(categories).map(key => ({
          label: categories[key],
          value: categories[key],
        }));
        setItems(categoryItems);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getCategories = async () => {
    const categoriesCollection = await firestore()
      .collection('Categories')
      .doc('gLAfJhT9wlonzeYb2ov6')
      .get();
    return categoriesCollection._data;
  };
  useEffect(() => {}, [productImage]);

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const getData = async () => {
    try {
      const productsCollection = await firestore().collection('Products').get();
      const products = [];

      productsCollection.docs.forEach(doc => {
        const productData = doc.data();
        products.push({
          id: doc.id,
          ...productData,
        });
      });

      const matchingProduct = products.find(
        product => product.productTitle === route.params.title,
      );

      if (matchingProduct) {
        setTitle(matchingProduct.productTitle || '');
        setPrice(matchingProduct.productPrice || '');
        setQunatity(matchingProduct.productQunatity || '');
        setDescription(matchingProduct.productDescription || '');
        setValue(matchingProduct.productCateogory || null);
        setProductImage(matchingProduct.image || '');
      } else {
        console.warn('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{}]);
  const [title, setTitle] = useState(route.params.title);
  const [price, setPrice] = useState(route.params.price.toString());
  const [qunatity, setQunatity] = useState(route.params.quantity.toString());
  const [description, setDescription] = useState(route.params.description);
  const [value, setValue] = useState(route.params.category);
  const [productImage, setProductImage] = useState('');
  const [beforeImage, setBeforeImage] = useState('Add Image');

  const productImageHandle = async imageId => {
    try {
      const reference = await storage()
        .ref(`/ProductImages/${imageId}`)
        .putFile(productImage);
      return await storage().ref(`/ProductImages/${imageId}`).getDownloadURL();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (
      title !== '' &&
      price !== '' &&
      qunatity !== '' &&
      description !== '' &&
      productImage !== ''
    ) {
      const imagePath = await productImageHandle(uuidv4());
  
      try {
        const querySnapshot = await firestore()
          .collection('Products')
          .where('productTitle', '==', route.params.title)
          .get();
  
        if (!querySnapshot.empty) {
          const documentId = querySnapshot.docs[0].id;
  
          await firestore()
            .collection('Products')
            .doc(documentId)
            .update({
              productTitle: title,
              productPrice: price,
              productQunatity: qunatity,
              productDescription: description,
              image: imagePath,
              productCateogory: value,
            });
  
          Alert.alert('Success', `Product updated successfully`);
        } else {
          console.warn('Product not found');
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Product not updated');
      }
    } else {
      Alert.alert('Error', 'Please fill all the required fields');
    }
  };
  

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
          multiline={true}
          numberOfLines={3}
          onChangeText={text => setDescription(text)}
          value={description}
          style={styles.descriptionInput}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <View style={{marginTop: 20}}>
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
            <TouchableOpacity
              style={styles.buttonSubmission}
              onPress={handleUpdate}>
              <Text style={styles.buttonText2}>Update Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FFA800',
    padding: 10,
    marginBottom: 200,
  },
  inputBox: {fontWeight: 'bold', width: '98%'},
  descriptionInput: {
    fontWeight: 'bold',
    width: '98%',
    marginBottom: 10,
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
    width: '40%',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText2: {color: 'white', fontSize: 15, textAlign: 'center'},
});
