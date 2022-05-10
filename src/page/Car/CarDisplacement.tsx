import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import SearchBlackIcon from '@assets/image/search_black.png';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {
  CarDisplacementProps,
  CarFuelProps,
  CarLocationProps,
  CarModelProps,
  CarYearProps,
} from '@/Types/Screen/Screen';
import {TextInput} from 'react-native-gesture-handler';

import useApi from '@/Hooks/useApi';
import {
  CarFuelApi,
  CarGearApi,
  CarModelAPi,
  CarYearApi,
} from '@/Types/API/CarTypes';
import useDebounce from '@/Hooks/useDebounce';

const CarDisplacement = ({navigation}: CarDisplacementProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const {getData, data} = useApi<CarFuelApi['T'], CarFuelApi['D']>(
    {
      cnt: 0,
      list: [],
    },
    'car_displacement.php',
  );

  const onPressItem = useCallback((v: {cc_idx: string; cc_title: string}) => {
    navigation.navigate('ProductUpdate', {
      pt_disp: v.cc_title,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={t('carDisplacement')}>
        <TouchableOpacity>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>

      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: getHeightPixel(80),
          }}>
          {data.list.map(v => {
            if ('cc_idx' in v)
              return (
                <View style={styles.itemView} key={v.cc_idx}>
                  <TouchableOpacity
                    onPress={() => {
                      onPressItem(v);
                    }}
                    style={styles.touchItem}>
                    <Text>{v.cc_title}</Text>
                  </TouchableOpacity>
                  <Line isGray />
                </View>
              );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CarDisplacement;

const styles = StyleSheet.create({
  itemView: {
    marginHorizontal: getPixel(16),
  },
  touchItem: {
    height: getHeightPixel(52),
    width: getPixel(328),
    justifyContent: 'center',
    paddingLeft: getPixel(10),
  },
  searchView: {
    marginLeft: getPixel(16),
    width: getPixel(328),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.color.gray_F5,
    borderRadius: 20,
  },
  marginHori11: {
    marginHorizontal: getPixel(11),
  },
  textInput: {
    width: getPixel(270),
    minHeight: getHeightPixel(40),
    color: Theme.color.black,
    fontFamily: Theme.fontWeight.default,
  },
});
