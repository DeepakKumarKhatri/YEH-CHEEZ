import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import { Context } from '../../context/Context';

const CategoryCard = ({ title, price, description, image}) => {
  const navigation = useNavigation();
  const {userAuth, cartCount, favCount} = useContext(Context);
  const [user, setUser] = userAuth;
  const [cartItems, setCartItems] = cartCount;
  const [fav, setFav] = favCount;
  const [heart, setHeart] = useState(false);

  const addToCart = async () => {
    const userDoc = await firestore().collection('Users').doc(user.uid).get();
    const userData = userDoc.data();
    const currentCart = userData.cart || [];

    const existingProductIndex = currentCart.findIndex(
      item => item.productTitle === title,
    );

    if (existingProductIndex !== -1) {
      currentCart[existingProductIndex].quantity += 1;
      currentCart[existingProductIndex].totalAmount = parseInt(currentCart[existingProductIndex].totalAmount) + parseInt(price);
    } else {
      const newItem = {
        productTitle: title,
        quantity: 1,
        totalAmount: price,
      };
      currentCart.push(newItem);
    }

    await firestore().collection('Users').doc(user.uid).update({
      cart: currentCart,
    });
    setCartItems(cartItems + 1);
    Alert.alert('Item added to cart successfully!');
  };

  useEffect(() => {
    const isFav = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        const userData = userDoc.data();
        const favoritesArray = userData.favorites || [];
        if (favoritesArray.includes(title)) {
          setHeart(true);
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    }
    isFav();
  }, [heart]);

  const addToFavorites = async () => {
    try {
      const userDoc = await firestore().collection('Users').doc(user.uid).get();
      const userData = userDoc.data();

      const favoritesArray = userData.favorites || [];

      if (!favoritesArray.includes(title)) {
        favoritesArray.push(title);
        await firestore().collection('Users').doc(user.uid).update({
          favorites: favoritesArray,
        });
        setFav(fav + 1);
        setHeart(true);
        Alert.alert("Success", "Added to favourites!");
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeToFavorites = async () => {
    try {
      const userDoc = await firestore().collection('Users').doc(user.uid).get();
      const userData = userDoc.data();
      const favoritesArray = userData.favorites || [];

      if (favoritesArray.includes(title)) {
        favoritesArray.pop(title);
        await firestore().collection('Users').doc(user.uid).update({
          favorites: favoritesArray,
        });
        setFav(fav - 1);
        setHeart(false);
        Alert.alert("Success", "Removed from favourites!");
      }
    } catch (error) {
      console.error('Error removing to favorites:', error);
    }
  };

  return (
    <TouchableOpacity
      style={{margin: 25}}
      onPress={() =>
        navigation.navigate('Product', {
          title: title,
        })
      }>
      {image != null ? (
        <ImageBackground
          source={{uri: image}}
          style={styles.backgroundImage}
          imageStyle={styles.uniqueImage}>
          <View style={styles.overlay}>
            <View style={[styles.textContainer, {paddingBottom: 150}]}>
              <View>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text2}>Rs: {price}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => addToCart()}>
                  <Icon name="shopping-cart" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => heart ? removeToFavorites() : addToFavorites()}>
                  <Icon name={heart ? "heart" : "heart-o"} size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textContainer}>
              <View style={{paddingTop: 20}}>
                <Text style={styles.insideText}>
                  {description.slice(0, 20)}
                </Text>
              </View>
              <TouchableOpacity style={{paddingTop: 20}}>
                <Text
                  style={[
                    styles.insideText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  DETAILS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    padding: 20,
    height: 350,
  },
  overlay: {
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    fontSize: 18,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
    borderColor: '#E29500',
    backgroundColor: '#E29500',
    alignItems: 'center',
    marginBottom: 10,
  },
  uniqueImage: {
    borderRadius: 20,
    borderColor: '#D4A065',
    borderWidth: 4,
  },
  textContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  insideText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CategoryCard;
