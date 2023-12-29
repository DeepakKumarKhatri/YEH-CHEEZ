import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CategoryCard from '../components/atoms/CategoryCard';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/Context';

const Favourites = () => {
  const navigation = useNavigation();
  const {userAuth, favCount} = useContext(Context);
  const [user, setUser] = userAuth;
  const [fav, setFav] = favCount;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts();
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProducts();
  }, [fav]);

  const getProducts = async () => {
    try {
      const productCollection = await firestore().collection('Products').get();
      const products = productCollection.docs.map(doc => doc.data());
      const userDoc = await firestore().collection('Users').doc(user.uid).get();
      const userData = userDoc.data();
      const userFavorites = userData.favorites || [];
      const favoriteProducts = products.filter(product =>
        userFavorites.includes(product.productTitle),
      );
      setProducts(favoriteProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={headerStyle.headerTitle}>FAVOURITES</Text>
      ),
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

      contentStyle: {
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#D4A065',
      },
      headerShadowVisible: false,
    });
  }, [navigation]);
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

export default Favourites;

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
