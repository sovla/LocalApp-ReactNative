import {useAppSelector} from '@/Hooks/CustomHook';
import {ProductDetailShopProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import ShopDummyImage from '@assets/image/shop_dummy.png';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {GrayText, MediumText} from '../Global/text';

const ProductDetailShop: React.FC<ProductDetailShopProps> = ({shopName, shopSubTitle, image = ShopDummyImage, onPress}) => {
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <Shadow sides={['bottom']} distance={5}>
            <View style={styles.betweenView}>
                <View style={styles.rowView}>
                    <TouchableOpacity onPress={onPress} style={styles.shopImageRoundView}>
                        <Image source={image} style={styles.shopImage} />
                    </TouchableOpacity>
                    <View style={styles.contentView}>
                        <MediumText fontSize={`${16 * fontSize}`}>{shopName}</MediumText>
                        <GrayText fontSize={`${12 * fontSize}`}>{shopSubTitle}</GrayText>
                    </View>
                </View>
            </View>
        </Shadow>
    );
};

export default ProductDetailShop;

const styles = StyleSheet.create({
    betweenView: {
        flexDirection: 'row',
        paddingHorizontal: getPixel(16),
        justifyContent: 'space-between',
        alignItems: 'center',
        width: getPixel(360),
        height: getHeightPixel(76),
    },
    rowView: {flexDirection: 'row', alignItems: 'center'},
    shopImageRoundView: {
        width: getPixel(48),
        height: getPixel(48),
        borderRadius: getPixel(18),
        overflow: 'hidden',
    },
    shopImage: {width: getPixel(48), height: getPixel(48)},
    contentView: {
        marginLeft: getPixel(12),
        width: getPixel(230),
    },
    shopGrayImage: {
        width: getPixel(24),
        height: getPixel(24),
    },
});
