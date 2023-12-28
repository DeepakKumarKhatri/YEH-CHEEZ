import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Product from '../screens/Product';
import Category from '../screens/Category';
import UserProfile from '../screens/UserProfile';
import ChangePassword from '../screens/ChangePassword';
import Purchases from '../screens/Purchases';
import MyProducts from '../screens/MyProducts';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Purchases" component={Purchases} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
