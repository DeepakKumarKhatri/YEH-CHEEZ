import { Image, ScrollView, StyleSheet, View } from "react-native";
import DetailContent from "../components/atoms/DetailContent";
import CategoryRow from "../components/molecules/CategoryRow";
const Product = () => {
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
