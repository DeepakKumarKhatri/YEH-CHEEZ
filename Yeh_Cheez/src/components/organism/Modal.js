import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CheckOutModal = () => {
  const [isModalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    toggleModal();
    navigation.navigate('Dashboard');
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.textt}>YOUR ORDER</Text>
              <Text style={styles.textt}>HAS</Text>
              <Text style={styles.textt}>PLACED</Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#E29500',
                width: '23%',
                alignSelf: 'center',
                marginTop:20,
              }}
              onPress={handleCancel}>
              <Icon
                name="check-double"
                style={{padding: 20}}
                size={25}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckOutModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F3F3F3',
    padding: 20,
    borderRadius: 25,
    width: '80%',
    borderWidth: 3,
    borderColor: '#FFA800'
  },
  modalOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  textt: {fontSize: 25, color: '#2D4990', fontWeight: 'bold'},
});