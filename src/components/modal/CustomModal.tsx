import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {screenHeight} from '../../../unistyles/Constants';
import Icons from '@components/global/Icons';

const CustomModal = forwardRef((props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  useImperativeHandle(ref, () => ({
    openModal: (data: any) => {
      setContent(data);
      setVisible(true);
    },
    closeModal: () => {
      setVisible(false);
    },
  }));
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              setVisible(false);
            }}>
            <Icons iconFamily="Ionicons" name="close" size={25} color="#fff" />
          </TouchableOpacity>
          {content ? (
            <View style={styles.modalContent}>{content}</View>
          ) : (
            <Text style={styles.placeholderText}>No Content Provided</Text>
          )}
        </View>
      </View>
    </Modal>
  );
});
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    width: '100%',
    maxHeight: screenHeight * 0.7,
    minHeight: 150,
    borderRadius: 10,
  },
  modalContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: screenHeight * 0.7,
    minHeight: 150,
    borderRadius: 10,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Okra-Medium',
  },
  closeIcon: {
    position: 'absolute',
    top: -60,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 200,
    padding: 10,
    zIndex: 1,
  },
});
export default CustomModal;
