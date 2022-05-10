import {FlatList, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import TrashWhiteIcon from '@assets/image/trash_white.png';
import BackWhiteIcon from '@assets/image/back_white.png';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import {MyProductProps} from '@/Types/Screen/Screen';
import useApi from '@/Hooks/useApi';
import {ProductFinishListApi, ProductSaleListApi} from '@/Types/API/ProductTypes';
import {brPrice} from '@/Util/Util';

const MyProduct: React.FC<MyProductProps> = ({navigation}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const [selectMenu, setSelectMenu] = useState<string>('ProfileSellProduct');

    const {data, getData} = useApi<ProductSaleListApi['T'], ProductSaleListApi['D']>(
        null,
        'sell_product_list.php',
        {
            mt_idx: user.mt_idx as string,
        },
        {isFirst: false},
    );
    const {data: finishData, getData: finishGetData} = useApi<ProductFinishListApi['T'], ProductFinishListApi['D']>(
        null,
        'sell_product_finish_list.php',
        {
            mt_idx: user.mt_idx as string,
        },
        {isFirst: false},
    );

    const onPressBackButton = useCallback(() => {
        navigation.goBack();
    }, []);

    useLayoutEffect(() => {
        if (selectMenu === 'ProfileSellProduct') {
            getData();
        } else {
            finishGetData();
        }

        return () => {};
    }, [selectMenu]);

    return (
        <View
            style={{
                backgroundColor: Theme.color.whiteGray_F7,
                flex: 1,
            }}>
            <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
                <View style={styles.rowCenter}>
                    <TouchableOpacity onPress={onPressBackButton}>
                        <AutoHeightImage source={BackWhiteIcon} width={getPixel(30)} />
                    </TouchableOpacity>
                    <WhiteText medium fontSize={`${20 * fontSize}`}>
                        {t('modalMyPageProduct')}
                    </WhiteText>
                </View>
                <TouchableOpacity>
                    <AutoHeightImage source={TrashWhiteIcon} width={getPixel(30)} />
                </TouchableOpacity>
            </ImageBackground>
            {selectMenu === 'ProfileSellProduct' ? (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <>
                            <View key={'Header1'} style={{height: getHeightPixel(10)}} />
                            <Menu key={'Header2'} menuList={['ProfileSellProduct', 'ProfileSellProductComplete']} selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
                            <View key={'Header3'} style={{height: getHeightPixel(20)}} />
                        </>
                    }
                    renderItem={({item, index}) => {
                        return <ProductWhiteBox selectMenu={selectMenu} isComplete={selectMenu === 'ProfileSellProductComplete'} title={item.pt_title} price={brPrice(item.pt_price)} item={item} image={item.pt_file} />;
                    }}
                />
            ) : (
                <FlatList
                    data={finishData}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <>
                            <View key={'Header1'} style={{height: getHeightPixel(10)}} />
                            <Menu key={'Header2'} menuList={['ProfileSellProduct', 'ProfileSellProductComplete']} selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
                            <View key={'Header3'} style={{height: getHeightPixel(20)}} />
                        </>
                    }
                    renderItem={({item, index}) => {
                        return <ProductWhiteBox selectMenu={selectMenu} isComplete={selectMenu === 'ProfileSellProductComplete'} title={item.pt_title} price={brPrice(item.pt_price)} item={item} image={item.pt_file} />;
                    }}
                />
            )}
        </View>
    );
};

export default MyProduct;

const styles = StyleSheet.create({
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContainer: {
        width: getPixel(360),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        paddingHorizontal: getPixel(16),
    },
});
