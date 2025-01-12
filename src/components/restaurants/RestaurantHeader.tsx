import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '../../../unistyles/restuarantStyles';
import {goBack} from '../../../utils/NavigationUtils';
import Icons from '@components/global/Icons';
import CustomText from '@components/global/CustomText';

const RestaurantHeader: FC<{title: string}> = ({title}) => {
  const {styles} = useStyles(restaurantHeaderStyles);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.flexRowGap}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icons
            name="arrow-left"
            iconFamily="MaterialCommunityIcons"
            size={24}
          />
        </TouchableOpacity>
        <View>
          <CustomText
            fontFamily="Okra-Medium"
            fontSize={9.5}
            style={styles.title}>
            {title}
          </CustomText>
          <CustomText fontFamily="Okra-Bold" fontSize={11}>
            Recommended for you
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRowGap}>
        <TouchableOpacity onPress={() => {}}>
          <Icons
            name="account-multiple-plus-outline"
            iconFamily="MaterialCommunityIcons"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icons name="bookmark" iconFamily="Ionicons" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icons
            name="ellipsis-vertical-sharp"
            iconFamily="Ionicons"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RestaurantHeader;
