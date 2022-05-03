import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {CarLocationProps} from '@/Types/Screen/Screen';
import {TextInput} from 'react-native-gesture-handler';

import useApi from '@/Hooks/useApi';
import {CarGearApi, CarLocationAPi} from '@/Types/API/CarTypes';
import useDebounce from '@/Hooks/useDebounce';

const CarLocation = ({navigation}: CarLocationProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const {data} = useApi<CarGearApi['T'], CarGearApi['D']>(
    {
      cnt: 0,
      list: [],
    },
    'car_gear.php',
  );

  const onPressItem = useCallback((v: {cc_idx: string; cc_title: string}) => {
    navigation.navigate('ProductUpdate', {
      ...v,
    });
  }, []);

  return (
    <View>
      <Header title={t('gearbox')}>
        {/* <TouchableOpacity>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity> */}
      </Header>

      {data.list.map(v => {
        return (
          <View key={v.cc_idx} style={{marginLeft: getPixel(16)}}>
            <TouchableOpacity
              onPress={() => {
                onPressItem(v);
              }}
              style={styles.touchItem}>
              <Text>{v.cc_title}</Text>
            </TouchableOpacity>
            <Line isGray width={getPixel(328)} />
          </View>
        );
      })}
    </View>
  );
};

export default CarLocation;

const styles = StyleSheet.create({
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
