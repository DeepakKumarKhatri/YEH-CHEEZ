import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const MyProducts = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'MY PRODUCTS',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'white',
        height: 80,
      },
      headerTintColor: '#2D4990', 
      headerTitleStyle: {
        fontSize: 32,
        color: '#2D4990',
      },
    });
  }, [navigation]);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4, 6]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = useState([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    fetchProducts(); 
  }, [itemsPerPage]);

  const handleDeleteProduct = async (title) => {
    try {
      const querySnapshot = await firestore()
        .collection('Products')
        .where('productTitle', '==', title)
        .get();

      if (!querySnapshot.empty) {
        const documentId = querySnapshot.docs[0].id;

        await firestore().collection('Products').doc(documentId).delete();

        Alert.alert('Success', `Product deleted successfully`);
        fetchProducts(); 
      } else {
        console.warn('Product not found');
      }
    } catch (err) {
      Alert.alert('Error', 'Product not deleted');
    }
  };

  const fetchProducts = async () => {
    try {
      const productsCollection = await firestore().collection('Products').get();
      const products = [];

      productsCollection.docs.forEach(doc => {
        const productData = doc.data();
        products.push({
          id: doc.id,
          ...productData,
        });
      });

      setItems(products); 
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{color: '#2D4990'}}>
            Title
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Price
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Quantity
          </DataTable.Title>
          <DataTable.Title textStyle={{color: '#2D4990'}} numeric>
            Actions
          </DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell textStyle={{color: '#2D4990'}}>
              {item.productTitle}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {item.productPrice}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {item.productQunatity}
            </DataTable.Cell>
            <DataTable.Cell style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={[styles.roundIcon, styles.editIcon]}
                onPress={() =>
                  navigation.navigate('UpdateProduct', {
                    title: item.productTitle,
                    price: item.productPrice,
                    quantity: item.productQunatity,
                    description: item.productDescription,
                    category: item.productCateogory,
                  })
                }>
                <Icon name="pencil" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              {'     '}
              <TouchableOpacity
                style={[styles.roundIcon, styles.delIcon]}
                onPress={() => handleDeleteProduct(item.productTitle)}>
                <Icon name="trash" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
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

export default MyProducts;
