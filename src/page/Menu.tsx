import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {RouterSetting} from './Router';
import {Button} from '@/Components/Global/button';

export default function Menu(props: {navigation: {navigate: (arg0: string) => any}}) {
  return (
    <ScrollView>
      {RouterSetting.map(v => {
        return (
          <Button
            key={v.name}
            width={200}
            height={200}
            content={v.name}
            onPress={() => props.navigation.navigate(v.name)}
          />
        );
      })}
    </ScrollView>
  );
}
