import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const TitleCard = ({title, price, rating, image}) => {
    const navigation = useNavigation();
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Icon name="star" size={18} color="#ffd213" />);
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Product')}>
      <Image style={styles.image} source={image} />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.text}>
          Rs: <Text style={styles.priceNum}>{price}</Text>
        </Text>
        <Text style={styles.textRating}>Rating: {rating}</Text>
        <View style={styles.icons}>
          <View style={styles.rating}>{stars.map(s => s)}</View>
          <View style={styles.cartIcon}>
            <Icon name="shopping-cart" size={18} color="#FFFFFF" />
          </View>
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
