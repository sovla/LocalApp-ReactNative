import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {CarGearProps, CarLocationProps} from '@/Types/Screen/Screen';

import useApi from '@/Hooks/useApi';
import {CarGearApi} from '@/Types/API/CarTypes';

const CarGear = ({
  navigation,
  route: {
    params: {isMotor},
  },
}: CarGearProps) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const {data} = useApi<CarGearApi['T'], CarGearApi['D']>(
    {
      cnt: 0,
      list: [],
    },
    isMotor ? 'auto_gear.php' : 'car_gear.php',
  );

  const onPressItem = useCallback((v: string) => {
    navigation.navigate('ProductUpdate', {
      pt_gear: v,
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
    </View>
  );
};

export default CarGear;

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
