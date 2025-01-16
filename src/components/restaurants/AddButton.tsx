import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useCallback, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '../../../unistyles/foodStyles';
import ScalePress from '@components/ui/ScalePress';
import Icons from '@components/global/Icons';
import {
  addCartItem,
  removeCartItem,
  selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import {Colors} from '../../../unistyles/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '../modal/AddItemModal';

const AddButton: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const dispatch = useAppDispatch();
  const {styles} = useStyles(foodStyles);
  const modelRef = useRef<any>(null);
  const cart = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );
  const openAddModal = () => {
    modelRef.current?.openModal(
      <AddItemModal
        item={item}
        restaurant={restaurant}
        onClose={modelRef.current?.closeModal()}
      />,
    );
  };
  const addCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart != null) {
        console.log('open modal');
        Alert.alert('Item already added');
        return;
      }
      openAddModal();
    } else {
      dispatch(addCartItem({restaurant, item: {...item, customizations: []}}));
    }
  }, [dispatch, item, restaurant, cart]);
  const removeCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart != null) {
        console.log('open modal');

        return;
      }
    } else {
      dispatch(
        removeCartItem({restaurant_id: restaurant?.id, itemId: item.id}),
      );
    }
  }, [dispatch, item, restaurant]);
  return (
    <>
      <CustomModal ref={modelRef} />
      <View style={styles.addButtonContainer(cart != null)}>
        {cart ? (
          <View style={styles.selectedContainer}>
            <ScalePress onPress={removeCartHandler}>
              <Icons
                name="minus-thick"
                iconFamily="MaterialCommunityIcons"
                color="#fff"
                size={RFValue(13)}
              />
            </ScalePress>
            <AnimatedNumbers
              includeComma={false}
              animationDuration={300}
              animateToNumber={cart?.quantity}
              fontStyle={styles.animatedCount}
            />
            <ScalePress onPress={addCartHandler}>
              <Icons
                name="plus-thick"
                iconFamily="MaterialCommunityIcons"
                color="#fff"
                size={RFValue(13)}
              />
            </ScalePress>
          </View>
        ) : (
          <TouchableOpacity
            onPress={addCartHandler}
            style={styles.noSelectionContainer}
            activeOpacity={0.6}
            accessibilityLabel="Add item to cart">
            <CustomText
              fontFamily="Okra-Bold"
              variant="h6"
              color={Colors.primary_light}>
              Add
            </CustomText>
            <CustomText
              fontFamily="Okra-Bold"
              variant="h7"
              color={Colors.primary_light}
              style={styles.plusSmallIcon}>
              +
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      {item?.isCustomizable && (
        <CustomText fontFamily="Okra-Medium" style={styles.customizeText}>
          Customizable
        </CustomText>
      )}
    </>
  );
};

export default AddButton;
