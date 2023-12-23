/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Payoo from './payoo'
import LoginProvider from './context/LoginProvider';
import MainNavigator from './navigator/MainNavigator';
import { NativeBaseProvider, Box, Center, useToast } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    <LoginProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </LoginProvider>
  );

};