import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {modelStyles} from '../../../unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';

const ImageCard: FC<{item: any}> = ({item}) => {
  const {styles} = useStyles(modelStyles);

  return (
    <View>
      <View style={styles.headerFoodContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item?.image}} style={styles.image} />
        </View>
      </View>

      <View style={styles.headerImageContainer}>
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText fontFamily="Okra-Medium" fontSize={12}>
              {item?.name}
            </CustomText>
          </View>
          <View style={styles.flexRowGap}>
            <TouchableOpacity style={styles.icon}>
              <Icons
                iconFamily="Ionicons"
                name="bookmark-outline"
                size={16}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icons
                iconFamily="Ionicons"
                name="share-outline"
                size={16}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <CustomText fontFamily="Okra-Medium" fontSize={10} numberOfLines={2}>
          {item?.description}{' '}
        </CustomText>
      </View>
    </View>
  );
};

export default ImageCard;
