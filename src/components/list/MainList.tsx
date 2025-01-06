import {
  View,
  Text,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import ExploreSection from '@components/home/ExploreSection';
import RestaurantList from './RestaurantList';
import {useStyles} from 'react-native-unistyles';
import {restaurantStyles} from '../../../unistyles/restuarantStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import {withTiming} from 'react-native-reanimated';

const sectionData = [
  {
    title: 'Explore',
    data: [{}],
    renderItem: () => <ExploreSection />,
  },
  {
    title: 'Restaurants',
    data: [{}],
    renderItem: () => <RestaurantList />,
  },
];
const MainList: FC = () => {
  const {styles} = useStyles(restaurantStyles);
  const {scrollToTop, scrollY, scrollYGlobal} = useSharedState();
  const previousScrollYTopBottom = useRef<number>(0);
  const previousScrollY = useRef(0);
  const sectionListRef = useRef<SectionList>(null);
  const [isRestaurantVisible, setIsRestaurantVisible] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentScrollY > previousScrollY.current;
    scrollY.value = isScrollingDown
      ? withTiming(1, {duration: 300})
      : withTiming(0, {duration: 300});

    scrollYGlobal.value = currentScrollY;

    previousScrollY.current = currentScrollY;

    const containerHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const offset = event.nativeEvent.contentOffset.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
  };
  const handleScrollTop = () => {
    scrollToTop();
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };
  return (
    <>
      <SectionList
        sections={sectionData}
        overScrollMode="always"
        onScroll={handleScroll}
        bounces={false}
        scrollEventThrottle={16}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item.id ? item?.id?.toString() : index.toString()
        }
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

export default MainList;
