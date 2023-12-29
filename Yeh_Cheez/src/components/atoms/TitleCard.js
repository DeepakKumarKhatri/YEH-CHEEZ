import {StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {Context} from '../../context/Context';

const TitleCard = ({title, price, rating, image}) => {
  const navigation = useNavigation();
  const {userAuth, cartCount} = useContext(Context);
  const [user, setUser] = userAuth;
  const [cartItems, setCartItems] = cartCount;

  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Icon name="star" size={18} color="#ffd213" />);
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Product', {
          title: title,
        })
      }>
      {image != null ? (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      ) : null}

      <View style={styles.textContainer}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.text}>
          Rs: <Text style={styles.priceNum}>{price}</Text>
        </Text>
        <Text style={styles.textRating}>Rating: {rating}</Text>
        <View style={styles.icons}>
          <View style={styles.rating}>{stars.map(s => s)}</View>
          <TouchableOpacity style={styles.cartIcon} onPress={() => addToCart()}>
            <Icon name="shopping-cart" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA800',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    width: 154,
    marginHorizontal: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    padding: 5,
  },
  heading: {
    marginTop: 5,
    fontSize: 14,
    color: '#2D4990',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: '#2D4990',
  },
  textRating: {
    marginTop: 5,
    fontSize: 12,
    color: '#2D4990',
  },
  priceNum: {
    color: '#FFA800',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartIcon: {
    backgroundColor: '#FFA800',
    borderRadius: 40,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TitleCard;
