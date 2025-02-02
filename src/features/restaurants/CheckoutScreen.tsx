import {View, Text, Platform} from 'react-native';
import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSafeArea from '@components/global/CustomSafeArea';
import RestaurantHeader from '@components/restaurants/RestaurantHeader';
import {useRoute} from '@react-navigation/native';

const CheckoutScreen: FC<{}> = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute() as any;
  const data = route?.params?.item;
  console.log(data);

  return (
    <>
      <View style={{height: Platform.OS === 'android' ? insets.top : 0}} />
      <CustomSafeArea>
        <RestaurantHeader title={data?.[0]?.restaurants?.name} IsCart={true} />
      </CustomSafeArea>
    </>
  );
};

export default CheckoutScreen;
