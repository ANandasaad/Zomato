import {FC} from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../../unistyles/Constants';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';

type PlatformType = 'ios' | 'android' | 'web';

interface CustomTextProps {
  variant: Variant;
  fontFamily?:
    | 'Okra-Bold'
    | 'Okra-Bold'
    | 'Okra-Regular'
    | 'Okra-Medium'
    | 'Okra-Light'
    | 'Okra-Black';
  color?: string;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const fontSizeMap: Record<Variant, Record<PlatformType, number>> = {
  h1: {ios: 34, android: 34, web: 34},
  h2: {ios: 28, android: 28, web: 28},
  h3: {ios: 24, android: 24, web: 24},
  h4: {ios: 20, android: 20, web: 20},
  h5: {ios: 18, android: 18, web: 18},
  h6: {ios: 16, android: 16, web: 16},
  h7: {ios: 14, android: 14, web: 14},
};

const CustomText: FC<CustomTextProps> = ({
  variant,
  fontFamily,
  color,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedFontSize: number =
    Platform.OS === 'android'
      ? RFValue(fontSize || 12)
      : RFValue(fontSize || 12);
  if (variant && fontSizeMap[variant]) {
    const defaultFontSize = fontSizeMap[variant][Platform.OS as PlatformType];
    computedFontSize = RFValue(fontSize || defaultFontSize);
  }
  const fontFamilyStyle = {
    fontFamily,
  };

  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {color: color || Colors.text, fontSize: computedFontSize},
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
