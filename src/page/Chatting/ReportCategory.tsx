import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import {ReportCategoryProps} from '@/Types/Screen/Screen';

export default function ReportCategory({
  route: {
    params: {pt_idx},
  },
}: ReportCategoryProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const name = 'NETSHOES';
  return (
    <View>
      <Header title={t('userReport')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
          marginTop: getHeightPixel(35),
        }}>
        <Text medium fontSize={`${14 * fontSize}`}>
          {`'${name}' ${t('reportGuide')}`}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ReportDetail', {
            reportType: 'unmanned',
            pt_idx,
          });
        }}
        style={styles.touch}>
        <Text fontSize={`${14 * fontSize}`}>{t('unmannedUser')}</Text>
        <Image
          source={ArrowRightIcon}
          style={{
            width: getPixel(10),
            height: getPixel(10),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ReportDetail', {
            reportType: 'scam',
            pt_idx,
          });
        }}
        style={styles.touch}>
        <Text fontSize={`${14 * fontSize}`}>{t('scamUser')}</Text>
        <Image
          source={ArrowRightIcon}
          style={{
            width: getPixel(10),
            height: getPixel(10),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touch: {
    width: getPixel(328),
    paddingHorizontal: getPixel(10),
    height: getHeightPixel(40),
    marginHorizontal: getPixel(16),
    borderColor: Theme.color.gray,
    borderWidth: 1,
    borderRadius: getPixel(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeightPixel(20),
  },
});
