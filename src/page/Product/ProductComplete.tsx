import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import {Button} from '@/Components/Global/button';

import SuccessIcon from '@assets/image/success.png';
import {ProductCompleteProps} from '@/Types/Screen/Screen';

const ProductComplete = ({route: {params}, navigation}: ProductCompleteProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const onPressConfirm = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.view}>
            <View style={styles.imageView}>
                <Image source={SuccessIcon} style={styles.image} />
                <Text medium fontSize={`${24 * fontSize}`}>
                    {t('confirmComplete')}
                </Text>
            </View>
            <Button onPress={onPressConfirm} style={styles.button} width="288px" content={t('confirm')} />
        </View>
    );
};

export default ProductComplete;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: getHeightPixel(30),
        left: getPixel(36),
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: getPixel(50),
        height: getPixel(50),
        marginBottom: getHeightPixel(36),
    },
    imageView: {
        marginBottom: getHeightPixel(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
