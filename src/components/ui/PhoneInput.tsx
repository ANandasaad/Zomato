import {View,  Pressable, TextInput} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '../../../unistyles/phoneStyles';
import CustomText from '@components/global/CustomText';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';

interface PhoneInputProps {
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}
const PhoneInput: FC<PhoneInputProps> = ({
  onFocus,
  onBlur,
  value,
  onChangeText,
}) => {
  const {styles} = useStyles(phoneStyles);

  return (
    <View style={styles.container}>
      <Pressable style={styles.countryPickerContainer}>
        <CustomText variant="h4">🇮🇳</CustomText>
        <Icons
          iconFamily="Ionicons"
          name="caret-down-sharp"
          size={20}
          color={Colors.lightText}
        />
      </Pressable>
      <View style={styles.phoneInputContainer}>
        <CustomText fontFamily="Okra-Bold"> +91 </CustomText>
        <TextInput
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default PhoneInput;
