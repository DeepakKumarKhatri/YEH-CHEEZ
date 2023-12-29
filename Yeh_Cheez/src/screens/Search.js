import {ScrollView} from 'react-native';
import SearchProductCard from '../components/atoms/SearchProductCard';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Search = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={headerStyle.headerTitle}>SEARCH</Text>,
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={30}
            color="#2D4990"
            style={headerStyle.icon}
          />
        </TouchableOpacity>
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
      <SearchProductCard />
      <SearchProductCard />
      <SearchProductCard />
      <SearchProductCard />
      <SearchProductCard />
      <SearchProductCard />
      <SearchProductCard />
    </ScrollView>
  );
};

export default Search;

const headerStyle = StyleSheet.create({
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
