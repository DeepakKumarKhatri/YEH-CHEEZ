import React from 'react';
import {ScrollView} from 'react-native';
import CategoryCard from '../components/atoms/CategoryCard';

const Category = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </ScrollView>
  );
};

export default Category;
