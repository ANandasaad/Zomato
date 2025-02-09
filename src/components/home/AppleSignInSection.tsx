import { View } from 'react-native'
import React, { useEffect } from 'react'


import  {appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
const onAppleButtonPress= async()=> {
     try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
    
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        console.log('Credential State:', credentialState);
    
        if (credentialState === appleAuth.State.AUTHORIZED) {
          console.log('User authenticated:', appleAuthRequestResponse);
        }
      } catch (error) {
        console.error('Apple Sign-In Error:', error);
      }
  }
const AppleSignInSection = () => {
    useEffect(() => {
        // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
        return appleAuth.onCredentialRevoked(async () => {
          console.warn('If this function executes, User Credentials have been Revoked');
        });
      }, []);
  return (
    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.DEFAULT}
        
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={onAppleButtonPress}
      />
    </View>
  )
}

export default AppleSignInSection