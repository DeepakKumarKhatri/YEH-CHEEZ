import {Text, Button} from 'react-native-paper';
import TitleCard from '../atoms/TitleCard';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

const CategoryRow = ({title}) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getProducts();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const getProducts = async () => {
    const productCollection = await firestore()
      .collection('Products')
      .where('productCateogory', '==', title)
      .get();
      setProducts(productCollection.docs.map(doc => doc.data()));
  };
  return (
    <>
    {products.length == 0 ? 
    <></>
    :
    <View>
      <View style={styles.titleRow}>
        <Text variant="displaySmall" style={styles.heading}>
          {title}
        </Text>
        <Button mode="text" onPress={() => navigation.navigate('Category', {
          category: title
        })}>
          <Text style={styles.btnText}>View More </Text>
          <Icon name="angle-right" size={14} color="#2D4990" />
          <Icon name="angle-right" size={14} color="#2D4990" />
        </Button>
      </View>
      <View style={styles.content}>
        {products.length != 0 ? 
        <FlatList
          data={products}
          renderItem={({item}) => (
            <TitleCard
              title={item.productTitle}
              price={item.productPrice}
              rating={3}
              image={item.image}
            />
          )}
          keyExtractor={item => item.productTitle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        :null}
      </View>
    </View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D4990',
  },
  content: {
    marginHorizontal: 5,
    marginBottom: 20,
  },
  btnText: {
    color: '#2D4990',
  },
});

export default CategoryRow;
