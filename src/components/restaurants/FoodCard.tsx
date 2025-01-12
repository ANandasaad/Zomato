import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {FC, memo} from 'react';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '../../../unistyles/foodStyles';
import CustomText from '@components/global/CustomText';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';
import AddButton from './AddButton';

const FoodCard: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const {styles} = useStyles(foodStyles);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={
            item?.isVeg
              ? require('../../assets/icons/veg.png')
              : require('../../assets/icons/non_veg.png')
          }
          style={styles.vegIcon}
        />
        <CustomText fontFamily="Okra-Medium" fontSize={12} numberOfLines={1}>
          {item?.name}
        </CustomText>
        <CustomText
          numberOfLines={1}
          style={styles.lowOpacity}
          fontFamily="Okra-Medium">
          {item?.description}
        </CustomText>
        <CustomText
          numberOfLines={1}
          style={styles.lowOpacity}
          fontFamily="Okra-Medium">
          ₹{item?.price}
        </CustomText>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <TouchableOpacity>
            <Icons
              name="bookmark-outline"
              iconFamily="Ionicons"
              size={16}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons
              name="share-social-outline"
              iconFamily="Ionicons"
              size={16}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image source={{uri: item?.image}} style={styles.foodImage} />
          <AddButton item={item} restaurant={restaurant} />
        </View>
      </View>
    </View>
  );
};

export default memo(FoodCard);
