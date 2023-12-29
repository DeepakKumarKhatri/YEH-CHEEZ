import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/Context';
import { useNavigation } from '@react-navigation/native';

const Checkout = ({route}) => {
  const {userAuth, cartCount} = useContext(Context);
  const [user, setUser] = userAuth;
  
  const [cartItems, setCartItems] = cartCount;
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [comm, setComm] = useState('');
  const navigation = useNavigation();

  const date = new Date();
  

  const placeOrder = async () => {
    if (address != '' && phone != '' && comm != '') {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        const userData = userDoc.data();
        const currentBalance = userData.balance;
        const currentOrder = userData.cart;
        const purcheses = userData.purcheses || [];
        purcheses.push({...currentOrder});
        await firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
          balance: parseInt(currentBalance) + parseFloat(comm),
          cart : [],
          purcheses: purcheses
        });
        setCartItems(0);
        navigation.navigate("CheckOutModal");
    } else {
      Alert.alert('Error', 'Please fill fields!');
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#D4A065',
      placeholder: 'black',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.inputBoxesContainer}>
        <TextInput
          mode="outlined"
          label="Address"
          placeholder="Address"
          onChangeText={text => setAddress(text)}
          value={address}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Phone number"
          placeholder="Phone number"
          onChangeText={text => setPhone(text)}
          value={phone}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Your Commission"
          placeholder="Your Commission"
          onChangeText={text => setComm(text)}
          value={comm}
          style={styles.inputBox}
        />
        <View style={styles.amountCont}>
          <Text style={styles.textC1}>Total Amount</Text>
          <Text style={styles.textC2}>{route.params.amount}</Text>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={placeOrder}>
              <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  inputBoxesContainer: {
    borderWidth: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FFA800',
    padding: 10,
    marginBottom: 100,
  },
  inputBox: {
    fontWeight: 'bold',
    width: '98%',
  },
  buttonContainer: {alignSelf: 'flex-end'},
  button: {
    backgroundColor: '#FFA800',
    width: '40%',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {color: 'white', fontSize: 15, textAlign: 'center'},
  textC1: {
    color: '#2D4990',
    fontSize: 18,
  },
  textC2: {
    color: '#FFA800',
    fontSize: 18,
  },
  amountCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
});
