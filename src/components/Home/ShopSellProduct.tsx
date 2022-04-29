import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import Product from './Product';
import ProductList from './ProductList';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {BoldText, GrayText} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {getHitSlop} from '@/Util/Util';
import {ProduetDetailOtherApiType} from '@/Types/Components/HomeTypes';

export default function ShopSellProduct({
  shopName,
  productList,
}: {
  shopName: string;
  productList?: ProduetDetailOtherApiType['T'];
}) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const onPressAllView = useCallback(() => {
    navigation.navigate('ProfileSellProduct');
  }, []);
  const onPressItem = useCallback((idx: string, cate: string) => {
    navigation.replace('ProductDetail', {
      pt_cate: cate,
      pt_idx: idx,
    });
  }, []);
  return (
    <View>
      <View style={styles.shopView}>
        <BoldText fontSize={`${14 * fontSize}`}>
          {shopName + t('saleProduct')}
        </BoldText>
        <TouchableOpacity onPress={onPressAllView} hitSlop={getHitSlop(5)}>
          <GrayText fontSize={`${12 * fontSize}`}>{t('allView')}</GrayText>
        </TouchableOpacity>
      </View>
      <ProductList
        isList={false}
        list={productList}
        isBorder
        onPressItem={onPressItem}
      />
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
