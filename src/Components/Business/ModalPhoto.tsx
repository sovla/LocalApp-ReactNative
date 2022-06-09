import Theme from '@/assets/global/Theme';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ModalPhotoProps} from '@/Types/Components/BusinessTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton} from '@/Util/Util';
import {Text, WhiteText} from '@Components/Global/text';
import Photo from '@Components/LoginSignUp/Photo';
import CameraRoll from '@react-native-community/cameraroll';
import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

export default function ModalPhoto({onClose, count = 1, returnFn}: ModalPhotoProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [imageArray, setImageArray] = useState<any>([]);
    const [number, setNumber] = useState<number>(100);
    const [selectNumber, setSelectNumber] = useState<number[]>([]);
    const getPhotos = () => {
        CameraRoll.getPhotos({
            mimeTypes: ['image/jpeg'], // 타입지정
            first: number, // 500 여개 사진을 가져온다
        }).then(value => {
            setImageArray(value.edges);
            // 이미지 배열에 넣고

            setNumber((prev: number) => {
                // 다음 페이지가 있으면 500 페이지더
                if (value.page_info.has_next_page) {
                    return prev + 100;
                } else {
                    return prev; // 없으면 그대로
                }
            });
        });
    };
    const onPressComplete = useCallback(() => {
        if (selectNumber.length === 0) {
            AlertButton(t('noneModalPhotoImage'));
            return;
        }
        const _imageArray = selectNumber
            .map(v => imageArray[v - 2])
            .map(v => {
                // 이미지는 두가지 형태로 들어옴
                if (v?.node) {
                    return {
                        path: v.node.image.uri as string,
                        mime: v.node.type as string,
                    };
                } else {
                    return {
                        path: v.path as string,
                        mime: v.mime as string,
                    };
                }
            });
        if (returnFn) returnFn(_imageArray);
    }, [selectNumber, imageArray]);

    const set = useMemo(() => {
        const set = new Set();
        selectNumber.forEach(v => set.add(v));
        return set;
    }, [selectNumber]);

    const _renderItem = useCallback(
        ({item, index}) => {
            const select = set.has(index + 1) ? selectNumber.findIndex(v => v === index + 1) : -1;

            const onPress =
                select === -1
                    ? () =>
                          setSelectNumber(prev => {
                              return prev.length === count
                                  ? [...prev.slice(1), index + 1] // 이전값에서 하나 짤라서 갯수 맞추기
                                  : [...prev, index + 1]; // 추가
                          })
                    : () => setSelectNumber(prev => prev.filter(v => v !== index + 1));

            if (index === 0) {
                // 첫번째 이미지
                return (
                    <TouchableOpacity onPress={onPress} style={styles.firstTouchImage}>
                        <Photo
                            returnFn={image => {
                                if (image) {
                                    setImageArray((prev: any) => [image, ...prev]);
                                    setSelectNumber(prev => prev.map(v => v + 1));
                                }
                            }}
                            width={getPixel(106)}
                            height={getHeightPixel(112)}
                        />
                    </TouchableOpacity>
                );
            }
            return (
                <TouchableOpacity
                    onPress={onPress}
                    key={index}
                    style={{
                        ...styles.touchImage,
                        marginRight: (index + 1) % 3 !== 0 ? getPixel(4) : 0,
                    }}>
                    <View style={select !== -1 ? styles.selectDot : styles.noneSelectDot}>
                        <WhiteText fontSize={`${12 * fontSize}`}>{select !== -1 ? select + 1 : ''}</WhiteText>
                    </View>
                    <Image
                        style={styles.imageBox}
                        source={{
                            uri: item?.node?.image?.uri ?? item?.path,
                        }}
                    />
                </TouchableOpacity>
            );
        },
        [selectNumber, imageArray.length],
    );

    const keyExtractor = useCallback((item, index) => item?.node?.timestamp?.toString() ?? index.toString(), []);

    useLayoutEffect(() => {
        getPhotos();
    }, []);

    return (
        <Modal visible onRequestClose={onClose}>
            <View style={{flex: 1}}>
                <Header title={t('allPhoto')} onClose={onClose}>
                    <TouchableOpacity onPress={onPressComplete}>
                        <Text fontSize={`${16 * fontSize}`} medium>
                            {t('complete')}
                        </Text>
                    </TouchableOpacity>
                </Header>
                <FlatList
                    data={[1, ...imageArray]}
                    numColumns={3}
                    keyExtractor={keyExtractor}
                    style={{
                        paddingTop: getHeightPixel(20),
                        marginHorizontal: getPixel(16),
                        paddingBottom: getHeightPixel(40),
                    }}
                    getItemLayout={(data, index) => ({
                        length: getPixel(110),
                        offset: getHeightPixel(112) * index,
                        index,
                    })}
                    onEndReached={() => {
                        getPhotos();
                    }}
                    onEndReachedThreshold={1}
                    renderItem={_renderItem}
                    maxToRenderPerBatch={25}
                    initialNumToRender={25}
                    removeClippedSubviews
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    firstTouchImage: {
        width: getPixel(106),
        height: getHeightPixel(112),
        marginRight: getPixel(4),
        marginBottom: getHeightPixel(4),
        borderRadius: 22,
        overflow: 'hidden',
    },
    imageBox: {
        width: getPixel(106),
        height: getHeightPixel(112),
    },
    touchImage: {
        width: getPixel(106),
        height: getHeightPixel(112),
        borderRadius: 22,
        overflow: 'hidden',
        marginBottom: getHeightPixel(4),
    },
    noneSelectDot: {
        width: getPixel(18),
        height: getPixel(18),
        backgroundColor: Theme.color.white,
        borderWidth: 1,
        borderColor: Theme.color.gray,
        position: 'absolute',
        top: getHeightPixel(6),
        right: getHeightPixel(6),
        zIndex: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectDot: {
        width: getPixel(18),
        height: getPixel(18),
        backgroundColor: Theme.color.aqua_00,
        position: 'absolute',
        top: getHeightPixel(6),
        right: getHeightPixel(6),
        zIndex: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
