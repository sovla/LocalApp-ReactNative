import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';

const BlockList: React.FC = () => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View>
            <Header title={t('blockUserManagement')} />
            <View style={styles.container}>
                <View style={styles.rowCenter}>
                    <View style={styles.imageView}>
                        <Image source={require('@assets/image/dummy.png')} style={styles.image} resizeMode="contain" />
                    </View>
                    <Text fontSize={`${16 * fontSize}`}>카롱소녀</Text>
                </View>
                <TouchableOpacity style={styles.touch}>
                    <WhiteText fontSize={`${12 * fontSize}`}>{t('unBlock')}</WhiteText>
                </TouchableOpacity>
            </View>
            <Line isGray />
        </View>
    );
};

export default BlockList;

const styles = StyleSheet.create({
    container: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        height: getHeightPixel(70),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageView: {
        width: getPixel(48),
        height: getPixel(48),
        borderRadius: getPixel(18),
        marginRight: getPixel(14),

        overflow: 'hidden',
    },
    touch: {
        backgroundColor: Theme.color.blue_3D,
        width: getPixel(64),
        height: getHeightPixel(25),
        borderRadius: getPixel(4),
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: getPixel(48),
        height: getPixel(48),
    },
});
