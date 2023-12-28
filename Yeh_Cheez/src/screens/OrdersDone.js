import {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrdersDone = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4, 6]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const [items] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

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
          <DataTable.Row key={item.key}>
            <DataTable.Cell textStyle={{color: '#2D4990'}}>
              {item.name}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {item.calories}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{color: '#2D4990'}} numeric>
              {item.fat}
            </DataTable.Cell>
            <DataTable.Cell style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity style={[styles.roundIcon, styles.editIcon]}>
                <Icon name="eye" size={20} color="#FFFFFF" />
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

export default OrdersDone;
