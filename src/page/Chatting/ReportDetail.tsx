import {View, Text} from 'react-native';
import React from 'react';
import Screen from '@/Types/Screen/Screen';

export default function ReportDetail({
  route: {params},
}: Screen['ReportDetail']) {
  console.log(params.reportType);
  return (
    <View>
      <Text>ReportDetail{params.reportType}</Text>
    </View>
  );
}
