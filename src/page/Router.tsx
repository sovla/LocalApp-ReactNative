import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
const Stack = createStackNavigator();

export default function Router() {
  return (
    <View>
      <Text>Router</Text>
    </View>
  );
}
