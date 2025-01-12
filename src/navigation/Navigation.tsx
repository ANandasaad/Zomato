import Login from '@features/auth/Login';
import SplashScreen from '@features/auth/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {navigationRef} from '../../utils/NavigationUtils';
import UserBottomTab from '@features/tabs/UserBottomTab';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import RestaurantScreen from '@features/restaurants/RestaurantScreen';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen
          name="Login"
          component={Login}
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
