import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CustomText from '@components/global/CustomText';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '../../../unistyles/cardStyles';
import {Colors} from '../../../unistyles/Constants';

import {recommendedListData} from '../../../utils/dummyData';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}: any) => {
    return <RestaurantCard item={item} />;
  };
  return (
    <View>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Bold"
        fontSize={10}
        variant="h7">
        1823 restaurants delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Medium"
        variant="h7">
        FEATURED
      </CustomText>
      <FlatList
        data={recommendedListData}
        renderItem={renderItem}
        scrollEventThrottle={16}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default RestaurantList;
