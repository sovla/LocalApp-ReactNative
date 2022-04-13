import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {tierList} from '@/assets/global/dummy';
import ArrowRightIcon from '@assets/image/arrow_right.png';

const ProductTier = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View>
      <Header title={t('searchModalProductState')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        {tierList.map(item => {
          return (
            <Fragment key={item.name}>
              <TouchableOpacity style={styles.touch}>
                <Text fontSize={`${16 * fontSize}`}>{t(item.name)}</Text>
              </TouchableOpacity>
              <Line isGray width={getPixel(328)} />
            </Fragment>
          );
        })}
        <TouchableOpacity style={styles.touch}>
          <Text fontSize={`${16 * fontSize}`}>{t('tierNone')}</Text>
        </TouchableOpacity>
        <Line isGray width={getPixel(328)} />
        <TierGuideText />
      </View>
    </View>
  );
};

export default ProductTier;

const TierGuideText = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductTierGuide');
      }}
      style={styles.tierGuideView}>
      <View>
        <Text fontSize={`${16 * fontSize}`} medium>
          {t('tierGuide')}
        </Text>
        <View style={styles.underlineAqua} />
      </View>
      <AutoHeightImage source={ArrowRightIcon} width={getPixel(6)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tierGuideView: {
    height: getHeightPixel(50),
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  underlineAqua: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: getHeightPixel(7),
    width: getPixel(130),
    backgroundColor: Theme.color.aqua_04 + '50',
  },
  menuView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    marginRight: getPixel(10),
  },
  marginRight: {
    marginRight: getPixel(20),
  },
  line: {
    marginHorizontal: getPixel(16),
  },

  touch: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getPixel(32),
  },
});
