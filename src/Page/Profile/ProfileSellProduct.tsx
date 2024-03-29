import {View, Text, FlatList} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Menu from '@/Components/Profile/Menu';
import {getHeightPixel} from '@/Util/pixelChange';
import Product from '@/Components/Home/Product';
import {ProductProps} from '@/Types/Components/HomeTypes';
import {ProfileSellProductProps} from '@/Types/Screen/Screen';
import {ProfileSellProductAPi} from '@/Types/Components/ProfileTypes';
import useApi from '@/Hooks/useApi';
import {useIsFocused} from '@react-navigation/native';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {ProfileSellerProductApi} from '@/Types/API/ProfileTypes';
import {brPrice, productTimeSetting, viewCountCheck} from '@/Util/Util';
import Loading from '@/Components/Global/Loading';
import {GrayText} from '@/Components/Global/text';

export default function ProfileSellProduct({route: {params}, navigation}: ProfileSellProductProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const isFocused = useIsFocused();
    const [selectMenu, setSelectMenu] = useState<any>('ProfileSellProduct');
    const {data, isLoading, isError, errorMessage, getData, setData} = useApi<ProfileSellerProductApi['T'], ProfileSellerProductApi['D']>(
        null,
        'sell_profile_product_list.php',
        {
            mt_idx: user.mt_idx as string,
            sell_idx: params.sell_idx, // 수정필요 params.sell_idx
            sell_type: params.sell_type, // 수정필요 params.sell_type
            sell_status: selectMenu === 'ProfileSellProductComplete' ? 'Y' : 'N',
        },
        {isFirst: false},
    );
    const onPressItem = useCallback(
        (idx: string, cate: string) => {
            console.log('onPressItem', idx, cate);
            navigation.navigate('ProductDetailProfile', {
                pt_idx: idx,
                pt_cate: cate,
            });
        },
        [navigation],
    );

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);
    useLayoutEffect(() => {
        setData(null);
        getData();
    }, [selectMenu]);
    return (
        <View style={{flex: 1}}>
            <Header title={t('profileHomeSaleProduct')} />
            <View style={{height: getHeightPixel(20)}}></View>
            <Menu menuList={['ProfileSellProduct', 'ProfileSellProductComplete']} selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
            {isLoading ? (
                <View style={{flex: 1}}>
                    <Loading />
                </View>
            ) : (
                <FlatList
                    style={{flex: 1}}
                    contentContainerStyle={{
                        paddingBottom: getHeightPixel(150),
                    }}
                    data={data}
                    renderItem={({item, index}) => {
                        console.log(item);
                        return (
                            <Product
                                image={
                                    item?.pt_file
                                        ? {
                                              uri: item.pt_file,
                                          }
                                        : require('@assets/image/none_image_m.png')
                                }
                                status={selectMenu === 'ProfileSellProductComplete' ? '판매완료' : ''}
                                viewCount={viewCountCheck(item.view_count)}
                                likeCount={viewCountCheck(item.like_count)}
                                price={brPrice(item.pt_price)}
                                time={` .  ${productTimeSetting(item?.pt_time ?? 0, item?.pt_time_type ?? 'now')}`}
                                isList
                                location={`${item?.pt_location} ${item?.pt_location_detail}  .  ${item.dist?.toFixed(0)}${t('withinDistance')}`}
                                title={item.pt_title}
                                idx={item.pt_idx}
                                cate={item.pt_cate}
                                isLikeShow={false}
                                onPress={() => onPressItem(item.pt_idx, item.pt_cate)}
                            />
                        );
                    }}
                    ListEmptyComponent={
                        <View
                            style={{
                                height: getHeightPixel(450),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <GrayText medium fontSize={`${14 * fontSize}`}>
                                {t(selectMenu === 'ProfileSellProductComplete' ? 'noneSoldOut' : 'noneSale')}
                            </GrayText>
                        </View>
                    }
                />
            )}
        </View>
    );
}
