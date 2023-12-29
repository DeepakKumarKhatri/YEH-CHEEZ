import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';

import storage from '@react-native-firebase/storage';

const BUTTONNAME = 'View More>>';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedProduct, setSearchedProduct] = useState(null);

  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const productSnapshot = await firestore()
        .collection('Products')
        .where('productTitle', '==', searchText)
        .get();

      if (!productSnapshot.empty) {
        const productData = productSnapshot.docs[0].data();
        const uidStartIndex = productData.image.lastIndexOf('%2F') + 3;
        const uidEndIndex = productData.image.indexOf('?alt=media&token=');
        const imageUid = productData.image.substring(
          uidStartIndex,
          uidEndIndex,
        );

        const imagePath = `ProductImages/${imageUid}`;
        const imageUrl = await storage().ref(imagePath).getDownloadURL();
        const updatedProductData = {
          ...productData,
          image: imageUrl,
        };

        setSearchedProduct(updatedProductData);
      } else {
        setSearchedProduct(null);
      }
    } catch (error) {
      console.error('Error searching product:', error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{borderBottomWidth: 2, borderBottomColor: '#D4A065'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={30} color="#2D4990" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            right={
              <TextInput.Icon icon="account-search" onPress={handleSearch} />
            } // Corrected line
            placeholderTextColor={'black'}
            style={{
              borderWidth: 3,
              borderRadius: 10,
              width: '85%',
              paddingLeft: 20,
              fontSize: 18,
              marginLeft: 10,
              borderColor: '#233A74',
              backgroundColor: '#DCDCDC80',
            }}
            onChangeText={text => setSearchText(text)}
          />
        </View>
      </View>
      {console.log(searchedProduct)}
      {searchedProduct && (
        <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
          <Image
            source={{
              uri: searchedProduct.image,
            }}
            style={styles.productImage}
          />

          <View style={{marginLeft: 15}}>
            <Text style={styles.productTitle}>
              {searchedProduct.productTitle}
            </Text>
            <Text style={styles.productPrice}>
              Rs: {searchedProduct.productPrice}
            </Text>
            <TouchableOpacity>
              <Text style={styles.button}>{BUTTONNAME}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="shopping-cart" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: 150,
    height: 110,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA800',
  },
  iconContainer: {
    width: '25%',
    borderRadius: 20,
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 7,
    paddingBottom: 6,
    backgroundColor: '#FFA800',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    color: '#FFA800',
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  productPrice: {
    fontSize: 18,
    color: '#2D4990',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  button: {
    fontSize: 16,
    color: '#2D4990',
    textDecorationLine: 'underline',
    paddingBottom: 5,
  },
});

export default Search;
