import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {loginStyles} from '../../../unistyles/authStyles';
import CustomText from '@components/global/CustomText';

const BreakerText: FC<{text: string}> = ({text}) => {
  const {styles} = useStyles(loginStyles);
  return (
    <View style={styles.breakerContainer}>
      <View style={styles.horizontalLine} />
      <CustomText
        fontSize={12}
        style={styles.breakerText}
        fontFamily="Okra-Medium">
        {text}
      </CustomText>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default BreakerText;