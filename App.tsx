
import React from 'react';
import Navigation from '@navigation/Navigation';
import './unistyles/unistyles';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@states/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {

  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* 3. Wrap with React Query Provider */}
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
  );
};

export default App;
