import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {MediumText, Text} from '@/Components/Global/text';
import Theme from '@/assets/global/Theme';
import {Box} from '@/Components/Global/container';
import CheckIcon from '../../assets/image/success.png';
import AutoHeightImage from 'react-native-auto-height-image';
import {getPixel} from '@/Util/pixelChange';

export default function LoginComplete() {
  return (
    <View style={styles.mainContainer}>
      <Box>
        <AutoHeightImage source={CheckIcon} width={getPixel(50)} />
        <MediumText fontSize={`${Theme.fontSize.fs24}px`}>로그인이 완료 되었습니다.</MediumText>
        <Box height="10px" />
        <Text fontSize={`${Theme.fontSize.fs14}px`}>LocalApp에서 제공되는 모든 서비스를</Text>
        <Text fontSize={`${Theme.fontSize.fs14}px`}>정상적으로 이용하실 수 있습니다.</Text>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
