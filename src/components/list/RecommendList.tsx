import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '../../../unistyles/cardStyles';
import {recommendedListData} from '../../../utils/dummyData';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '../../../utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import {Colors} from '../../../unistyles/Constants';
import CustomGradient from '@components/global/CustomGradient';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const RecommendList = () => {
  const {styles} = useStyles(cardStyles);

  const {data, isLoading} = useQuery({
    queryKey: ['recommendedListData'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          'https://cad6-146-196-38-174.ngrok-free.app/api/v1/restaurant',
          {
            headers: {
              Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MjZ9LCJpYXQiOjE3NDM5Mzg0MjksImV4cCI6MTc0NDAyNDgyOX0.9AFOPpaw-tBmMSsbYjs3CXFdzJ6SH5V-7QPRLxJSOzE'}`,
              'Content-Type': 'application/json',
            },
          },
        );
        return response.data.data;
      } catch (error) {
        console.error('Error fetching recommended list data:', error);
        throw error;
      }
    },
  });
  console.log('Recommended List Data:', data);
  const renderItem = ({item}: any) => (
    <ScalePress
      style={styles.itemContainer}
      onPress={() => {
        navigate('RestaurantScreen', {item: item});
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        {item?.discount && (
          <View style={styles.discountContainer}>
            <CustomText
              color={Colors.background}
              fontSize={10}
              fontFamily="Okra-Bold">
              {item.discount}
            </CustomText>
            {item?.discountAmount && (
              <CustomText
                style={{lineHeight: 11}}
                color={Colors.background}
                fontSize={8}
                fontFamily="Okra-Medium">
                {item.discountAmount}
              </CustomText>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Image
            source={require('../../assets/icons/bookmark.png')}
            style={styles.bookmarkIconImage}
          />
        </TouchableOpacity>
        <CustomGradient position="bottom" />
      </View>
      <View style={styles.itemInfo}>
        <CustomText
          fontSize={10}
          color={Colors.text}
          fontFamily="Okra-Medium"
          numberOfLines={1}>
          {item?.name}
        </CustomText>
        <View style={styles.flexRow}>
          <Image
            source={require('../../assets/icons/clock.png')}
            style={styles.clockIcon}
          />
          <CustomText
            fontSize={9}
            color={Colors.lightText}
            fontFamily="Okra-Medium"
            numberOfLines={1}>
            {`${item?.time} • ${item?.distance}`}
          </CustomText>
        </View>
      </View>
    </ScalePress>
  );
  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}>
      <FlatList
        numColumns={Math.ceil(recommendedListData?.length / 2)}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        scrollEnabled={false}
        style={styles.recommendedContainer}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

export default RecommendList;
