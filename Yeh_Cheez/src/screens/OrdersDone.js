import {useNavigation} from '@react-navigation/native';
import {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/Context';
import TableRow from '../components/molecules/TableRow';

const OrdersDone = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'ORDERS DONE',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'white',
        height: 80,
      },
      headerTintColor: '#2D4990', 
      headerTitleStyle: {
        fontSize: 28,
        color: '#2D4990',
      }
    });
  }, [navigation]);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4, 6]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = useState([]);

  const {userAuth, favCount} = useContext(Context);
    const [user, setUser] = userAuth;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          await getOrders();
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }, [orders]);

    const getOrders = async () => {
        try {

          const userDoc = await firestore().collection('Users').doc(user.uid).get();
          const userData = userDoc.data();
          let userPruchases = userData.sales || [];
          console.log(userPruchases)
          userPruchases = userPruchases.filter((item) => {
            return item.shipped
          })
          setItems(userPruchases);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
    };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ScrollView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{color: '#2D4990'}}>
            Order ID
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Amount
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Items
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Date
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Actions
          </DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item, index) => (
          <TableRow props={item} index={index} />
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </ScrollView>
  );
};

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

export default OrdersDone;
