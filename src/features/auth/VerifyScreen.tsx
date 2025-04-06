import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {goBack, resetAndNavigate} from '../../../utils/NavigationUtils';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPTextInput from 'react-native-otp-textinput';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

const VerifyScreen = () => {
  const navigation = useNavigation();

  const [otpCode, setOtpCode] = useState('');
  const ref = useRef(null);
  const route = useRoute();
  const {phone} = route.params as {phone: string};

  const {mutate, isPending, error} = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axios.post(
          'https://cad6-146-196-38-174.ngrok-free.app/api/v1/user/verify-otp',
          data,
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      resetAndNavigate('AnimatedTabs');
    },
    onError: error => {
      console.log(error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    },
  });
  const handleOTPChange = (code: string) => {
    console.log('OTP Code:', code);
    setOtpCode(code);
  };

  const handleVerifyPress = () => {
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP.');
      return;
    } else {
      // Simulate network request or API call to verify OTP
      const payload = {
        otp: otpCode,
        phone: phone,
      };
      mutate(payload);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>OTP Verification</Text>
        <TouchableOpacity onPress={() => resetAndNavigate('AnimatedTabs')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <OTPTextInput
        handleTextChange={val => handleOTPChange(val)}
        inputCount={6}
        offTintColor="#999"
        keyboardType="number-pad"
        containerStyle={{alignSelf: 'center'}}
      />

      <TouchableOpacity onPress={handleVerifyPress} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText} disabled={isPending}>
          Verify
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Resend OTP')}>
        <Text style={styles.resend}>
          Didn’t get the OTP? <Text style={styles.resendLink}>Resend SMS</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('More Options')}>
        <Text style={styles.moreOptions}>Try more options</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backToLogin}>Go back to login methods</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backArrow: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  skip: {
    color: '#444',
    fontSize: 16,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  phone: {
    fontWeight: '600',
  },
  otpContainer: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
  },
  otpBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    fontSize: 20,
    color: '#000',
  },
  otpBoxFocused: {
    borderColor: '#000',
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resend: {
    textAlign: 'center',
    marginTop: 16,
    color: '#333',
  },
  resendLink: {
    color: '#e53935',
    fontWeight: '600',
  },
  moreOptions: {
    textAlign: 'center',
    marginTop: 10,
    color: '#e53935',
  },
  backToLogin: {
    textAlign: 'center',
    marginTop: 32,
    color: '#e53935',
    fontWeight: '500',
  },
});

export default VerifyScreen;
