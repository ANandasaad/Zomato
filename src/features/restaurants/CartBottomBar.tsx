import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '../../../unistyles/restuarantStyles';
import Icons from '@components/global/Icons';
import {navigate} from '../../../utils/NavigationUtils';

const CartBottomBar: FC<{cart: any; totalCartPrice: number}> = ({
  cart,
  totalCartPrice,
}) => {
  const {styles} = useStyles(restaurantHeaderStyles);

  const translateY = useSharedValue(100);
  useEffect(() => {
    translateY.value = withTiming(cart?.length > 0 ? 0 : 100, {duration: 500});
  }, [cart?.length]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <View>
      {cart.length > 0 && (
        <Animated.View style={[styles.bottomBar, animatedStyle]}>
          <Text style={styles.cartText}>
            {cart[0]?.items?.length} item(s) added{' '}
            <TouchableOpacity
              onPress={() => {
                navigate('CheckoutScreen', {
                  item: cart,
                });
              }}>
              <Icons
                name="arrow-right"
                iconFamily="MaterialCommunityIcons"
                size={12}
                color="#fff"
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.cartText}>
            Add items worth ₹{Number(1000) - totalCartPrice} more to get ₹100
            OFF
          </Text>
        </Animated.View>
      )}
    </View>
  );
};
export default CartBottomBar;
