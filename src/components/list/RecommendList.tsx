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

const RecommendList = () => {
  const {styles} = useStyles(cardStyles);
  const renderItem = ({item}: any) => (
    <ScalePress
      style={styles.itemContainer}
      onPress={() => {
        navigate('RestaurantScreen', {item: item});
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
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
        data={recommendedListData}
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
