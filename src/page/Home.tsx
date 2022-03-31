import {
  Alert,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';

export interface HomeProp {
  title?: string;
  content?: string;
  onPressContent?(e: GestureResponderEvent): void;
}

export default function Home({title = 'Home', content = 'content', onPressContent}: HomeProp) {
  return (
    <View>
      <Text>{title}</Text>
      <TouchableOpacity testID="Button" onPress={onPressContent}>
        <Text>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
