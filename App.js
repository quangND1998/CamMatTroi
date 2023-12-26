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
  StyleSheet,
  TextInput, KeyboardAvoidingView
} from 'react-native';
import Payoo from './payoo'
import LoginProvider from './context/LoginProvider';
import MainNavigator from './navigator/MainNavigator';
import { NativeBaseProvider, Box, Center, useToast } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <LoginProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNavigator />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </LoginProvider>
  );

};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})