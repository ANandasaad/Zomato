import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Icons from '@components/global/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';

const BackToTopButton: FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}
      onPress={onPress}>
      <Icons
        iconFamily="Ionicons"
        name="arrow-up-circle-outline"
        size={RFValue(12)}
        color="#fff"
      />
      <CustomText variant="h7" color="#fff" fontFamily="Okra-Bold">
        Back to top
      </CustomText>
    </TouchableOpacity>
  );
};

export default BackToTopButton;
