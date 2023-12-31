import {useNavigation} from '@react-navigation/native';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useContext, useState, useEffect} from 'react';
import {Context} from '../../context/Context';
import firestore from '@react-native-firebase/firestore';

const OrderItem = ({props, button, index}) => {
  const navigation = useNavigation();
  const {userAuth, favCount} = useContext(Context);
  const [user, setUser] = userAuth;
  const [id, setID] = useState('');
  const [items, setItems] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const calculateSum = inputObject => {
      let sumQuantities = 0;
      let sumTotalAmounts = 0;
      let concatenatedTitles = '';

      Object.keys(inputObject).forEach(key => {
        if (key != 'shipped') {
          const item = inputObject[key];
          sumQuantities += item.quantity;
          sumTotalAmounts += parseInt(item.totalAmount, 10);
          concatenatedTitles += item.productTitle + ' ';
        }
      });
      setID(concatenatedTitles.trim());
      setAmount(sumTotalAmounts);
      setItems(sumQuantities);

      return {
        sumQuantities,
        sumTotalAmounts,
        concatenatedTitles: concatenatedTitles.trim(),
      };
    };

    calculateSum(props);
  }, []);

  const markShipped = async () => {
    const userDoc = await firestore().collection('Users').doc(user.uid).get();
    const userData = userDoc.data();
    const sales = userData.sales || [];
    sales[index].shipped = true;
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        sales: sales,
      });
      Alert.alert("Success", "Mark Shipped!");
  };

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.heading, styles.normalColor]}>
        OrderID: <Text style={styles.focusColor}>{id}</Text>
      </Text>
      <View style={styles.container}>
        <View>
          <Text style={[styles.normalColor, styles.margins]}>
            Rs: <Text style={styles.focusColor}>{amount}</Text>
          </Text>
          <Text style={[styles.normalColor, styles.margins]}>
            Items: <Text style={styles.focusColor}>{items}</Text>
          </Text>
          <Text style={[styles.normalColor, styles.margins]}>
            Date: <Text style={styles.focusColor}>{currentDate}</Text>
          </Text>
        </View>
        {button == 1 ? (
          <View style={styles.buttonsView}>
            <View style={styles.capSmall}>
              <Text style={styles.whiteText}>Pending</Text>
            </View>
            <TouchableOpacity
              style={styles.capLarger}
              onPress={() => markShipped()}>
              <Text style={styles.whiteText}>Mark Shipped</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
      {button == 0 ? (
        <TouchableOpacity
          style={styles.detailsView}
          onPress={() =>
            navigation.navigate('OrderDetail', {
              index: index,
              props: props,
            })
          }>
          <Text style={[styles.normalColor, styles.underLine]}>
            View Details <Icon name="angle-right" size={14} color="#2D4990" />
            <Icon name="angle-right" size={14} color="#2D4990" />
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 2,
    borderColor: '#D4A065',
    borderRadius: 8,
    padding: 14,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  focusColor: {
    color: '#E29500',
  },
  normalColor: {
    color: '#2D4990',
  },
  whiteText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  margins: {
    marginBottom: 15,
  },
  capSmall: {
    backgroundColor: '#FF3636',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 3,
    margin: 5,
    marginBottom: 15,
    width: '70%',
    alignSelf: 'flex-end',
  },
  capLarger: {
    backgroundColor: '#FFA800',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    elevation: 20,
    shadowColor: '#000000',
  },
  detailsView: {
    alignItems: 'center',
  },
  underLine: {
    textDecorationLine: 'underline',
  },
});

export default OrderItem;
