import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {useStyles} from 'react-native-unistyles';
import {
  restaurantHeaderStyles,
  restaurantStyles,
} from '../../../unistyles/restuarantStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSafeArea from '@components/global/CustomSafeArea';
import RestaurantHeader from '@components/restaurants/RestaurantHeader';
import SortingAndFilter from '@components/home/SortingAndFilter';
import {
  restaurantItemsData,
  restaurantsItemfiltersOption,
} from '../../../utils/dummyData';
import DottedLine from '@components/ui/DottedLine';
import FoodCard from '@components/restaurants/FoodCard';
import {useAppSelector} from '@states/reduxHook';

import CartBottomBar from './CartBottomBar';

const RestaurantScreen: FC = () => {
  const route = useRoute() as any;
  const restaurant = route.params?.item;

  const {styles} = useStyles(restaurantHeaderStyles);
  const insets = useSafeAreaInsets();
  const cart = useAppSelector(state => state.cart.carts);
  const restaurantCartItem = cart.filter(
    (item: any) => item?.restaurants?.id === restaurant?.id,
  );
  // ✅ Calculate total cart price for the restaurant
  const totalCartPrice = restaurantCartItem?.reduce((total, item) => {
    return (
      total +
      (item?.items?.reduce((total, item) => {
        return total + (item?.cartPrice || 0);
      }, 0) || 0)
    );
  }, 0);

  const renderItem = (item: any) => {
    return <FoodCard item={item?.item} restaurant={restaurant} />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: Platform.OS === 'android' ? insets.top : 0}} />

      <CustomSafeArea>
        <RestaurantHeader title={restaurant.name} />
        <View style={styles.sortingContainer}>
          <SortingAndFilter
            menuTitle="Filter"
            options={restaurantsItemfiltersOption}
          />
        </View>
        <FlatList
          data={restaurantItemsData}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item?.id}
          ItemSeparatorComponent={() => (
            <View style={styles.mainPadding}>
              <DottedLine />
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
        />
      </CustomSafeArea>
      {/* Bottom Cart Bar */}
      {restaurantCartItem?.length > 0 && (
        <CartBottomBar
          cart={restaurantCartItem}
          totalCartPrice={totalCartPrice}
        />
      )}
    </View>
  );
};

export default RestaurantScreen;
