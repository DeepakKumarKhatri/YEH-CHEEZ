import { FlatList, StyleSheet, Text,View } from "react-native";
import OrderItem from "../components/molecules/OrderItem";
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/Context';
import { useContext, useState, useEffect } from "react";

const OrdersPending = () => {
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
    }, [orders]);

    const getOrders = async () => {
        try {

          const userDoc = await firestore().collection('Users').doc(user.uid).get();
          const userData = userDoc.data();
          let userPruchases = userData.sales || [];
          console.log(userPruchases)
          userPruchases = userPruchases.filter((item) => {
            return !item.shipped
          })
          setOrders(userPruchases);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
    };

    return(
        <>
        {orders.length != 0 ? 
            <FlatList 
            data={orders}
            renderItem={({item, index }) => <OrderItem props={item} index={index} button={1} />}
            keyExtractor={(item, index) => index.toString()}
            />
            :
            <View style={styles.txtCont}>
                <Text style={styles.textDec}>No Pending Order</Text>
            </View>
        }
        </>
    );
}

const styles = StyleSheet.create({
    txtCont: {
        flex: 1,
        justifyContent: 'center'
    },  
    textDec: {
        color: '#E29500',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    }
});

export default OrdersPending;
