import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Onboarding = () => {
    return(
        <View style={styles.container}>
            <Icon name='check' size={100} color="#2D4990"/>
            <Text style={[styles.textLarge, styles.marginSmall]}>YEH-CHEEZ</Text>
            <Text style={[styles.textSmall, styles.marginLarge]}>Your Sign up was successfull</Text>
            <TouchableOpacity style={styles.marginLarge}>
                <Text style={styles.textMedium}>Continue to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLarge: {
        fontSize: 26,
        color: '#2D4990',
    },
    textMedium: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#2D4990'
    },
    textSmall: {
        fontSize: 16,
        color: 'black'
    },
    marginSmall: {
        marginTop: 10
    },
    marginLarge: {
        marginTop: 30
    }
});

export default Onboarding;