import Theme from '@/assets/global/Theme';
import Loading from '@/Components/Global/Loading';
import CategoryScroll from '@/Components/Home/CategoryScroll';
import Footer from '@/Components/Home/Footer';
import Header from '@/Components/Home/Header';
import HomeList from '@/Components/Home/HomeList';
import ModalPopup from '@/Components/Home/ModalPopup';
import ProductList from '@/Components/Home/ProductList';
import UploadModal from '@/Components/Home/UploadModal';
import {useAppSelector} from '@/Hooks/CustomHook';
import useApi from '@/Hooks/useApi';
import useBoolean from '@/Hooks/useBoolean';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {HomeProductListType} from '@/Types/Components/HomeTypes';
import {HomeProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Modal, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

export default function Home({navigation}: HomeProps): JSX.Element {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const [isList, setIsList] = useState(true);
    const {value: isUpload, on: onUpload, off: offUpload} = useBoolean(false);
    const {value: isPopup, on: onIsPopup, off: offIsPopup} = useBoolean(false);
    const {value: isChange, on: onIsChange, off: offIsChange} = useBoolean(false);
    const [isScroll, setIsScroll] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const {data, isLoading, isError, errorMessage, getData, reset} = useApi<HomeProductListType['T'], HomeProductListType['D']>(
        null,
        'product_home_list.php',
        {
            mt_idx: user.mt_idx,
        },
        {
            focusRetry: true,
            isList: true,
            listField: 'list',
        },
    );
    const isFocused = useIsFocused();
    useLayoutEffect(() => {
        AsyncStorage.getItem('isPopup').then(result => {
            if (result === 'N') {
                onIsPopup();
            }
        });
    }, []);

    const onPressItem = useCallback((idx: string, cate: string) => {
        navigation.navigate('ProductDetail', {
            pt_cate: cate,
            pt_idx: idx,
        });
    }, []);

    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset.y > getHeightPixel(160)) {
            onIsChange();
        } else {
            offIsChange();
        }
    }, []);
    useUpdateEffect(() => {
        if (!data && !isLoading) {
            getData();
        }
        if (data && isRefresh) {
            setIsRefresh(false);
        }
    }, [data]);

    return (
        <View style={{flex: 1, backgroundColor: Theme.color.whiteGray_F6}}>
            <Header isChange={isChange} />
            {isLoading && !data && <Loading isAbsolute />}
            <FlatList
                onScroll={onScroll}
                onEndReachedThreshold={1}
                onRefresh={() => {
                    reset();
                    setIsRefresh(true);
                }}
                refreshing={isRefresh}
                onEndReached={() => {
                    if (isScroll && !isRefresh) getData();
                }}
                onScrollBeginDrag={() => {
                    setIsScroll(true);
                }}
                data={[1]} // 꼼수
                renderItem={({item, index}) => {
                    // 꼼수
                    return (
                        <View
                            style={{
                                height: getHeightPixel(30),
                            }}></View>
                    );
                }}
                ListHeaderComponent={
                    <>
                        <CategoryScroll key="CategoryScroll" />
                        <HomeList key="HomeList" location="Bom Retiro" isList={isList} setIsList={setIsList} />
                        <ProductList isList={isList} list={data?.list ? data.list : []} onPressItem={onPressItem} />
                        {/* <Text>{new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(12300213.123)}</Text> */}
                    </>
                }
            />

            <TouchableOpacity onPress={onUpload} style={styles.uploadTouch}>
                {!isUpload && <AutoHeightImage source={require('@assets/image/upload_blue.png')} width={getPixel(70)} />}
            </TouchableOpacity>
            <Footer menu="home" />
            {isUpload && (
                <Modal transparent visible>
                    <UploadModal onClose={offUpload} />
                </Modal>
            )}
            {isPopup && <ModalPopup onClose={offIsPopup} />}
        </View>
    );
}

const styles = StyleSheet.create({
    uploadTouch: {
        position: 'absolute',
        right: getPixel(16),
        bottom: getHeightPixel(60),
    },
});
