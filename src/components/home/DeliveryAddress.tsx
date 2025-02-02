import CustomText from '@components/global/CustomText';
import Location from './Location';
// Replace with your API key
import {
  View,
  Text,
  Platform,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@env';
import Geolocation from 'react-native-geolocation-service';
import Icons from '@components/global/Icons';

Geocoder.init(GOOGLE_API_KEY);

const DeliveryAddress = () => {
  return (
    <View style={styles.container}>
      <View>
        <CustomText fontFamily="Okra-Medium" fontSize={10}>
          Delivery at Home
        </CustomText>
      </View>
      <View style={styles.flexRowGap}>
        <Location />
        <TouchableOpacity>
          <Icons
            name="chevron-down"
            iconFamily="MaterialCommunityIcons"
            size={18}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 5,
    justifyContent: 'space-between',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
});

export default DeliveryAddress;
