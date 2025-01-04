import {View, Text} from 'react-native';
import React from 'react';
import {SharedContextProvider} from './SharedContext';
import UserBottomTab from './UserBottomTab';

const AnimatedTabs = () => {
  return (
    <SharedContextProvider>
      <UserBottomTab />
    </SharedContextProvider>
  );
};

export default AnimatedTabs;
