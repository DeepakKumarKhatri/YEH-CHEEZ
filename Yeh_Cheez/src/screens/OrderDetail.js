import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderDetailItem from '../components/atoms/OrderDetailItem';

const OrderDetail = ({route}) => {
  const [id, setID] = useState('');
  const [items, setItems] = useState(0);
  const [amount, setAmount] = useState(0);
  const props = route.params.props;
  useEffect(() => {
    const calculateSum = (inputObject) => {
      let sumQuantities = 0;
      let sumTotalAmounts = 0;
      let concatenatedTitles = "";
    
      // Iterate over the object keys
      Object.keys(inputObject).forEach((key) => {
        if (key != 'shipped') {
          const item = inputObject[key];
          sumQuantities += item.quantity;
          sumTotalAmounts += parseInt(item.totalAmount, 10); // Convert totalAmount to integer for summation
          concatenatedTitles += item.productTitle + " ";
        }
      });
      setID(concatenatedTitles.trim());
      setAmount(sumTotalAmounts);
      setItems(sumQuantities)
    
      return {
        sumQuantities,
        sumTotalAmounts,
        concatenatedTitles: concatenatedTitles.trim(), // Trim to remove extra space at the end
      };
    };
    calculateSum(props);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View
          style={{margin: 20, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.title}>ORDER ID: </Text>
          <Text style={[styles.title, {color: '#E29500'}]}>{id}</Text>
        </View>

        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.footerText1}>Items</Text>
            <Text style={styles.footerText1}>Rs</Text>
          </View>
          <View>
            <Text style={styles.footerText2}>{items}</Text>
            <Text style={styles.footerText2}>{amount}</Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.initialHeader}>
            <Text style={styles.tableHeaderRow}>Name</Text>
            <Text style={styles.tableHeaderRow}>Quantity</Text>
            <Text style={styles.tableHeaderRow}>Price</Text>
          </View>

          {Object.keys(props).map((key) => <OrderDetailItem prop={props[key]}  />)}

        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;

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
    marginBottom: 15
  },
});
