import {View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,

} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId: IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('User Info:', userInfo);
      } catch (error) {
     
          console.error('Google signin error:', error);
        }
  };
const GoogleSignSection = () => {

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={false}
      />
      ;
    </View>
  );
};

export default GoogleSignSection;

