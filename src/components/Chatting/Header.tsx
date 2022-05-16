import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {RowBox} from '../Global/container';
import {WhiteText} from '../Global/text';
import {useAppSelector, useAppNavigation} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

const Header: React.FC = () => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [selectMenu, setSelectMenu] = useState('전체보기');
    const navigation = useAppNavigation();
    const chattingMenu = ['chattingMenu1', 'chattingMenu2', 'chattingMenu3'];
    return (
        <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
            <WhiteText style={styles.marginLeft} fontSize={`${18 * fontSize}`} medium>
                {t('chatting')}
            </WhiteText>
            <RowBox>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AllCategory');
                    }}>
                    <AutoHeightImage style={styles.icon} width={getPixel(24)} source={require('@assets/image/bar_white.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AlarmList');
                    }}>
                    <AutoHeightImage
                        style={[
                            styles.icon,
                            {
                                marginRight: getPixel(16),
                            },
                        ]}
                        width={getPixel(20)}
                        source={require('@assets/image/notice_white.png')}
                    />
                </TouchableOpacity>
            </RowBox>
        </ImageBackground>
    );
};

export default Header;

const styles = StyleSheet.create({
    marginLeft: {
        marginLeft: getPixel(16),
    },
    pickerItem: {
        fontFamily: Theme.fontWeight.medium,
        includeFontPadding: false,
        padding: 0,
        margin: 0,
    },
    pickerStyle: {
        width: 160,
        padding: 0,
        margin: 0,
        height: getHeightPixel(50),
        color: Theme.color.white,
        fontFamily: Theme.fontWeight.medium,
        includeFontPadding: false,
    },
    headerContainer: {
        width: '100%',
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    locationCheckIcon: {
        width: getPixel(15),
        height: getHeightPixel(15),
        position: 'absolute',
        top: -getHeightPixel(8),
        left: getPixel(23),
        zIndex: 100,
    },
    locationCheck: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: Theme.color.pinkRed,
        width: getPixel(120),
        height: getHeightPixel(23),
        bottom: -getHeightPixel(32),
        borderRadius: 4,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTouch: {flexDirection: 'row', alignItems: 'center'},
    icon: {
        marginRight: getPixel(10),
    },
    firstIcon: {
        marginLeft: getPixel(16),
    },
});
