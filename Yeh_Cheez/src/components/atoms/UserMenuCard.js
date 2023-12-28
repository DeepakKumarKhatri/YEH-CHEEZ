import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const UserMenuCard = ({cardTitle, functionPressed}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={functionPressed}>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{cardTitle}</Text>
        <Icon name="angle-right" size={25} color="#2D4990" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#D4A065',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  cardBody: {flexDirection: 'row', justifyContent: 'space-between'},
  cardTitle: {fontSize: 16, color: '#2D4990'},
});

export default UserMenuCard;