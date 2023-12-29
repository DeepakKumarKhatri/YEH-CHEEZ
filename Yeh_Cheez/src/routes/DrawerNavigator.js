import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyProducts from '../screens/MyProducts';
import AddProduct from '../screens/AddProduct';
import OrdersPending from '../screens/OrdersPending';
import OrderAnalytics from '../screens/OrderAnalytics';
import EarningAnalytics from '../screens/EarningAnalytics';
import {Image, View, Text, StyleSheet} from 'react-native';
import OrdersDone from '../screens/OrdersDone';
import {Context} from '../context/Context';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

const CustomHeader = () => (
  <View style={styles.headerContainer}>
    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
    <Text style={styles.headerText}>YEH-CHEEZ</Text>
  </View>
);

const CustomDrawerItem = ({label, icon, onPress, focused}) => (
  <DrawerItem
    label={label}
    icon={() => <Icon name={icon} size={20} color={'#FFFFFF'} />}
    onPress={onPress}
    style={{backgroundColor: focused ? '#FFA800' : '#E29500', borderRadius: 10}}
    labelStyle={{
      color: '#FFFFFF',
    }}
  />
);

const CustomDrawerContent = ({navigation, state, ...props}) => {
  const {user, setUser} = React.useContext(Context);
  const focusedRouteName = state.routeNames[state.index] || 'MyProducts';

  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#E29500'}}>
      <CustomHeader />
      <CustomDrawerItem
        label="My Products"
        icon="gift"
        onPress={() => navigation.navigate('MyProducts')}
        focused={focusedRouteName === 'MyProducts'}
      />
      <CustomDrawerItem
        label="Add Products"
        icon="plus"
        onPress={() => navigation.navigate('AddProducts')}
        focused={focusedRouteName === 'AddProducts'}
      />
      <CustomDrawerItem
        label="Pending Orders"
        icon="spinner"
        onPress={() => navigation.navigate('PendingOrders')}
        focused={focusedRouteName === 'PendingOrders'}
      />
      <CustomDrawerItem
        label="Orders Done"
        icon="check"
        onPress={() => navigation.navigate('OrdersDone')}
        focused={focusedRouteName === 'OrdersDone'}
      />
      <CustomDrawerItem
        label="Earning Chart"
        icon="chart-bar"
        onPress={() => navigation.navigate('EarningChart')}
        focused={focusedRouteName === 'EarningChart'}
      />
      <CustomDrawerItem
        label="Orders Chart"
        icon="chart-line"
        onPress={() => navigation.navigate('OrderAnalytics')}
        focused={focusedRouteName === 'OrderAnalytics'}
      />
      <CustomDrawerItem
        label="Logout"
        icon="arrow-left"
        onPress={() => {
          auth().signOut();
          setUser(null);
        }}
        focused={focusedRouteName === 'Logout'}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MyProducts"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="MyProducts" component={MyProducts} />
      <Drawer.Screen name="AddProducts" component={AddProduct} />
      <Drawer.Screen name="OrdersPending" component={OrdersPending} />
      <Drawer.Screen name="OrdersDone" component={OrdersDone} />
      <Drawer.Screen name="EarningChart" component={EarningAnalytics} />
      <Drawer.Screen name="OrderAnalytics" component={OrderAnalytics} />
      {/* <Drawer.Screen name="Logout" component={Demo7} /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DrawerNavigator;
