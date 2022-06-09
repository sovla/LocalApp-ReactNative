import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {ProduetDetailOtherApiType} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {getHitSlop} from '@/Util/Util';
import {useNavigationState} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BoldText, GrayText} from '../Global/text';
import ProductList from './ProductList';

export default function ShopSellProduct({shopName, productList, onPressAllView}: {shopName: string; productList?: ProduetDetailOtherApiType['T']; onPressAllView: () => void}) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();
    const stack = useNavigationState(state => state);

    const onPressItem = useCallback((idx: string, cate: string) => {
        if (stack.routes[stack.routes.length - 1].name === 'ProductDetailOther') {
            navigation.replace('ProductDetailOther', {
                pt_cate: cate,
                pt_idx: idx,
            });
        } else {
            navigation.navigate('ProductDetailOther', {
                pt_cate: cate,
                pt_idx: idx,
            });
        }
    }, []);
    if (productList == null || (Array.isArray(productList) && productList.length === 0)) {
        return null;
    }
    return (
        <View>
            <View style={styles.shopView}>
                <BoldText fontSize={`${14 * fontSize}`}>{shopName + t('saleProduct')}</BoldText>
                <TouchableOpacity onPress={onPressAllView} hitSlop={getHitSlop(5)}>
                    <GrayText fontSize={`${12 * fontSize}`}>{t('allView')}</GrayText>
                </TouchableOpacity>
            </View>
            <ProductList isList={false} list={productList} isBorder onPressItem={onPressItem} />
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
