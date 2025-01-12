import {View, Text, Platform, FlatList} from 'react-native';
import React, {FC} from 'react';
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

const RestaurantScreen: FC = () => {
  const route = useRoute() as any;
  const restaurant = route.params?.item;

  const {styles} = useStyles(restaurantHeaderStyles);
  const insets = useSafeAreaInsets();

  const renderItem = (item: any) => {
    return <FoodCard item={item?.item} restaurant={restaurant} />;
  };

  return (
    <>
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
    </>
  );
};

export default RestaurantScreen;
