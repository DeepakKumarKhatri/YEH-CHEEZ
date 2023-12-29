import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import DetailContent from '../components/atoms/DetailContent';
import CategoryRow from '../components/molecules/CategoryRow';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../context/Context';

const Product = ({route}) => {
  const {cartCount, favCount} = useContext(Context);
  const [cartItems, setCartItems] = cartCount;
  const [fav, setFav] = favCount;
  const navigation = useNavigation();
  const [product, setProduct] = useState({});
  const data = route.params.title;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getProduct();
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [data]);
  const getProduct = async () => {
    const productCollection = await firestore()
      .collection('Products')
      .where('productTitle', '==', route.params.title)
      .get();
    setProduct(productCollection.docs[0].data());
  };


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={headerStyle.headerTitle}>Product</Text>,
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={30}
            color="#2D4990"
            style={headerStyle.icon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={headerStyle.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Badge>{cartItems}</Badge>
            <Icon
              name="shopping-cart"
              size={30}
              color="#2D4990"
              style={headerStyle.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
            <Badge>{fav}</Badge>
            <Icon
              name="heart-o"
              size={30}
              color="#2D4990"
              style={headerStyle.icon}
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
    <ScrollView>
      {product != null ? (
        <View style={styles.container}>
          <View style={styles.banner}>
            {product.image != null ? (
              <Image
                style={{width: '100%', height: 250}}
                borderradius="10"
                resizemode="cover"
                source={{uri: product.image}}
              />
            ) : null}
          </View>
          <DetailContent
            title={product.productTitle}
            price={product.productPrice}
            description={product.productDescription}
          />
          {product.productCateogory != undefined ? (
            <CategoryRow title={product.productCateogory} />
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  banner: {
    borderWidth: 2,
    borderColor: '#D4A065',
  },
});

export default Product;

const headerStyle = StyleSheet.create({
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
