import {FlatList} from 'react-native';
import OrderItem from '../components/molecules/OrderItem';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

const item = {
  id: '643545',
  amount: 1000,
  noOfItems: 3,
  date: '12/11/2023',
};
const items = [
  {
    id: '643545',
    amount: 1000,
    noOfItems: 3,
    date: '12/11/2023',
  },
  {
    id: '643543',
    amount: 1000,
    noOfItems: 3,
    date: '12/11/2023',
  },
  {
    id: '643523',
    amount: 1000,
    noOfItems: 3,
    date: '12/11/2023',
  },
  {
    id: '622545',
    amount: 1000,
    noOfItems: 3,
    date: '12/11/2023',
  },
  {
    id: '543545',
    amount: 1000,
    noOfItems: 3,
    date: '12/11/2023',
  },
  {
    id: '223545',
    amount: 1000,
    noOfItems: 3,
    date: '12/11/2023',
  },
];

const OrdersPending = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'ORDERS PENDING',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'white',
        height: 80,
      },
      headerTintColor: '#2D4990',
      headerTitleStyle: {
        fontSize: 28,
        color: '#2D4990',
      },
    });
  }, [navigation]);
  return (
    <FlatList
      data={items}
      renderItem={({item}) => <OrderItem props={item} button={1} />}
      keyExtractor={item => item.id}
    />
  );
};

export default OrdersPending;
