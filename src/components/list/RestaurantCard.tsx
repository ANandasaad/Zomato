import {View, Text, Image} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {restaurantStyles} from '../../../unistyles/restuarantStyles';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '../../../utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import StarRating from '@components/ui/StarRating';
import DottedLine from '@components/ui/DottedLine';
import Icons from '@components/global/Icons';

const RestaurantCard: FC<{item: any}> = ({item}) => {
  const {styles} = useStyles(restaurantStyles);
  return (
    <ScalePress
      onPress={() => {
        navigate('RestaurantScreen', {
          item: item,
        });
      }}>
      <View style={styles.card}>
        <View>
          <Image source={{uri: item?.imageUrl}} style={styles.image} />
        </View>
        <View style={styles.info}>
          <View style={styles.textContainer}>
            <View style={styles.textPart}>
              <CustomText
                variant="h7"
                fontFamily="Okra-Medium"
                fontSize={10}
                numberOfLines={1}>
                {item?.time} • {item?.distance} • ₹150 for one
              </CustomText>
              <CustomText
                variant="h6"
                numberOfLines={1}
                style={styles.name}
                fontFamily="Okra-Bold">
                {item?.name}
              </CustomText>
            </View>
            <StarRating rating={item?.rating} />
          </View>
          <DottedLine />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Icons
              name="brightness-percent"
              iconFamily="MaterialCommunityIcons"
              color="red"
              size={20}
            />
            {item?.discount && (
              <CustomText>
                {' '}
                {item?.discount}{' '}
                {item?.discountAmount && `• ${item?.discountAmount}`}
              </CustomText>
            )}
          </View>
        </View>
      </View>
    </ScalePress>
  );
};

export default RestaurantCard;
