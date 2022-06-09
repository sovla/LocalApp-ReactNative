import Theme from '@/assets/global/Theme';
import Loading from '@/Components/Global/Loading';
import {GrayText, WhiteText} from '@/Components/Global/text';
import Footer from '@/Components/Home/Footer';
import LikeProduct from '@/Components/Home/LikeProduct';
import {useAppSelector} from '@/Hooks/CustomHook';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {LikeApiTypes, LikeListType} from '@/Types/Components/HomeTypes';
import {LikeListProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton, brPrice, getHitSlop} from '@/Util/Util';
import BackWhiteIcon from '@assets/image/back_white.png';
import BackGroundImage from '@assets/image/BG.png';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';

export default function LikeList({navigation}: LikeListProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [deleteList, setDeleteList] = useState<string[]>([]);

    const [isScroll, setIsScroll] = useState<boolean>(false);

    const {data, isLoading, isError, errorMessage, getData, setData} = useApi<LikeListType['T'], LikeListType['D']>(
        null,
        'product_like_list.php',
        {
            mt_idx: user.mt_idx,
        },
        {
            isList: true,
            listField: 'list',
            firstLoading: true,
        },
    );

    const {PostAPI} = usePostSend('product_like_list_del.php', {
        mt_idx: user.mt_idx,
        like_del_arr: deleteList.join(','),
    });

    const onPressDelete = () => {
        if (!deleteList.length) {
            setIsEdit(false);
            return null;
        }
        PostAPI().then(res => {
            if (res?.result === 'false' && res?.msg) {
                return AlertButton(res.msg);
            }
            setData(prev => ({
                list: prev?.list?.filter(v => {
                    if (deleteList.find(fv => fv === v.like_idx)) {
                        return null;
                    } else {
                        return v;
                    }
                }),
                total_page: prev?.total_page,
                tptal_count: prev?.tptal_count,
            }));
            setIsEdit(false);
        });
    };
    const onPressSave = () => {
        setIsEdit(false);
    };
    const onPressItem = useCallback((idx: string, cate: string) => {
        navigation.navigate('ProductDetail', {
            pt_idx: idx,
            pt_cate: cate,
        });
    }, []);

    const onPressEditAddItem = useCallback((idx: string) => {
        setDeleteList(prev => [...prev, idx]);
    }, []);
    const onPressEditDeleteItem = useCallback((idx: string) => {
        setDeleteList(prev => prev.filter(v => v !== idx));
    }, []);

    const _renderItem = useCallback(
        ({item, index}: {item: LikeApiTypes; index: number}) => {
            const isOn = deleteList.find(v => v === item.like_idx) ? true : false;
            const _onPressItem = !isOn ? () => onPressEditAddItem(item.like_idx) : () => onPressEditDeleteItem(item.like_idx);
            const _onPress = () => onPressItem(item.pt_idx, item.pt_cate);
            return (
                <LikeProduct
                    onPress={_onPress}
                    status={''}
                    price={brPrice(item.pt_price)}
                    title={item.pt_title}
                    image={
                        item.pt_file
                            ? {
                                  uri: item.pt_file,
                              }
                            : undefined
                    }
                    idx={item.like_idx}
                    categoryNum={item.pt_cate}
                    isBusiness={item.busi_check === 'Y'}
                    isEdit={isEdit}
                    onPressItem={_onPressItem}
                    isOn={isOn}
                />
            );
        },
        [deleteList, isEdit],
    );

    const onPressAllList = useCallback(() => {
        const allList = data?.list?.map(v => {
            if (v?.like_idx) {
                return v.like_idx;
            } else {
                return '';
            }
        });
        if (allList) {
            setDeleteList(allList);
        }
    }, [data]);

    return (
        <View style={{flex: 1, backgroundColor: Theme.color.whiteGray_F7}}>
            {isLoading && <Loading isAbsolute />}
            <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
                <View style={styles.headerLeftView}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image source={BackWhiteIcon} style={styles.backWhiteImage} />
                    </TouchableOpacity>
                    <WhiteText medium fontSize={`${20 * fontSize}`}>
                        {t('likeListTitle')}
                    </WhiteText>
                </View>
                {!isEdit ? (
                    <TouchableOpacity hitSlop={getHitSlop(5)} onPress={() => setIsEdit(prev => !prev)}>
                        <WhiteText fontSize={`${16 * fontSize}`}>{t('likeListEdit')}</WhiteText>
                    </TouchableOpacity>
                ) : (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={onPressDelete} hitSlop={getHitSlop(5)} style={{}}>
                            <WhiteText fontSize={`${16 * fontSize}`}>{t('likeListDelete')}</WhiteText>
                        </TouchableOpacity>
                        {/* <TouchableOpacity hitSlop={getHitSlop(5)} onPress={onPressSave}>
              <WhiteText fontSize={`${16 * fontSize}`}>
                {t('likeListSave')}
              </WhiteText>
            </TouchableOpacity> */}
                    </View>
                )}
            </ImageBackground>
            <FlatList
                ListHeaderComponent={
                    isEdit ? (
                        <TouchableOpacity
                            onPress={onPressAllList}
                            style={{
                                width: getPixel(360),
                                alignItems: 'flex-end',
                                paddingRight: getPixel(16),
                                paddingBottom: getHeightPixel(5),
                            }}>
                            <GrayText>{t('likeListSelectAll')}</GrayText>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )
                }
                data={data?.list}
                renderItem={_renderItem}
                onEndReached={() => {
                    if (isScroll) getData();
                }}
                onScrollBeginDrag={() => {
                    setIsScroll(true);
                }}
                ListEmptyComponent={
                    <View style={{flex: 1, paddingTop: getHeightPixel(250), alignItems: 'center'}}>
                        {!isLoading && (
                            <GrayText medium fontSize={`${14 * fontSize}`}>
                                {t('noneLikeList')}
                            </GrayText>
                        )}
                    </View>
                }
            />
            <Footer menu="favorite" />
        </View>
    );
}

const styles = StyleSheet.create({
    headerLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backWhiteImage: {
        width: getPixel(30),
        height: getPixel(30),
        marginRight: getPixel(10),
    },
    headerContainer: {
        width: getPixel(360),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        paddingHorizontal: getPixel(16),
        marginBottom: getHeightPixel(20),
    },
});
