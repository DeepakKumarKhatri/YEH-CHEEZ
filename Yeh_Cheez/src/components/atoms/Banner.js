import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Banner = () => {
    return(
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>GET 30% OFF ON New Year</Text>
            </View>
            <Image source={require("../../assets/images/banner.png")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E29500',
        padding: 40,
    },
    headingContainer: {
        flex: 1
    },
    heading: {
        flexDirection: 'row',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'KohSantepheap-Regular'
    }
});

export default Banner;
