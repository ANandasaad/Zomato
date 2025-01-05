import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '../../../unistyles/homeStyles';
import Icons from '@components/global/Icons';
import CustomText from '@components/global/CustomText';

const LocationHeader: FC = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const textColor = '#fff';
  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity,
    };
  });
  return (
    <Animated.View style={[opacityFadingStyles]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icons
            name="map-marker"
            color={textColor}
            iconFamily="MaterialCommunityIcons"
            size={32}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.flexRow}>
            <CustomText variant="h6" color={textColor}>
              Noida Sector 104
            </CustomText>
            <Icons
              name="chevron-down"
              color={textColor}
              iconFamily="MaterialCommunityIcons"
              size={20}
            />
          </TouchableOpacity>
          <CustomText variant="h6" color={textColor} fontFamily="Okra-Medium">
            Lucknow
          </CustomText>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.translation}>
            <Image
              source={require('../../assets/icons/translation.png')}
              style={styles.translationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAvatar}>
            <Image
              source={require('../../assets/icons/golden_circle.png')}
              style={styles.goldenCircle}
            />
            <Image
              source={require('../../assets/images/user.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
