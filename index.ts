import React from 'react';
import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import App from './App';

LogBox.ignoreLogs([
  "SafeAreaView has been deprecated and will be removed in a future release",
]);

function DkdRoot() {
  return React.createElement(
    SafeAreaProvider,
    { initialMetrics: initialWindowMetrics },
    React.createElement(App),
  );
}

registerRootComponent(DkdRoot);
