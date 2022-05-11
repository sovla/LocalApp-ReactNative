import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {DarkBlueText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import MoreIcon from '@assets/image/more.png';
import {ProductWhiteBoxProps} from '@/Types/Components/ProductTypes';
import useBoolean from '@/Hooks/useBoolean';
import EditModal from './EditModal';
import ModalReviewRequest from './ModalReviewRequest';
import {CheckBoxImage} from '../Global/button';

const ProductWhiteBox: React.FC<ProductWhiteBoxProps> = ({title = '', price = '', image, isComplete, selectMenu, item, setIsChange, isDelete, onPress, isOn}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const {value: isEditProduct, on: onIsEditProduct, off: offIsEditProduct, toggle} = useBoolean(false);

    const {value: isReview, on: onIsReview, off: offIsReview} = useBoolean(false);

    useEffect(() => {
        setIsChange(prev => !prev);
    }, [isEditProduct]);

    return (
        <TouchableOpacity onPress={onPress} style={styles.rowCenter} disabled={!isDelete}>
            {isDelete && (
                <View style={styles.marginLeft16}>
                    <CheckBoxImage isOn={isOn} isBox width={getPixel(14)} height={getPixel(14)} />
                </View>
            )}

            <View
                style={[
                    styles.container,
                    {
                        minHeight: isComplete ? getHeightPixel(132) : getHeightPixel(90),
                        width: isDelete ? getPixel(296) : getPixel(328),
                    },
                ]}>
                <View style={styles.contentContainer}>
                    <View
                        style={{
                            ...styles.image,
                            borderRadius: 6,
                            overflow: 'hidden',
                        }}>
                        <Image source={image?.length > 0 ? {uri: image} : require('@assets/image/none_image_s.png')} style={[styles.image, isComplete && styles.opacity5]} />

                        {/* 예약중일때 노출 */}
                        {item.fin_status === 'R' && (
                            <View
                                style={{
                                    ...styles.image,
                                    ...styles.reserveAbsoluteView,
                                }}>
                                <View style={styles.reservedView}>
                                    <Text color={Theme.color.white} fontSize={`${12 * fontSize}`} medium>
                                        {t('reserved')}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={[styles.contentView, isComplete && styles.opacity5]}>
                        <Text numberOfLines={2} fontSize={`${14 * fontSize}`}>
                            {title}
                        </Text>
                        <DarkBlueText bold fontSize={`${16 * fontSize}`}>
                            {price}
                        </DarkBlueText>
                    </View>
                    {!isDelete && ( // 삭제 모드 켜져있을경우 메뉴 사라짐
                        <TouchableOpacity onPress={onIsEditProduct}>
                            <AutoHeightImage source={MoreIcon} width={getPixel(19.2)} />
                        </TouchableOpacity>
                    )}
                </View>
                {isComplete && (
                    <View style={styles.menuView}>
                        <TouchableOpacity style={styles.menuLeftTouch}>
                            <Text fontSize={`${12 * fontSize}`}>{t(isComplete ? 'MyProductMenu3' : 'MyProductMenu1')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={isComplete ? onIsReview : () => {}} style={styles.menuRightTouch}>
                            <Text fontSize={`${12 * fontSize}`}>{t(isComplete ? 'MyProductMenu4' : 'MyProductMenu2')}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {isEditProduct && <EditModal onClose={offIsEditProduct} isBump={selectMenu === 'ProfileSellProduct'} item={item} />}
                {isReview && <ModalReviewRequest onClose={offIsReview} />}
            </View>
        </TouchableOpacity>
    );
};

export default ProductWhiteBox;

const styles = StyleSheet.create({
    rowCenter: {flexDirection: 'row', alignItems: 'center'},
    marginLeft16: {
        marginLeft: getPixel(16),
    },
    reserveAbsoluteView: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        position: 'absolute',
    },
    reservedView: {
        paddingHorizontal: getPixel(6.6),
        paddingVertical: getHeightPixel(3),
        backgroundColor: Theme.color.aqua_04,
        borderRadius: 6,
    },
    opacity5: {
        opacity: 0.5,
    },
    container: {
        backgroundColor: Theme.color.white,
        borderRadius: 10,
        marginBottom: getHeightPixel(8),
        marginHorizontal: getPixel(16),
        paddingTop: getHeightPixel(13),
    },
    contentContainer: {
        flexDirection: 'row',
        paddingHorizontal: getPixel(10),
        paddingBottom: getHeightPixel(10.5),
    },
    image: {
        width: getPixel(64),
        height: getPixel(64),
    },
    contentView: {
        width: getPixel(190),
        marginLeft: getPixel(16),
        marginRight: getPixel(16),
    },
    menuView: {
        height: getHeightPixel(36.5),
        flexDirection: 'row',
        borderTopColor: Theme.color.whiteGray_EE,
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    menuLeftTouch: {
        width: '50%',
        height: '100%',
        borderRightColor: Theme.color.whiteGray_EE,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuRightTouch: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
