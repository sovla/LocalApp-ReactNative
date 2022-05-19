import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ProductLike, ProductProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {DarkBlueText, GrayText, MediumText, Text, WhiteText} from '@/Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import LocationIcon from '@assets/image/map-marker.png';
import ViewIcon from '@assets/image/view.png';
import LikeIcon from '@assets/image/heart.png';
import LikeEmptyIcon from '@assets/image/unlike.png';
import LikeFillIcon from '@assets/image/love_pink.png';
import dummy from '@assets/image/dummy.png';
import {getHitSlop, strEmptyCheck} from '@/Util/Util';
import {usePostSend} from '@/Hooks/useApi';
import {CheckBoxImage} from '@/Components/Global/button';

type AlarmProduct = ProductProps & {
    isDelete: boolean;
    isDeleteOn: boolean;
};

const AlarmProduct: React.FC<AlarmProduct> = ({title, location, time, viewCount, likeCount, price, image, isLike, status, onPress, idx, cate, isLikeShow = true, isDelete, isDeleteOn}) => {
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const {PostAPI} = usePostSend<ProductLike['D'], any>('product_like.php', {
        mt_idx: user?.mt_idx as string,
        pt_idx: idx,
    });

    const [like, setLike] = useState(isLike);

    const onPressLike = useCallback(() => {
        setLike(prev => !prev);
        PostAPI().then(res => {
            if (res?.data.result === 'true') {
                if (res?.data?.like === 'Y') {
                    setLike(true);
                } else {
                    setLike(false);
                }
            }
        });
    }, []);

    useEffect(() => {
        setLike(isLike);
    }, [isLike]);

    return (
        <TouchableOpacity
            onPress={() => {
                if (onPress) onPress(idx, cate);
            }}
            disabled={!onPress}
            style={stylesNoneList.productContainer}>
            {isDelete && (
                <View style={{marginRight: getPixel(10)}}>
                    <CheckBoxImage isBox isOn={isDeleteOn} />
                </View>
            )}
            <View style={[stylesNoneList.centerView, stylesNoneList.productImage]}>
                <Image source={image} style={[stylesNoneList.productImage]} resizeMethod="resize" />

                {/* 하트 아이콘 */}
                {isLikeShow && (
                    <TouchableOpacity onPress={onPressLike} hitSlop={getHitSlop(5)} style={stylesNoneList.absoluteTouch}>
                        <Image source={!like ? LikeEmptyIcon : LikeFillIcon} style={stylesNoneList.isLikeImage} />
                    </TouchableOpacity>
                )}

                {/* 스테이터스 - 예약중, 판매완료 */}
                {typeof status === 'string' && status?.length > 0 && (
                    <View
                        style={[
                            stylesNoneList.statusView,
                            {
                                left: status === '예약중' ? getPixel(24) : getPixel(15),
                                width: status === '예약중' ? getPixel(45.2) : getPixel(64.2),
                                backgroundColor: status === '예약중' ? Theme.color.aqua_04 : Theme.color.whiteGray_B7,
                            },
                        ]}>
                        <WhiteText medium fontSize={`${12 * fontSize}`}>
                            {status}
                        </WhiteText>
                    </View>
                )}
                {/* 백그라운드 오버레이 */}
                {strEmptyCheck(status) && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            ...stylesNoneList.productImage,
                            zIndex: 50,
                            backgroundColor: '#0005',
                        }}
                    />
                )}
            </View>

            <View style={stylesNoneList.productContentView}>
                <MediumText fontSize={`${14 * fontSize}`}>{title}</MediumText>
                <View style={stylesNoneList.locationContentView}>
                    <Image source={LocationIcon} style={stylesNoneList.locationImage} />
                    <Text fontSize={`${10 * fontSize}`} color={Theme.color.darkGray_78}>
                        {location}
                        {time}
                    </Text>
                </View>
                <View style={stylesNoneList.priceView}>
                    <DarkBlueText fontSize={`${16 * fontSize}`} medium>
                        {price}
                    </DarkBlueText>
                    <View style={stylesNoneList.rowView}>
                        <Image source={ViewIcon} style={stylesNoneList.viewImage} />
                        <GrayText fontSize={`${10 * fontSize}`}>{viewCount}</GrayText>
                        {typeof likeCount === 'string' && (
                            <>
                                <Image source={LikeIcon} style={stylesNoneList.likeImage} />
                                <GrayText fontSize={`${10 * fontSize}`}>{likeCount}</GrayText>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

AlarmProduct.defaultProps = {
    isLike: false,
    image: dummy,
    status: '',
    viewCount: '999+',
    price: 'R$ 24.00',
    time: '. 50분전 ',
    location: 'Bom Retiro . 1km이내 ',
    title: '13,000Pa 초강력흡입력 [샤오미] 차량용 무선 핸디 청소기',
    isList: false,
};

export default React.memo(AlarmProduct);

const styles = StyleSheet.create({
    contentView: {
        width: getPixel(160),
        paddingVertical: getHeightPixel(10),
        paddingLeft: getPixel(10),
        paddingRight: getPixel(5),
    },
    backgroundView: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: getPixel(160),
        height: getPixel(140),
        zIndex: 50,
        backgroundColor: '#0005',
    },
    statusTextView: {
        position: 'absolute',
        top: getPixel(58.8),
        zIndex: 100,
        height: getPixel(21.4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getPixel(5),
    },
    likeTouch: {
        position: 'absolute',
        top: getPixel(14),
        left: getPixel(13),
    },
    isListMainImage: {
        width: getPixel(160),
        height: getPixel(140),
    },
    isListMainContainer: {
        width: getPixel(160),
        minHeight: 266, // 140
        borderRadius: getPixel(21),
        overflow: 'hidden',
        backgroundColor: Theme.color.white,
        marginBottom: getHeightPixel(10),
    },
});

const stylesNoneList = StyleSheet.create({
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getPixel(10),
        overflow: 'hidden',
        marginRight: getPixel(10),
    },
    statusView: {
        position: 'absolute',
        top: getPixel(40),
        zIndex: 100,

        height: getPixel(21.4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getPixel(5),
    },
    isLikeImage: {
        width: getPixel(18),
        height: getPixel(16),
    },
    absoluteTouch: {
        position: 'absolute',
        top: getPixel(8),
        left: getPixel(7),
    },
    likeImage: {
        width: getPixel(10),
        height: getPixel(8.57),
        marginLeft: getPixel(5),
        marginRight: getPixel(3),
        marginTop: 2,
    },
    viewImage: {
        width: getPixel(12.33),
        height: getPixel(9.36),
        marginRight: getPixel(3),
        marginTop: 2,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getHeightPixel(16),
    },
    locationContentView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHeightPixel(5),
    },
    locationImage: {
        width: getPixel(9),
        height: getPixel(11),
        marginRight: getPixel(5),
    },
    productContentView: {
        flex: 1,
    },
    productImage: {
        width: getPixel(96),
        height: getPixel(96),
    },
    productContainer: {
        flexDirection: 'row',
        width: getPixel(328),
        minHeight: 116,
        paddingHorizontal: getPixel(8),
        paddingVertical: getHeightPixel(12),
        marginHorizontal: getPixel(16),
        marginBottom: getHeightPixel(8),
        backgroundColor: Theme.color.white,
        borderRadius: getPixel(15),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
