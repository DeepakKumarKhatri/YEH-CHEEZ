import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const DetailContent = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<Icon name='star' size={24} color="#ffd213" />)   
    }
    return(
        <View style={styles.textContainer}>
            <Text style={styles.heading}>THREE PIECE SUITS</Text>
            <Text style={styles.text}>Rs: <Text style={styles.priceNum}>1000</Text></Text>
            <Text style={styles.textRating}>
                Elevate your style with our impeccable three-piece suit, a sophisticated ensemble designed for the modern gentleman who values timeless elegance and attention to detail
            </Text>
            <View style={styles.icons}>
                <View>
                    <Text style={styles.textRating}>Rating: 5</Text>
                    <View style={styles.rating}>{stars.map((s) => s)}</View>           
                </View>
                <View style={styles.iconInner}>
                    <View style={styles.cartIcon}><Icon name='shopping-cart' size={32} color="#FFFFFF" /></View>
                    <View style={styles.cartIcon}><Icon name='heart' size={32} color="#FFFFFF" /></View>
                    <View style={styles.cartIcon}><Icon name='download' size={32} color="#FFFFFF" /></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        padding: 20
    },
    heading: {
        marginTop: 5,
        fontSize: 24,
        color: '#2D4990',
        fontWeight: 'bold'
    },
    text: {
        marginTop: 5,
        fontSize: 20,
        color: '#2D4990',
    },
    textRating: {
        marginTop: 5,
        fontSize: 16,
        color: '#2D4990'
    },
    priceNum: {
        color: '#FFA800'
    },
    rating: {
        flexDirection: 'row'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    cartIcon: {
        backgroundColor: '#FFA800',
        borderRadius: 40,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3
    },
    iconInner: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default DetailContent;