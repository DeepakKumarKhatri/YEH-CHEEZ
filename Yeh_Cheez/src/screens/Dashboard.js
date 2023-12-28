import { SafeAreaView, StyleSheet } from "react-native";
import Banner from "../components/atoms/Banner";
import Content from "../components/organism/Content";


const Dashboard = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Banner />
            <Content />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#E29500',
        justifyContent: 'flex-start'
    }
});

export default Dashboard;
