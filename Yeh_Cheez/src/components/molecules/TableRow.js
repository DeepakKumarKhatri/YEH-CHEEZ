import {DataTable} from 'react-native-paper';
import {useContext, useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {Context} from '../../context/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const TableRow = ({props, index}) => {
    const navigation =  useNavigation();
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

      const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
    
    return(
        <DataTable.Row key={id}>
            <DataTable.Cell textStyle={{color: '#2D4990'}}>
              {id}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {amount}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {items}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {currentDate}
            </DataTable.Cell>
            <DataTable.Cell style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={[styles.roundIcon, styles.editIcon]}
                onPress={() =>
                    navigation.navigate('OrderDetail', {
                      index: index,
                      props: props,
                    })
                  }>
                <Icon name="eye" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
    );
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: '#F4F4F4',
    },
    roundIcon: {
      borderRadius: 50,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIcon: {
      backgroundColor: '#FFA800',
    },
    delIcon: {
      backgroundColor: '#FF3636',
    },
  });

export default TableRow;
