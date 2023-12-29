import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import Banner from '../components/atoms/Banner';
import Content from '../components/organism/Content';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Badge} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { Context } from '../context/Context';
import firestore from '@react-native-firebase/firestore';

const Dashboard = () => {
  const {userAuth, cartCount, favCount} = useContext(Context);
  const [cartItems, setCartItems] = cartCount;
  const [user, setUser] = userAuth;
  const [fav, setFav] = favCount;
  const navigation = useNavigation();

  useEffect(() => {
    const setCart = async () => {
      const userDoc = await firestore().collection('Users').doc(user.uid).get();
      const userData = userDoc.data();
      const currentCart = userData.cart || [];
      const currentFav = userData.favorites || [];
      const totalQuantity = currentCart.reduce((total, item) => total + item.quantity, 0);
      setCartItems(totalQuantity);
      setFav(currentFav.length);
    } 
    setCart();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>YEH-CHEEZ</Text>,
      headerTitleAlign: 'center',
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <Content />
      </ScrollView>
    </SafeAreaView>
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

export default Dashboard;
