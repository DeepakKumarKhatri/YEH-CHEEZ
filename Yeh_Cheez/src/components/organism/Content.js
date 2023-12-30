import {View, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import CategoryRow from '../molecules/CategoryRow';
import firestore from '@react-native-firebase/firestore';

const Content = () => {
  const [categoryItems, setCategoryItems] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategoryItems(Object.keys(categories).map(key => categories[key]));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getCategories = async () => {
    const categoriesCollection = await firestore()
      .collection('Categories')
      .doc('gLAfJhT9wlonzeYb2ov6')
      .get();
    return categoriesCollection._data;
  };
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.scrollBottom}
      showsVerticalScrollIndicator={false}>
      {categoryItems.map((category, index) => <CategoryRow title={category} id={index} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    paddingTop: 30,
    minHeight: 450
  },
  scrollBottom: {
    paddingBottom: 30,
  },
});

export default Content;
