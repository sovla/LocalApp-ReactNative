import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import {ModalUploadModalProps} from '@/Types/Components/HomeTypes';
import AutoHeightImage from 'react-native-auto-height-image';

import WriteIcon from '@assets/image/write.png';
import ProductListIcon from '@assets/image/product_list.png';
import UploadWhiteIcon from '@assets/image/upload_white.png';

const UploadModal: React.FC<ModalUploadModalProps> = ({onClose}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();
    const onPressReg = () => {
        onClose();
        navigation.navigate('ProductUpdate');
    };
    const onPressSale = () => {
        onClose();
        navigation.navigate('MyProduct');
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#0007',
            }}>
            <TouchableOpacity onPress={onPressReg} style={styles.writeTouch}>
                <WhiteText medium fontSize={`${12 * fontSize}`}>
                    {t('productRegistration')}
                </WhiteText>
                <AutoHeightImage source={WriteIcon} width={getPixel(55)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressSale} style={styles.productListTouch}>
                <WhiteText medium fontSize={`${12 * fontSize}`}>
                    {t('profileHomeSaleProduct')}
                </WhiteText>
                <AutoHeightImage source={ProductListIcon} width={getPixel(55)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.uploadTouch}>
                <AutoHeightImage source={UploadWhiteIcon} width={getPixel(70)} />
            </TouchableOpacity>
        </View>
    );
};

export default UploadModal;

const styles = StyleSheet.create({
    uploadTouch: {
        position: 'absolute',
        right: getPixel(16),
        bottom: getHeightPixel(60),
    },
    productListTouch: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: getPixel(16),
        bottom: getHeightPixel(60 + 70 + 20),
    },
    writeTouch: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: getPixel(16),
        bottom: getHeightPixel(150 + 55),
    },
});
