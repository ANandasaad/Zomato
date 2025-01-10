import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {filtertyles} from '../../../unistyles/filterStyles';
import Icons from '@components/global/Icons';
import {Colors} from '../../../unistyles/Constants';
import CustomText from '@components/global/CustomText';

const SortingAndFilter: FC<{
  menuTitle: string;
  options: Record<string, {label: string}>;
}> = ({menuTitle, options}) => {
  const {styles} = useStyles(filtertyles);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterBar}>
      <TouchableOpacity style={styles.filterItem}>
        <View>
          <Icons
            name="options"
            iconFamily="Ionicons"
            size={16}
            color={Colors.text}
          />
        </View>
        <CustomText fontFamily="Okra-Medium" fontSize={11}>
          {menuTitle}
        </CustomText>
        <Icons
          name="caret-down"
          iconFamily="Ionicons"
          size={16}
          color={Colors.text}
        />
      </TouchableOpacity>
      {Object.entries(options)?.map(([key, item], index: number) => {
        return (
          <TouchableOpacity key={index} style={styles.filterItem}>
            <CustomText fontSize={11} fontFamily="Okra-Medium">
              {key}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default SortingAndFilter;
