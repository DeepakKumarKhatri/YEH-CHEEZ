import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import CategoryCard from '../components/atoms/CategoryCard';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Category = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>YEH-CHEEZ</Text>,
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon
            name="arrow-left"
            size={30}
            color="#2D4990"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Badge>0</Badge>
            <Icon
              name="shopping-cart"
              size={30}
              color="#2D4990"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
            <Badge>0</Badge>
            <Icon
              name="heart-o"
              size={30}
              color="#2D4990"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ),
      contentStyle: {
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#D4A065',
      },
      headerShadowVisible: false,
    });
  }, [navigation]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E29500',
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D4990',
    padding: 25,
  },
  headerRight: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
});
export default Category;
