import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '../../../unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '../../../unistyles/Constants';
import Icons from '@components/global/Icons';
import RecommendList from '@components/list/RecommendList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from '@components/list/RegularFoodList';

const ExploreSection = () => {
  const [tabSelected, setSelected] = useState(1);
  const {styles} = useStyles(homeStyles);
  return (
    <View style={styles.topHidingContainer}>
      <View style={styles.flexRowCenter}>
        <Pressable
          style={styles.leftTab(tabSelected === 1)}
          onPress={() => setSelected(1)}>
          <CustomText
            color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium">
            Recommended
          </CustomText>
        </Pressable>
        <Pressable
          style={styles.rightTab(tabSelected === 2)}
          onPress={() => setSelected(2)}>
          <Icons
            name="bookmark-outline"
            iconFamily="Ionicons"
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
            size={14}
          />
          <CustomText
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium">
            Collections
          </CustomText>
        </Pressable>
      </View>
      <RecommendList />

      <BreakerText text="WHAT'S ON YOUR MIND" />
      <RegularFoodList />
      <BreakerText text="ALL RESTAURANTS" />
    </View>
  );
};

export default ExploreSection;
