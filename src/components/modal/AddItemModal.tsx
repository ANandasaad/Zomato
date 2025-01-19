import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {modelStyles} from '../../../unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';
import ScalePress from '@components/ui/ScalePress';
import AnimatedNumbers from 'react-native-animated-numbers';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppDispatch} from '@states/reduxHook';

function transformSelectedOptions(
  selectedOptions: any,
  customizationOptions: any,
) {
  return Object.entries(selectedOptions).map(([type, index]) => {
    const customization = customizationOptions?.find(
      (option: any) => option.type === type,
    );
    if (!customization || !customization?.options[index as number]) {
      throw new Error(`Invalid customization type or index for ${type}`);
    }
    return {
      type,
      selectedOptions: customization?.options[index as number],
    };
  });
}
const AddItemModal: FC<{item: any; restaurant: any; onClose: () => void}> = ({
  item,
  restaurant,
  onClose,
}) => {
  const {styles} = useStyles(modelStyles);
  const [data, setData] = useState({
    quantity: 1,
    price: item?.price,
    selectedOption: {} as Record<string, any>,
  });

  const dispatch = useAppDispatch();
  const addCartHandler = () => {
    setData(prevData => ({
      ...prevData,
      quantity: prevData?.quantity + 1,
      price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOption),
    }));
  };

  const removeCartHandler = () => {
    if (data?.quantity > 1) {
      setData(prevData => ({
        ...prevData,
        quantity: prevData?.quantity - 1,
        price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
      }));
    }
  };
  const addItemIntoCart = async () => {
    const customizationOptions = transformSelectedOptions(
      data?.selectedOption,
      item?.customizationOptions,
    ).sort((a, b) => a.type.localeCompare(b.type));
    const customizationData = {
      restaurants: restaurant,
      items: item,
      customization: {
        quantity: data?.quantity,
        price: data?.price,
        customizationOptions: customizationOptions,
      },
    };
    dispatch(addCustomizableItem(customizationData));
    onClose();
  };
  const calculatePrice = (quantity: number, selectedOption: any) => {
    const basePrice = item?.price || 0;

    // Calculate customization price based on selected options
    let customizationPrice = 0;

    Object.keys(selectedOption).forEach(type => {
      const optionIndex = selectedOption[type];

      const optionPrice =
        item?.customizationOptions?.find((c: any) => c.type === type)
          ?.options?.[optionIndex].price || 0;

      customizationPrice += optionPrice;
    });

    return quantity * (customizationPrice + basePrice);
  };
  const selectOptionHandler = (type: string, index: number) => {
    console.log(type, index);
    setData(prevData => {
      const updatedSelectedOption = {...prevData.selectedOption, [type]: index};
      const updatedPrice = calculatePrice(
        prevData?.quantity,
        updatedSelectedOption,
      );

      return {
        ...prevData,
        selectedOption: updatedSelectedOption,
        price: updatedPrice,
      };
    });
  };
  useEffect(() => {
    console.log('useEffect');
    const defaultSelectedOption: Record<string, number> = {};
    let initialPrice = item?.price || 0;

    item?.customizationOptions?.forEach((customization: any) => {
      if (customization?.required) {
        const defaultOPtionIndex = customization?.options?.findIndex(
          (option: any) => option?.price === 0,
        );

        if (defaultOPtionIndex !== -1) {
          defaultSelectedOption[customization.type] = defaultOPtionIndex;

          initialPrice += customization?.options[defaultOPtionIndex].price || 0;
        }
      }
    });
    setData(prevData => ({
      ...prevData,
      selectedOption: defaultSelectedOption,
      price: initialPrice,
    }));
  }, [item]);
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
                    onPress={() => {
                      selectOptionHandler(customization?.type, index);
                    }}>
                    <CustomText fontFamily="Okra-Medium" fontSize={11}>
                      {option?.name}
                    </CustomText>
                    <View style={styles.flexRowGap}>
                      <CustomText fontFamily="Okra-Medium" fontSize={11}>
                        {option?.price}
                      </CustomText>
                      <Icons
                        iconFamily="MaterialCommunityIcons"
                        name={
                          data?.selectedOption[customization.type] === index
                            ? 'radiobox-marked'
                            : 'radiobox-blank'
                        }
                        color={
                          data?.selectedOption[customization.type] === index
                            ? Colors.active
                            : '#888'
                        }
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
            animateToNumber={data?.quantity}
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
            Add item - ₹{data.price}
          </CustomText>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  );
};

export default AddItemModal;
