import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const SearchProductCard = () => {
  const navigation = useNavigation();
  const BUTTONNAME = 'View More>>';

  return (
    <TouchableOpacity
      style={{flexDirection: 'row', marginTop: 10}}
      onPress={() => navigation.navigate('Product')}>
      <Image
        source={require('../../assets/images/Rectangle7.png')}
        style={styles.productImage}
      />
      <View style={{marginLeft: 15}}>
        <Text style={styles.productTitle}>LAWRENCEPUR</Text>
        <Text style={styles.productPrice}>Rs: 10,000</Text>
        <TouchableOpacity>
          <Text style={styles.button}>{BUTTONNAME}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="shopping-cart" size={15} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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

export default SearchProductCard;
