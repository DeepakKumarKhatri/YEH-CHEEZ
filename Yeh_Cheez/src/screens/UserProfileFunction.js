import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import UserMenuCard from '../components/atoms/UserMenuCard';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Context} from '../context/Context';
import React from 'react';

const UserProfileFunction = () => {
  const navigation = useNavigation();
  const {user, setUser} = React.useContext(Context);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cardSectionContainer}>
        <Image
          source={require('../assets/images/Rectangle7.png')}
          style={styles.userImage}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.containerText}>Mujtaba Khan</Text>
          <TouchableOpacity
            style={styles.iconHolder}
            onPress={() => {
              auth().signOut();
              setUser(null);
            }}>
            <Icon name="arrow-left" size={25} color="#2D4990" />
          </TouchableOpacity>
          <Text style={styles.containerText}>Balance: 28,390</Text>
        </View>
      </View>

      <View>
        <View>
          <Text style={styles.menuContainerHeading}>Profile</Text>
          <UserMenuCard
            cardTitle={'View Profile'}
            functionPressed={() => navigation.navigate('UserProfile')}
          />
          <UserMenuCard
            cardTitle={'Update Profile'}
            functionPressed={() => navigation.navigate('UserProfile')}
          />
          <UserMenuCard
            cardTitle={'Update Password'}
            functionPressed={() => navigation.navigate('ChangePassword')}
          />
        </View>

        <View>
          <Text style={styles.menuContainerHeading}>Bussiness</Text>
          <UserMenuCard
            cardTitle={'My Products'}
            functionPressed={() => navigation.navigate('MyProducts')}
          />
          <UserMenuCard
            cardTitle={'Add Product'}
            functionPressed={() => navigation.navigate('AddProducts')}
          />
          <UserMenuCard
            cardTitle={'Pending Orders'}
            functionPressed={() => navigation.navigate('OrdersPending')}
          />
          <UserMenuCard
            cardTitle={'Orders Done'}
            functionPressed={() => navigation.navigate('OrdersDone')}
          />
          <UserMenuCard
            cardTitle={'My Purchases'}
            functionPressed={() => navigation.navigate('Purchases')}
          />
        </View>

        <View>
          <Text style={styles.menuContainerHeading}>Analytics</Text>
          <UserMenuCard
            cardTitle={'Earning Chart'}
            functionPressed={() => navigation.navigate('EarningChart')}
          />
          <UserMenuCard
            cardTitle={'Orders Chart'}
            functionPressed={() => navigation.navigate('OrderAnalytics')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileFunction;

const styles = StyleSheet.create({
  cardSectionContainer: {flexDirection: 'row', padding: 10},
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: '#FFA800',
  },
  userInfoContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },
  containerText: {fontSize: 16, color: '#2D4990'},
  iconHolder: {alignSelf: 'flex-end'},
  menuContainerHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D4990',
    margin: 10,
    marginLeft: 20,
    marginTop: 15,
  },
});
