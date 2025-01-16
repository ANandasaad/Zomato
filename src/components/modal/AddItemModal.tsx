import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {modelStyles} from '../../../unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';
import ScalePress from '@components/ui/ScalePress';
import AnimatedNumbers from 'react-native-animated-numbers';
import {RFValue} from 'react-native-responsive-fontsize';
const AddItemModal: FC<{item: any; restaurant: any; onClose: () => void}> = ({
  item,
  restaurant,
  onClose,
}) => {
  const {styles} = useStyles(modelStyles);

  const addCartHandler = () => {};

  const removeCartHandler = () => {};
  const addItemIntoCart = () => {};
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.flexRowGap}>
          <Image source={{uri: item?.image}} style={styles.headerImage} />
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {item?.customizationOptions?.map((customization: any, index: any) => {
          return (
            <View style={styles.subContainer} key={index}>
              <CustomText fontFamily="Okra-Medium">
                {customization?.type}
              </CustomText>
              <CustomText fontFamily="Okra-Medium" variant="h7" color="#888">
                {customization?.required
                  ? 'Required • Select any 1 option'
                  : `Add on your ${customization?.type}`}
              </CustomText>
              <DottedLine />
              {customization?.options?.map((option: any, index: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionContainer}
                    onPress={() => {}}>
                    <CustomText fontFamily="Okra-Medium" fontSize={11}>
                      {option?.name}
                    </CustomText>
                    <View style={styles.flexRowGap}>
                      <CustomText fontFamily="Okra-Medium" fontSize={11}>
                        {option?.price}
                      </CustomText>
                      <Icons
                        iconFamily="MaterialCommunityIcons"
                        name={'radiobox-blank'}
                        color="#888"
                        size={16}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.selectedContainer}>
          <ScalePress onPress={removeCartHandler}>
            <Icons
              name="minus-thick"
              iconFamily="MaterialCommunityIcons"
              size={RFValue(13)}
            />
          </ScalePress>
          <AnimatedNumbers
            includeComma={false}
            animationDuration={300}
            animateToNumber={1}
            fontStyle={styles.animatedCount}
          />
          <ScalePress onPress={addCartHandler}>
            <Icons
              name="plus-thick"
              iconFamily="MaterialCommunityIcons"
              size={RFValue(13)}
            />
          </ScalePress>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={addItemIntoCart}>
          <CustomText
            fontFamily="Okra-Medium"
            variant="h5"
            fontSize={12}
            color="#fff">
            Add item - ₹{2}
          </CustomText>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  );
};

export default AddItemModal;
