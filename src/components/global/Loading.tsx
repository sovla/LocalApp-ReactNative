import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getPixel} from '@/Util/pixelChange';

const Loading = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={getPixel(30)} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
