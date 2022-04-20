import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const ModalDropdown = ({onClose}) => {
  return (
    <Modal visible transparent onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#0007',
        }}>
        <TouchableWithoutFeedback
          onPress={onClose}
          style={{
            flex: 1,
          }}>
          <Picker>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ModalDropdown;

const styles = StyleSheet.create({});
