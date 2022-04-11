import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Product from './Product';
import ProductList from './ProductList';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {BoldText, GrayText} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHitSlop} from '@/Util/Util';

export default function ShopSellProduct({shopName}: {shopName: string}) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View>
      <View style={styles.shopView}>
        <BoldText fontSize={`${14 * fontSize}`}>
          {shopName + t('saleProduct')}
        </BoldText>
        <TouchableOpacity hitSlop={getHitSlop(5)}>
          <GrayText fontSize={`${12 * fontSize}`}>{t('allView')}</GrayText>
        </TouchableOpacity>
      </View>
      <ProductList isList={false} list={[1, 1, 1, 1, 1]} isBorder />
    </View>
  );
}

const styles = StyleSheet.create({
  shopView: {
    height: getHeightPixel(65.5),
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});