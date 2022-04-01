import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {RouterSetting} from './Router';
import {Button} from '@/Components/Global/button';

export default function Menu(props: {navigation: {navigate: (arg0: string) => any}}) {
  return (
    <ScrollView style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
      {RouterSetting.map(v => {
        return (
          <Button key={v.name} width={'150px'} content={v.name} onPress={() => props.navigation.navigate(v.name)} />
        );
      })}
    </ScrollView>
  );
}
