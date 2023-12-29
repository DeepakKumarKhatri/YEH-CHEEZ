import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const CartItem = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [productPrice, setProductPrice] = useState(400);
  const maxLength = 10;
  const itemName =
    'Item with a very long name that may cause disturbance in layout';

  const truncatedName =
    itemName.length > maxLength
      ? itemName.substring(0, maxLength) + '...'
      : itemName;

  const formattedPrice = formatNumber(productPrice);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.tableContentRow}>{truncatedName}</Text>
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
        {formattedPrice}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContentRow: {fontSize: 14, color: '#2D4990'},
  iconContainer: {backgroundColor: '#E29500', padding: 5, borderRadius: 20},
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconParent: {flexDirection: 'row'},
});

const formatNumber = num => {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else {
    return num.toString();
  }
};

export default CartItem;
