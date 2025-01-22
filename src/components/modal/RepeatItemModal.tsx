import {View, Text} from 'react-native';
import React, {FC} from 'react';

const RepeatItemModal: FC<{
  item: any;
  restaurant: any;
  onOpenAddModal: () => void;
  closeModal: () => void;
}> = ({item, restaurant, onOpenAddModal, closeModal}) => {
  return (
    <View>
      <Text>RepeatItemModal</Text>
    </View>
  );
};

export default RepeatItemModal;
