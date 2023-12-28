import {ScrollView} from 'react-native';
import SearchProductCard from '../components/atoms/SearchProductCard';

const Search = () => {
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
