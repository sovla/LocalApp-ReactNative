import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '@/Components/Home/Header';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{}}>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
}
