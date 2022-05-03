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
import {CarLocationAPi} from '@/Types/API/CarTypes';
import useDebounce from '@/Hooks/useDebounce';

const CarLocation = ({navigation}: CarLocationProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [text, setText] = useState<string>('');
  const {getData, data} = useApi<CarLocationAPi['T'], CarLocationAPi['D']>(
    {
      cnt: 0,
      list: [],
    },
    'location_category_list.php',
    {
      search_txt: text,
    },
  );
  const _useDebounc = useDebounce(text, () => getData(), 500);

  const onPressItem = useCallback((v: {lc_idx: string; lc_lat: string; lc_lng: string; lc_title: string}) => {
    navigation.navigate('ProductUpdate', {
      carLocation: {
        ...v,
      },
    });
  }, []);

  return (
    <View>
      <Header title={t('carLocation')}>
        <TouchableOpacity>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={styles.searchView}>
        <AutoHeightImage style={styles.marginHori11} source={SearchBlackIcon} width={getPixel(18)} />
        <TextInput placeholder={t('carLocationPh')} placeholderTextColor={Theme.color.gray} onChangeText={setText} style={{...styles.textInput, fontSize: fontSize * 16}} />
      </View>
      {data.list.map(v => {
        return (
          <Fragment key={v.lc_idx}>
            <TouchableOpacity
              onPress={() => {
                onPressItem(v);
              }}
              style={styles.touchItem}>
              <Text>{v.lc_title}</Text>
            </TouchableOpacity>
            <Line isGray />
          </Fragment>
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
    marginHorizontal: getPixel(16),
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
