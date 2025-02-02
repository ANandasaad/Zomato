import {
  View,
  Text,
  Platform,
  Alert,
  Button,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GOOGLE_API_KEY} from '@env';
import Geocoding from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import CustomText from '@components/global/CustomText';

Geocoding.init(GOOGLE_API_KEY, {
  language: 'en', // Add language parameter
  region: 'in', // Add region parameter for India
});
const Location = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (status === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setError('Location permission denied');
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setError('Location permission denied');
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        setLocation({latitude, longitude});

        // Fetch address using reverse geocoding
        fetchAddress(latitude, longitude);
      },
      error => {
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await Geocoding.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      setAddress(address);
    } catch (error) {
      setError('Failed to fetch address');
    }
  };

  return (
    <View style={{width: 150, overflow: 'hidden'}}>
      <CustomText numberOfLines={1} fontSize={10}>
        {address}
      </CustomText>
    </View>
  );
};

export default Location;
