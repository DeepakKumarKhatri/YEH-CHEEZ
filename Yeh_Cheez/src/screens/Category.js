import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CategoryCard from '../components/atoms/CategoryCard';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { Context } from '../context/Context';

const Category = ({route}) => {
  const {cartCount, favCount} = useContext(Context);
  const [cartItems, setCartItems] = cartCount;
  const [fav, setFav] = favCount;
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([{}]);
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getProducts();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const getProducts = async () => {
    const productCollection = await firestore()
      .collection('Products')
      .where('productCateogory', '==', route.params.category)
      .get();
    setProducts(productCollection.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>{route.params.category}</Text>,
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon
            name="arrow-left"
            size={30}
            color="#2D4990"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Badge>{cartItems}</Badge>
            <Icon
              name="shopping-cart"
              size={30}
              color="#2D4990"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
            <Badge>{fav}</Badge>
            <Icon
              name="heart-o"
              size={30}
              color="#2D4990"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ),
      contentStyle: {
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#D4A065',
      },
      headerShadowVisible: false,
    });
  }, [navigation, cartItems, fav]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {products.map(product => (
        <CategoryCard
          id={product.productTitle}
          title={product.productTitle}
          price={product.productPrice}
          description={product.productDescription}
          category={product.productCateogory}
          image={product.image}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E29500',
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D4990',
    padding: 25,
  },
  headerRight: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
});
export default Category;
