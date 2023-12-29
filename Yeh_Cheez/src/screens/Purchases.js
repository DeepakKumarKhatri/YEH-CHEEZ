import { FlatList } from "react-native";
import OrderItem from "../components/molecules/OrderItem";
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/Context';
import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";

const Purchases = () => {
    const navigation = useNavigation();
    const {userAuth, favCount} = useContext(Context);
    const [user, setUser] = userAuth;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          await getOrders();
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }, []);

    const getOrders = async () => {
        try {

          const userDoc = await firestore().collection('Users').doc(user.uid).get();
          const userData = userDoc.data();
          const userPruchases = userData.purcheses || [];
          setOrders(userPruchases);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    return(
        <FlatList 
            data={orders}
            renderItem={({item, index }) => <OrderItem props={item} index={index} button={0} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}

export default Purchases;
