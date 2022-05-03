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

const CarFuel = ({
  navigation,
  route: {
    params: {isMotor},
  },
}: CarFuelProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const {getData, data} = useApi<CarFuelApi['T'], CarFuelApi['D']>(
    {
      cnt: 0,
      list: [],
    },
    isMotor ? 'auto_fuel.php' : 'car_fuel.php',
  );

  const onPressItem = useCallback((v: string) => {
    navigation.navigate('ProductUpdate', {
      pt_fuel: v,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={t('carFuel')}>
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
          {data.list.map((v, i) => {
            const title = 'cc_title' in v ? v.cc_title : v.ac_title;
            return (
              <View style={styles.itemView} key={i}>
                <TouchableOpacity
                  onPress={() => {
                    onPressItem(title);
                  }}
                  style={styles.touchItem}>
                  <Text>{title}</Text>
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

export default CarFuel;

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
