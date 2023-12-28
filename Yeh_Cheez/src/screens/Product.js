import { Image, ScrollView, StyleSheet, View,TouchableOpacity,Text } from "react-native";
import DetailContent from "../components/atoms/DetailContent";
import CategoryRow from "../components/molecules/CategoryRow";
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";

const Product = () => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => <Text style={headerStyle.headerTitle}>Suit</Text>,
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
        headerRight: () => (
          <View style={headerStyle.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Badge>0</Badge>
              <Icon
                name="shopping-cart"
                size={30}
                color="#2D4990"
                style={headerStyle.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
              <Badge>0</Badge>
              <Icon
                name="heart-o"
                size={30}
                color="#2D4990"
                style={headerStyle.icon}
              />
            </TouchableOpacity>
          </View>
        ),
        contentStyle: {
          backgroundColor: 'white',
          borderTopWidth: 2,
          borderTopColor: '#D4A065',
        },
        headerShadowVisible: false,
      });
    }, [navigation]);
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Image source={require('../assets/images/suit.png')} />
                </View>
                <DetailContent />
                <CategoryRow title={'Recommendations'} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'flex-start'
    },
    banner: {
        borderWidth: 2,
        borderColor: '#D4A065'
    }
});

export default Product;

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