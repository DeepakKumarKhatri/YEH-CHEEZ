import {StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import {Context} from '../../context/Context';

const DetailContent = ({title, price, description}) => {
  const {userAuth, cartCount, favCount} = useContext(Context);
  const [user, setUser] = userAuth;
  const [cartItems, setCartItems] = cartCount;
  const [fav, setFav] = favCount;
  const [heart, setHeart] = useState(false);
  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<Icon name="star" size={24} color="#ffd213" />);
  }
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
    <View style={styles.textContainer}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.text}>
        Rs: <Text style={styles.priceNum}>{price}</Text>
      </Text>
      <Text style={styles.textRating}>{description}</Text>
      <View style={styles.icons}>
        <View>
          <Text style={styles.textRating}>Rating: 5</Text>
          <View style={styles.rating}>{stars.map(s => s)}</View>
        </View>
        <View style={styles.iconInner}>
          <TouchableOpacity style={styles.cartIcon} onPress={() => addToCart()}>
            <Icon name="shopping-cart" size={32} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon} onPress={() => heart ? removeToFavorites() : addToFavorites()}>
            <Icon name={heart ? "heart" : "heart-o"} size={32} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.cartIcon}>
            <Icon name="download" size={32} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 20,
  },
  heading: {
    marginTop: 5,
    fontSize: 24,
    color: '#2D4990',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
    fontSize: 20,
    color: '#2D4990',
  },
  textRating: {
    marginTop: 5,
    fontSize: 16,
    color: '#2D4990',
  },
  priceNum: {
    color: '#FFA800',
  },
  rating: {
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  cartIcon: {
    backgroundColor: '#FFA800',
    borderRadius: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  iconInner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default DetailContent;
