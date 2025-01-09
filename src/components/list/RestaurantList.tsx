import {View, Text} from 'react-native';
import React from 'react';
import CustomText from '@components/global/CustomText';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '../../../unistyles/cardStyles';
import {Colors} from '../../../unistyles/Constants';

const RestaurantList = () => {
  const {styles} = useStyles(cardStyles);
  return (
    <View>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Bold"
        fontSize={10}
        variant="h7">
        1823 restaurants delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Medium"
        variant="h7">
        FEATURED
      </CustomText>
    </View>
  );
};

export default RestaurantList;
