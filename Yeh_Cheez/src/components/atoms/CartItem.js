import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export const CartItem = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [productPrice, setProductPrice] = useState(400);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.tableContentRow}>Item1</Text>
      <View style={styles.iconParent}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() =>
            currentValue >= 1 ? setCurrentValue(currentValue - 1) : 0
          }>
          <Icon name="minus" size={16} color="white" />
        </TouchableOpacity>
        <Text
          style={[styles.tableContentRow, {paddingRight: 8, paddingLeft: 8}]}>
          {currentValue}
        </Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setCurrentValue(currentValue + 1);
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
  iconParent: {flexDirection: 'row'},
});
