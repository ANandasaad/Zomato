import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '../../../unistyles/homeStyles';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';
import RollingContent from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';
import {setIsVegMode} from '@states/reducers/userSlice';
const searchItems: string[] = [
  'Search "chai samosa"',
  'Search "pasta"',
  'Search "pizza"',
  'Search "burger"',
  'Search "biryani"',
  'Search "dosa"',
  'Search "momos"',
  'Search "ice cream"',
  'Search "coffee"',
  'Search "cake"',
];
const SearchBar = () => {
  const {styles} = useStyles(homeStyles);
  const dispatch = useAppDispatch();
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const {scrollYGlobal} = useSharedState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });
  return (
    <>
      <SafeAreaView />
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}>
          <Icons
            iconFamily="Ionicons"
            name="search"
            size={20}
            color={isVegMode ? Colors.active : Colors.primary}
          />
          <RollingContent
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            {searchItems?.map((item, index) => {
              return (
                <CustomText
                  key={index}
                  fontSize={12}
                  variant="h7"
                  fontFamily="Okra-Medium"
                  style={styles.rollingText}>
                  {item}
                </CustomText>
              );
            })}
          </RollingContent>
          <Icons
            iconFamily="Ionicons"
            name="mic-outline"
            size={20}
            color={isVegMode ? Colors.active : Colors.primary}
          />
        </TouchableOpacity>
        <Pressable
          style={styles.vegMode}
          onPress={() => dispatch(setIsVegMode(!isVegMode))}>
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>
            VEG
          </Animated.Text>
          <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>
            MODE
          </Animated.Text>
          <Image
            source={
              isVegMode
                ? require('../../assets/icons/switch_on.png')
                : require('../../assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </>
  );
};

export default SearchBar;
