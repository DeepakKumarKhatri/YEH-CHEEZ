import {Text, Button} from 'react-native-paper';
import TitleCard from '../atoms/TitleCard';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const products = [
  {
    id: 1,
    title: 'LAWRENCEPUR1',
    price: '1000',
    rating: 5,
    image: require('../../assets/images/suit.png'),
  },
  {
    id: 2,
    title: 'LAWRENCEPUR2',
    price: '1000',
    rating: 4,
    image: require('../../assets/images/suit.png'),
  },
  {
    id: 3,
    title: 'LAWRENCEPUR3',
    price: '1000',
    rating: 5,
    image: require('../../assets/images/suit.png'),
  },
  {
    id: 4,
    title: 'LAWRENCEPUR4',
    price: '1000',
    rating: 5,
    image: require('../../assets/images/suit.png'),
  },
  {
    id: 5,
    title: 'LAWRENCEPUR5',
    price: '1000',
    rating: 5,
    image: require('../../assets/images/suit.png'),
  },
];
const CategoryRow = ({title}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.titleRow}>
        <Text variant="displaySmall" style={styles.heading}>
          {title}
        </Text>
        <Button mode="text" onPress={() => navigation.navigate('Category')}>
          <Text style={styles.btnText}>View More </Text>
          <Icon name="angle-right" size={14} color="#2D4990" />
          <Icon name="angle-right" size={14} color="#2D4990" />
        </Button>
      </View>
      <View style={styles.content}>
        <FlatList
          data={products}
          renderItem={({item}) => (
            <TitleCard
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
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
