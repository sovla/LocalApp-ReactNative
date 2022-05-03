import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {CarEndNumberProps} from '@/Types/Screen/Screen';

const CarEndNumber = ({navigation}: CarEndNumberProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const onPressItem = useCallback((v: number) => {
    navigation.navigate('ProductUpdate', {
      pt_number: v,
    });
  }, []);

  return (
    <View>
      <Header title={t('carEndNumber')}>
        <TouchableOpacity>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>

      {data.map(v => {
        return (
          <Fragment key={v}>
            <TouchableOpacity
              onPress={() => {
                onPressItem(v);
              }}
              style={styles.touchItem}>
              <Text>{v}</Text>
            </TouchableOpacity>
            <Line isGray />
          </Fragment>
        );
      })}
    </View>
  );
};

export default CarEndNumber;

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
