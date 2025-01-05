import {View, Text, Platform} from 'react-native';
import React from 'react';
import {homeStyles} from '../../../unistyles/homeStyles';
import {useStyles} from 'react-native-unistyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSharedState} from '@features/tabs/SharedContext';
import Graphics from '@components/home/Graphics';
import HeaderSection from '@components/home/HeaderSection';

const DeliveryScreen = () => {
  const {styles} = useStyles(homeStyles);
  const inset = useSafeAreaInsets();
  const {scrollYGlobal, scrollY} = useSharedState();
  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 50], [0, 1]);
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`,
    };
  });
  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY}],
    };
  });

  const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(scrollYGlobal.value, [0, 50], [0, -50]);

    return {
      transform: [{translateY}],
    };
  });
  return (
    <View style={styles.container}>
      <View style={{height: Platform.OS === 'android' ? inset.top : 0}} />
      <Animated.View style={[moveUpStyle]}>
        <Animated.View style={[moveUpStyleNotExtrapolate]}>
          <Graphics />
        </Animated.View>
        <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
          <HeaderSection />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default DeliveryScreen;
