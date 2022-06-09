import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import SearchBlackIcon from '@assets/image/search_black.png';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {CarModelProps} from '@/Types/Screen/Screen';
import {TextInput} from 'react-native-gesture-handler';

import useApi from '@/Hooks/useApi';
import {CarBrandAPi} from '@/Types/API/CarTypes';
import useDebounce from '@/Hooks/useDebounce';

const CarBrand = ({
  navigation,
  route: {
    params: {isMotor},
  },
}: CarModelProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [text, setText] = useState<string>('');
  const {getData, data} = useApi<CarBrandAPi['T'], CarBrandAPi['D']>(
    null,
    isMotor ? 'auto_brand.php' : 'car_brand.php',
    {
      search_txt: text,
    },
    {isFirst: false},
  );
  const _useDebounc = useDebounce(text, () => getData(), 500);

  const onPressItem = useCallback(
    (
      v:
        | {cc_idx: string; cc_title: string}
        | {ac_idx: string; ac_title: string},
    ) => {
      navigation.navigate('ProductUpdate', {
        pt_brand: 'cc_title' in v ? v.cc_title : v.ac_title,
      });
    },
    [],
  );
  return (
    <View style={{flex: 1}}>
      <Header title={t(isMotor ? 'motorBrand' : 'carBrand')}>
        <TouchableOpacity>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={styles.searchView}>
        <AutoHeightImage
          style={styles.marginHori11}
          source={SearchBlackIcon}
          width={getPixel(18)}
        />
        <TextInput
          placeholder={t(isMotor ? 'motorBrandPh' : 'carBrandPh')}
          placeholderTextColor={Theme.color.gray}
          onChangeText={setText}
          style={{...styles.textInput, fontSize: fontSize * 16}}
        />
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: getHeightPixel(80),
          }}>
          {data?.list &&
            data.list.map((v, i) => {
              const title = 'cc_title' in v ? v.cc_title : v.ac_title;
              return (
                <View style={styles.itemView} key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      onPressItem(v);
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

export default CarBrand;

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
