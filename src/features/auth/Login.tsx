import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {loginStyles} from '../../../unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';

import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import SocialLogin from '@components/ui/SocialLogin';
import {resetAndNavigate} from '../../../utils/NavigationUtils';
import useKeyboardOffsetHeight from '../../../utils/useKeyboardOffsetHeight';
const Login = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const {styles} = useStyles(loginStyles);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.25,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);
  const handleLogin = async () => {
    setLoading(true);
    // implement login logic
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('AnimatedTabs');
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('../../assets/images/login.png')}
        style={styles.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{transform: [{translateY: animatedValue}]}}
        contentContainerStyle={styles.bottomContainer}>
        <CustomText
          style={styles.title}
          variant="h4"
          fontFamily="Okra-Bold"
          color="#000">
          India's #1 Food Delivery and Dinning App
        </CustomText>
        <BreakerText text="Login or Sign Up" />
        <PhoneInput
          onFocus={() => {}}
          onBlur={() => {}}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomText color="#fff" fontFamily="Okra-Medium" variant="h5">
              Continue
            </CustomText>
          )}
        </TouchableOpacity>
        <BreakerText text="or" />
        <SocialLogin />
      </Animated.ScrollView>
      <View style={styles.footer}>
        <CustomText variant="h7">By continuing, you agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText
            variant="h7"
            fontFamily="Okra-Medium"
            style={styles.footerText}>
            Terms of Service
          </CustomText>
          <CustomText
            variant="h7"
            fontFamily="Okra-Medium"
            style={styles.footerText}>
            Privacy Policy
          </CustomText>
          <CustomText
            variant="h7"
            fontFamily="Okra-Medium"
            style={styles.footerText}>
            Refund Policy
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default Login;
