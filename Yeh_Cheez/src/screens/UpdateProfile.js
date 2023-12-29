import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UpdateProfile = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={headerStyle.headerTitle}>UPDATE PROFILE</Text>
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
          Alert.alert('Error', 'Unknown error occured!');
          setUserImage(require('../assets/images/defaultuser.png'));
        }
      } else {
        Alert.alert('Error', 'User not authenticated!');
        setUserImage(require('../assets/images/defaultuser.png'));
      }
    } catch (error) {
      Alert.alert('Error', 'Error fetching user profile!');
    }
  };

  const handleImagePick = async () => {
    const user = auth().currentUser;

    if (user) {
      const options = {
        title: 'Select Product Picture',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      try {
        const response = await launchImageLibrary(options);

        if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;

          const imageRef = storage().ref(`ProfileImages/${user.uid}`);

          await imageRef.putFile(imageUri);

          const imageUrl = await imageRef.getDownloadURL();

          await firestore().collection('Users').doc(user.uid).update({
            profileImage: imageUrl,
          });

          setUserImage(imageUrl);
          Alert.alert('Success', 'Image Changed Successfully!');
        }
      } catch (error) {
        console.error('Error handling image pick:', error);
      }
    } else {
      console.warn('User not authenticated');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await firestore().collection('Users').doc(user.uid).update({
          firstName,
          lastName,
        });

        const updatedUserDoc = await firestore()
          .collection('Users')
          .doc(user.uid)
          .get();

        if (updatedUserDoc.exists) {
          const updatedUserData = updatedUserDoc.data();
          setFirstName(updatedUserData.firstName || '');
          setLastName(updatedUserData.lastName || '');

          setUserImage(
            updatedUserData.profileImage ||
              require('../assets/images/defaultuser.png'),
          );

          Alert.alert('Success', 'Data Updated Successfully!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Error updating user profile!');
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
      <View style={{marginTop:20}}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image
            source={{uri: userImage + '?timestamp=' + new Date().getTime()}}
            style={styles.userPicture}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputBoxesContainer}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          style={styles.inputBox}
        />

        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          value={lastName}
          style={styles.inputBox}
        />

        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateProfile}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
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
    borderColor: '#FFA800',
    alignSelf: 'center',
  },
  inputBoxesContainer: {
    borderWidth: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#FFA800',
    padding: 10,
    marginBottom: 100,
  },
  inputBox: {
    fontWeight: 'bold',
    width: '98%',
  },
  buttonContainer: {alignSelf: 'flex-end'},
  button: {
    backgroundColor: '#FFA800',
    width: '40%',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {color: 'white', fontSize: 15, textAlign: 'center'},
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
