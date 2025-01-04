import React from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

interface SharedContextProps {
  scrollY: Animated.SharedValue<number>;
  scrollYGlobal: Animated.SharedValue<number>;
  scrollToTop: () => void;
}

export const SharedContext = React.createContext<
  SharedContextProps | undefined
>(undefined);

export const SharedContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const scrollY = useSharedValue(0);
  const scrollYGlobal = useSharedValue(0);

  const scrollToTop = () => {
    scrollYGlobal.value = withTiming(0, {duration: 300});
    scrollY.value = withTiming(0, {duration: 300});
  };
  return (
    <SharedContext.Provider value={{scrollY, scrollYGlobal, scrollToTop}}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedState = () => {
  const context = React.useContext(SharedContext);
  if (context === undefined) {
    throw new Error(
      'useSharedState must be used within a SharedContextProvider',
    );
  }
  return context;
};
