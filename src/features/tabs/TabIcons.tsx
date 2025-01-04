import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React, {FC, memo} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../../unistyles/Constants';
import CustomText from '@components/global/CustomText';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import Delivery from '../../assets/tabicons/delivery.png';
import DeliveryFocused from '../../assets/tabicons/delivery_focused.png';
import ReorderFocused from '../../assets/tabicons/reorder_focused.png';
import Reorder from '../../assets/tabicons/reorder.png';
import LiveFocused from '../../assets/tabicons/live_focused.png';
import Live from '../../assets/tabicons/live.png';
import Dining from '../../assets/tabicons/dining.png';
import DiningFocused from '../../assets/tabicons/dining_focused.png';

interface TabProps {
  name: string;
}

interface IconProps {
  focused: boolean;
}

const styles = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  fontSize: RFValue(9.5),
  color: Colors.lightText,
};
const textStyleActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  fontSize: RFValue(9.5),
  color: Colors.active,
};
export const TabIcons: FC<TabProps> = memo(({name}) => {
  return (
    <View style={tabStyles}>
      <Image
        source={
          name == 'Delivery'
            ? Delivery
            : name == 'Reorder'
            ? Reorder
            : name == 'Dining'
            ? Dining
            : Live
        }
        style={styles}
        resizeMode={'contain'}
      />
      <CustomText style={textStyleInActive}>{name}</CustomText>
    </View>
  );
});

export const TabIconFocused: FC<TabProps> = memo(({name}) => {
  return (
    <View style={tabStyles}>
      <Image
        source={
          name == 'Delivery'
            ? DeliveryFocused
            : name == 'Reorder'
            ? ReorderFocused
            : name == 'Dining'
            ? DiningFocused
            : LiveFocused
        }
        style={[styles]}
        resizeMode={'contain'}
      />
      <CustomText style={textStyleActive}>{name}</CustomText>
    </View>
  );
});

export const DeliveryTabIcon: FC<IconProps> = memo(({focused}) => {
  return focused ? (
    <TabIconFocused name={'Delivery'} />
  ) : (
    <TabIcons name={'Delivery'} />
  );
});

export const ReorderTabIcon: FC<IconProps> = memo(({focused}) => {
  return focused ? (
    <TabIconFocused name={'Reorder'} />
  ) : (
    <TabIcons name={'Reorder'} />
  );
});

export const DiningTabIcon: FC<IconProps> = memo(({focused}) => {
  return focused ? (
    <TabIconFocused name={'Dining'} />
  ) : (
    <TabIcons name={'Dining'} />
  );
});

export const LiveTabIcon: FC<IconProps> = memo(({focused}) => {
  return focused ? (
    <TabIconFocused name={'Live'} />
  ) : (
    <TabIcons name={'Live'} />
  );
});
