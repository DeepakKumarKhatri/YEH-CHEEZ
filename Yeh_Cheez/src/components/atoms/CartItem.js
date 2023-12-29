import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../../context/Context';
import { CartContext } from '../../screens/Cart';

const CartItem = ({title, quantity, price}) => {
  const [currentValue, setCurrentValue] = useState(quantity);
  const [productPrice, setProductPrice] = useState(price);
  const {userAuth, cartCount} = useContext(Context);
  const [cartItems, setCartItems] = cartCount;


  const {amount, items} = useContext(CartContext);

  const [totalAmount, setTotalAmount] = amount;
  const [cartTempItems, setCartTempItems] = items;

  const [user, setUser] = userAuth;
  
  const updateQuantityInFirestore = async (newQuantity) => {
    try {
      const userDoc = await firestore().collection('Users').doc(user.uid).get();
      const userData = userDoc.data();
      const currentCart = userData.cart;
      if (newQuantity === 0) {
        // If the new quantity is zero, remove the item from the cart
        const updatedCart = currentCart.filter(item => item.productTitle !== title);
        await firestore().collection('Users').doc(user.uid).update({
          cart: updatedCart,
        });
        setCartItems(cartItems - 1);
      } else {
      const productCollection = await firestore()
        .collection('Products')
        .where('productTitle', '==', title)
        .get();
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
          cart: currentCart.map(item =>
            item.productTitle === title ? {...item, quantity: newQuantity, totalAmount:  newQuantity * productCollection.docs[0].data().productPrice} : item,
          ),
        });
        setProductPrice(newQuantity * productCollection.docs[0].data().productPrice);
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        const userData = userDoc.data();
        const userCart = userData.cart || [];
        const cartTotalAmount = userCart.reduce((total, item) => total + (item.quantity * item.totalAmount), 0);
        setTotalAmount(cartTotalAmount);
        setCartTempItems(userCart);
      }
    } catch (error) {
      console.error('Error updating quantity in Firestore:', error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.tableContentRow}>{title}</Text>

      <View style={styles.iconParent}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            const newQuantity = currentValue >= 1 ? currentValue - 1 : 0;
            setCurrentValue(newQuantity);
            updateQuantityInFirestore(newQuantity);
            setCartItems(cartItems - 1);
          }}>
          <Icon name="minus" size={16} color="white" />
        </TouchableOpacity>

        <Text
          style={[styles.tableContentRow, {paddingRight: 8, paddingLeft: 8}]}>
          {currentValue}
        </Text>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            const newQuantity = currentValue + 1;
            setCurrentValue(newQuantity);
            updateQuantityInFirestore(newQuantity);
            setCartItems(cartItems + 1);
          }}>
          <Icon name="plus" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.tableContentRow, {color: '#E29500'}]}>
        {productPrice}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContentRow: {fontSize: 18, color: '#2D4990'},
  iconContainer: {backgroundColor: '#E29500', padding: 5, borderRadius: 20},
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconParent: {flexDirection: 'row', justifyContent: 'flex-end'},
});

export default CartItem;
