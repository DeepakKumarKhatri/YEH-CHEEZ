import {ScrollView, StyleSheet} from 'react-native';
import CategoryRow from '../molecules/CategoryRow';

const Content = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollBottom}
      showsVerticalScrollIndicator={false}>
      <CategoryRow title={'Tailor1'} />
      <CategoryRow title={'Tailor2'} />
      <CategoryRow title={'Tailor3'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  scrollBottom: {
    paddingBottom: 30,
  },
});

export default Content;
