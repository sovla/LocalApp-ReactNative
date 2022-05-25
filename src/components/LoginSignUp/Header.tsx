import {useAppSelector} from '@/Hooks/CustomHook';
import {NavigationHeaderProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import backArrowBlackIcon from '@assets/image/back_black.png';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MediumText} from '../Global/text';

const Header: React.FC<NavigationHeaderProps> = ({title, children, onClose}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useNavigation();
    const onPressBack = () => {
        if (onClose) {
            return onClose();
        }
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        <View style={styles.headerView}>
            <TouchableOpacity style={styles.touch} onPress={onPressBack}>
                <Image source={backArrowBlackIcon} style={styles.image} />
            </TouchableOpacity>
            <MediumText fontSize={`${18 * fontSize}`}>{title}</MediumText>
            <View style={styles.rightView}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    rightView: {
        position: 'absolute',
        right: getPixel(16),
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
    },
    touch: {
        marginLeft: getPixel(16),
        marginRight: getPixel(10),
        width: getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerView: {
        height: getHeightPixel(50),
        width: '100%',
        flexDirection: 'row',

        alignContent: 'center',
    },
    image: {
        width: getPixel(20),
        height: getPixel(12.5),
    },
});

export default Header;
