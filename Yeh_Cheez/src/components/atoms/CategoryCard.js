import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const CategoryCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{margin: 25}}
      onPress={() => navigation.navigate('Product')}>
      <ImageBackground
        source={require('../../assets/images/Rectangle7.png')}
        style={styles.backgroundImage}
        imageStyle={styles.uniqueImage}>
        <View style={styles.overlay}>
          <View style={[styles.textContainer, {paddingBottom: 150}]}>
            <View>
              <Text style={styles.text}>THREE PIECE SUITS</Text>
              <Text style={styles.text2}>Rs: 10,000</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.iconContainer}>
                <Icon name="shopping-cart" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Icon name="heart" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.insideText}>Saddar Branch</Text>
              <Text style={styles.insideText}>Melody Branch</Text>
              <Text style={styles.insideText}>Blue Area Branch</Text>
            </View>
            <View style={{paddingTop: 40}}>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.insideText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  DETAILS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    padding: 20,
    height: 350,
  },
  overlay: {
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    fontSize: 18,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
    borderColor: '#E29500',
    backgroundColor: '#E29500',
    alignItems: 'center',
    marginBottom: 10,
  },
  uniqueImage: {
    borderRadius: 20,
    borderColor: '#D4A065',
    borderWidth: 4,
  },
  textContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  insideText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CategoryCard;
