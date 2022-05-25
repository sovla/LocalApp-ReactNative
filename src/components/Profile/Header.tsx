import Theme from '@/assets/global/Theme';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {getHitSlop} from '@/Util/Util';
import BackWhiteIcon from '@assets/image/back_white.png';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CloseIconImage} from '../Global/image';
import {Text} from '../Global/text';

const Header: React.FC<{
    title?: string;
    isBack?: boolean;
    isBlack?: boolean;
    isOnPressBack?: boolean;
}> = ({title, isBack, children, isBlack = false, isOnPressBack}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerView}>
                <TouchableOpacity
                    onPress={() => {
                        if (isBack || isOnPressBack) {
                            navigation.goBack();
                        }
                    }}
                    hitSlop={getHitSlop(5)}>
                    {isBack ? (
                        <Image
                            source={isBlack ? require('@assets/image/back_black_box.png') : BackWhiteIcon}
                            style={{
                                width: getPixel(30),
                                height: getPixel(30),
                            }}
                        />
                    ) : (
                        <CloseIconImage isWhite width={getPixel(20)} height={getPixel(20)} />
                    )}
                </TouchableOpacity>
                <Text style={{marginLeft: getPixel(16.5)}} medium color={isBlack ? Theme.color.black : Theme.color.white} fontSize={`${20 * fontSize}`}>
                    {title}
                </Text>
            </View>
            {children}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContainer: {
        width: getPixel(360),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getPixel(16),
    },
});
