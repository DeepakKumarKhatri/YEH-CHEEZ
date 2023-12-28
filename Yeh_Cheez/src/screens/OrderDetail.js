import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import OrderDetailItem from '../components/atoms/OrderDetailItem';

const OrderDetail = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View
          style={{margin: 20, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.title}>ORDER ID: </Text>
          <Text style={[styles.title, {color: '#E29500'}]}>3532</Text>
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

        <View style={styles.itemContainer}>
          <View style={styles.initialHeader}>
            <Text style={styles.tableHeaderRow}>Name</Text>
            <Text style={styles.tableHeaderRow}>Quantity</Text>
            <Text style={styles.tableHeaderRow}>Price</Text>
          </View>

          <OrderDetailItem />
          <OrderDetailItem />
          <OrderDetailItem />
          <OrderDetailItem />
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
