import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React from 'react';
import CartItem from '../components/atoms/CartItem';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={headerStyle.headerTitle}>CART</Text>,
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
      <View style={styles.mainContainer}>
        <View style={{margin: 20}}>
          <Text style={styles.title}>YOUR CART</Text>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.initialHeader}>
            <Text style={styles.tableHeaderRow}>Name</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.tableHeaderRow}>Quantity</Text>
            <Text style={[styles.tableHeaderRow,{paddingLeft:75}]}>Price</Text>
            </View>
          </View>

          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </View>

        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.footerText1}>Items</Text>
            <Text style={styles.footerText1}>Rs</Text>
          </View>
          <View>
            <Text style={styles.footerText2}>7</Text>
            <Text style={styles.footerText2}>10,000</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  tableHeaderRow: {fontSize: 18, color: '#2D4990', fontWeight: 'bold'},
  footerText1: {fontSize: 17, color: '#2D4990', fontWeight: 'bold'},
  footerText2: {fontSize: 17, color: '#E29500', fontWeight: 'bold'},
  mainContainer: {
    borderWidth: 2,
    borderColor: '#D4A065',
    borderRadius: 20,
    padding: 15,
    marginTop: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D4990',
    textAlign: 'center',
  },
  itemContainer: {borderWidth: 2, borderColor: '#D4A065', padding: 10},
  initialHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonContainer: {alignSelf: 'flex-end'},
  button: {
    backgroundColor: '#FFA800',
    width: '30%',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {color: 'white', fontSize: 15, textAlign: 'center'},
});

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
