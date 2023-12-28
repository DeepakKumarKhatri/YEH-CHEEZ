import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import StackNavigator from './StackNavigator';
import Search from '../screens/Search';
import UserProfileFunction from '../screens/UserProfileFunction';
import DrawerNavigator from './DrawerNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: '#E29500', height: 55}}>
      <Tab.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          title: false,
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="home"
              size={25}
              color="black"
              style={{
                color: focused ? 'white' : 'black',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          title: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="search"
              size={25}
              color="black"
              style={{
                color: focused ? 'white' : 'black',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          title: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="database"
              size={25}
              color="black"
              style={{
                color: focused ? 'white' : 'black',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfileFunction"
        component={UserProfileFunction}
        options={{
          title: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="user"
              size={25}
              color="black"
              style={{
                color: focused ? 'white' : 'black',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
