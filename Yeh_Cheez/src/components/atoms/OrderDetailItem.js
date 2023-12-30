import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const OrderDetailItem = ({prop}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.tableContentRow}>{prop.productTitle}</Text>
      <View style={styles.iconParent}>
        <Text
          style={[styles.tableContentRow, {paddingRight: 8, paddingLeft: 8}]}>
          {prop.quantity}
        </Text>
      </View>
      <Text style={[styles.tableContentRow, {color: '#E29500'}]}>
      {prop.totalAmount}
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
  iconParent: {flexDirection: 'row'},
});

export default OrderDetailItem;
