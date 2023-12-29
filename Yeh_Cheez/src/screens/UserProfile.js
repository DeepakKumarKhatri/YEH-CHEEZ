import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const UpdateProfile = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={headerStyle.headerTitle}>VIEW PROFILE</Text>
      ),
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userImage, setUserImage] = useState(
    require('../assets/images/defaultuser.png'),
  );

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');

          setUserImage(
            userData.profileImage ||
              require('../assets/images/defaultuser.png'),
          );
        } else {
          console.warn('User document not found');
          setUserImage(require('../assets/images/defaultuser.png'));
        }
      } else {
        console.warn('User not authenticated');
        setUserImage(require('../assets/images/defaultuser.png'));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#D4A065',
      placeholder: 'black',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={{marginTop:20}}>
          <Image
            source={{uri: userImage + '?timestamp=' + new Date().getTime()}}
            style={styles.userPicture}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inputBoxesContainer}>
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.inputBox,{color:'black',}]}>First Name: </Text>
          <Text style={styles.inputBox}>{firstName}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.inputBox,{color:'black',}]}>Last Name: </Text>
          <Text style={styles.inputBox}>{lastName}</Text>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  userPicture: {
    width: 140,
    height: 140,
    borderRadius: 90,
    borderWidth: 5,
    borderBottomWidth: 0,
    borderColor: '#FFA800',
    alignSelf: 'center',
  },
  inputBoxesContainer: {
    borderWidth: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FFA800',
    padding: 10,
  },
  inputBox: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize:18,
    color: '#E29500'
  },
});

const headerStyle = StyleSheet.create({
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

export default UpdateProfile;
