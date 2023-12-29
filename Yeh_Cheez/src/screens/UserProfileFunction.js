import React, {useState, useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Context} from '../context/Context';

const UserProfileFunction = () => {
  const [userName, setUserName] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [userProfileImage, setUserProfileImage] = useState(
    require('../assets/images/defaultuser.png'),
  );
  const navigation = useNavigation();
  const {user, setUser} = React.useContext(Context);

  useEffect(() => {
    fetchUserProfile();
  });

  const fetchUserProfile = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore()
          .collection('Users')
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserName(userData.firstName + ' ' + userData.lastName || '');
          setUserBalance(userData.balance);

          const profileImageRef = storage().ref(`ProfileImages/${user.uid}`);
          const url = await profileImageRef.getDownloadURL();
          setUserProfileImage({uri: url});
        } else {
          console.warn('User document not found');
        }
      } else {
        console.warn('User not authenticated');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cardSectionContainer}>
        <Image source={userProfileImage} style={styles.userImage} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.containerText}>{userName}</Text>
          <TouchableOpacity
            style={styles.iconHolder}
            onPress={() => {
              auth().signOut();
              setUser(null);
            }}>
            <Icon name="arrow-left" size={25} color="#2D4990" />
          </TouchableOpacity>
          <Text style={styles.containerText}>Balance: {userBalance}</Text>
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
            functionPressed={() => navigation.navigate('UpdateProfile')}
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
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'MyProducts'})
            }
          />
          <UserMenuCard
            cardTitle={'Add Product'}
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'AddProducts'})
            }
          />
          <UserMenuCard
            cardTitle={'Pending Orders'}
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'OrdersPending'})
            }
          />
          <UserMenuCard
            cardTitle={'Orders Done'}
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'OrdersDone'})
            }
          />
          <UserMenuCard
            cardTitle={'My Purchases'}
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'Purchases'})
            }
          />
        </View>

        <View>
          <Text style={styles.menuContainerHeading}>Analytics</Text>
          <UserMenuCard
            cardTitle={'Earning Chart'}
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'EarningChart'})
            }
          />
          <UserMenuCard
            cardTitle={'Orders Chart'}
            functionPressed={() =>
              navigation.navigate('DrawerNavigator', {screen: 'OrderAnalytics'})
            }
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
