import {ScrollView, StyleSheet, View} from 'react-native';
import Chart from '../components/molecules/Chart';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

const EarningAnalytics = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'EARNING CHART',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'white',
        height: 80,
      },
      headerTintColor: '#2D4990',
      headerTitleStyle: {
        fontSize: 30,
        color: '#2D4990',
      },
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Orders</Text>
      <View style={[styles.borders, styles.chartBox]}>
        <Chart />
      </View>
      <View style={styles.boxContainer}>
        <View style={[styles.borders, styles.box]}>
          <Text style={styles.boxHeading}>23</Text>
          <Text style={styles.boxContent}>Active Orders</Text>
        </View>
        <View style={[styles.borders, styles.box]}>
          <Text style={styles.boxHeading}>78</Text>
          <Text style={styles.boxContent}>Orders Done</Text>
        </View>
        <View style={[styles.borders, styles.box]}>
          <Text style={styles.boxHeading}>12</Text>
          <Text style={styles.boxContent}>This Month</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D4990',
    marginLeft: 20,
  },
  borders: {
    borderWidth: 2,
    borderColor: '#D4A065',
  },
  chartBox: {
    margin: 5,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  box: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHeading: {
    color: '#E29500',
    fontSize: 30,
  },
  boxContent: {
    color: '#2D4990',
    fontSize: 14,
  },
});

export default EarningAnalytics;
