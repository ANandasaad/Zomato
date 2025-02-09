import {View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '../../../unistyles/phoneStyles';
import Icons from '@components/global/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import GoogleSignSection from '@components/home/GoogleSignSection';
import AppleSignInSection from '@components/home/AppleSignInSection';
const SocialLogin: FC = () => {
  const {styles} = useStyles(phoneStyles);
  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.iconContainer}>
       <GoogleSignSection/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        {/* <Icons
          iconFamily="Ionicons"
          name="logo-apple"
          size={RFValue(18)}
          color="#222"
        /> */}
        <AppleSignInSection/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icons
          iconFamily="Ionicons"
          name="ellipsis-horizontal-sharp"
          size={RFValue(18)}
          color="#222"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;
