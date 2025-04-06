import 'react-native-gesture-handler'; // Must be the first import
import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Im
import Login from '@features/auth/Login';
import SplashScreen from '@features/auth/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {navigationRef} from '../../utils/NavigationUtils';
import UserBottomTab from '@features/tabs/UserBottomTab';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import RestaurantScreen from '@features/restaurants/RestaurantScreen';
import CheckoutScreen from '@features/restaurants/CheckoutScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import VerifyScreen from '@features/auth/VerifyScreen';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen name="AnimatedTabs" component={AnimatedTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
