import {FlatList, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import TrashWhiteIcon from '@assets/image/trash_white.png';
import BackWhiteIcon from '@assets/image/back_white.png';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import {MyProductProps} from '@/Types/Screen/Screen';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {ProductFinishListApi, ProductSaleListApi} from '@/Types/API/ProductTypes';
import {AlertButton, AlertButtons, brPrice} from '@/Util/Util';

const MyProduct: React.FC<MyProductProps> = ({navigation}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const [selectMenu, setSelectMenu] = useState<any>('ProfileSellProduct');
    const [isChange, setIsChange] = useState(false); // 모달 꺼졌다 켜졌을때 새로 API 치기위한 상태

    const [isDelete, setIsDelete] = useState(false);
    const [deleteList, setDeleteList] = useState<string[]>([]);

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

    const {PostAPI: deleteApi} = usePostSend('sell_product_delete_arr.php', {
        // 게시글 삭제
        mt_idx: user.mt_idx as string,
        pt_idx: deleteList.join(','),
    });

    const onPressBackButton = useCallback(() => {
        navigation.goBack();
    }, []);

    const onPressDelete = useCallback(() => {
        if (isDelete) {
            AlertButtons(
                t('삭제하시겠습니까?'),
                t('confirm'),
                t('cancle'),
                async () => {
                    await deleteApi().then(res => {
                        if (res?.result === 'false' && res?.msg) {
                            AlertButton(res.msg);
                        } else {
                            setIsChange(prev => !prev);
                        }
                    });
                    setIsDelete(false);
                    setDeleteList([]);
                },
                () => {
                    setIsDelete(false);
                    setDeleteList([]);
                },
            );
        } else {
            setIsDelete(true);
        }
    }, [isDelete, deleteList]);

    const onPressDeleteItem = useCallback(
        (idx: string) => {
            const findItem = deleteList.find(v => v === idx);
            if (findItem) {
                setDeleteList(prev => prev.filter(v => v !== idx));
            } else {
                setDeleteList(prev => [...prev, idx]);
            }
        },
        [deleteList],
    );

    const onPressListAllDelete = useCallback(() => {
        if (data && deleteList.length !== data.length) {
            setDeleteList(data.map(v => v.pt_idx));
        }
    }, [data, deleteList]);

    const _renderItem = useCallback(
        ({item, index}) => {
            return (
                <ProductWhiteBox
                    isDelete={isDelete}
                    selectMenu={selectMenu}
                    isComplete={selectMenu === 'ProfileSellProductComplete'}
                    title={item.pt_title}
                    price={brPrice(item.pt_price)}
                    item={item}
                    image={item.pt_file}
                    setIsChange={setIsChange}
                    onPress={() => onPressDeleteItem(item.pt_idx)}
                    isOn={deleteList.find(v => v === item.pt_idx) != null}
                />
            );
        },
        [selectMenu, deleteList, isDelete],
    );

    useLayoutEffect(() => {
        if (selectMenu === 'ProfileSellProduct') {
            getData();
        } else {
            finishGetData();
        }

        return () => {};
    }, [selectMenu, isChange]);

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
                <TouchableOpacity onPress={onPressDelete}>
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
                            <View key={'Header3'} style={{height: isDelete ? getHeightPixel(50) : getHeightPixel(20)}}>
                                {isDelete && (
                                    <TouchableOpacity onPress={onPressListAllDelete} style={styles.selectAllTouch}>
                                        <GrayText fontSize={`${12 * fontSize}`}>{t('likeListSelectAll')}</GrayText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    }
                    renderItem={_renderItem}
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
                        return <ProductWhiteBox isDelete={isDelete} selectMenu={selectMenu} isComplete={selectMenu === 'ProfileSellProductComplete'} title={item.pt_title} price={brPrice(item.pt_price)} item={item} image={item.pt_file} setIsChange={setIsChange} />;
                    }}
                />
            )}
        </View>
    );
};

export default MyProduct;

const styles = StyleSheet.create({
    selectAllTouch: {
        alignSelf: 'flex-end',
        marginRight: getPixel(16),
        marginTop: getHeightPixel(12),
    },
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
