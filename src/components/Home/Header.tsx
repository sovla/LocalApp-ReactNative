import {Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {Box, RowBox} from '../Global/container';
import {Text, WhiteText} from '../Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps} from '@/Types/Components/HomeTypes';
import Location from '../Modal/Location';
import useBoolean from '@/Hooks/useBoolean';
import ModalFilter from './ModalFilter';
import ModalMyPage from './ModalMyPage';
import AutoHeightImage from 'react-native-auto-height-image';
import ArrowDownWhiteIcon from '@assets/image/arrow_down_white.png';
import useApi from '@/Hooks/useApi';
import NoticeBlackIcon from '@assets/image/notice_black.png';
import NoticeEmptyBlackIcon from '@assets/image/notice_empty_black.png';
import NoticeWhiteIcon from '@assets/image/notice_white.png';
import NoticeEmptyWhiteIcon from '@assets/image/notice_empty_white.png';
import FastImage from 'react-native-fast-image';

const Header: React.FC<HeaderProps> = ({isChange}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();
    const {value: isModal, on: onIsModal, off: offIsModal, toggle: toggleIsModal} = useBoolean(false);
    const {value: isMenu, on: onIsMenu, off: offIsMenu, toggle: toggleIsMenu} = useBoolean(false);

    const textColor = isChange ? Theme.color.black : Theme.color.white;

    return (
        <ImageBackground
            style={[
                styles.headerContainer,
                isChange && {
                    backgroundColor: Theme.color.white,
                },
            ]}
            source={BackGroundImage}
            imageStyle={{
                opacity: isChange ? 0 : 1,
            }}>
            <RowBox>
                <Box style={styles.firstIcon}>
                    <AutoHeightImage
                        style={[styles.marginRight10]}
                        width={getPixel(16)}
                        source={isChange ? require('@assets/image/location_black.png') : require('@assets/image/location_white.png')}
                    />

                    <View style={styles.locationCheck}>
                        <Image source={TrianglePinkIcon} style={styles.locationCheckIcon} />

                        <WhiteText fontSize={`${12 * fontSize}px`}>{t('locationCheck')}</WhiteText>
                    </View>
                </Box>
                <TouchableOpacity onPress={toggleIsModal} style={styles.locationTouch}>
                    <Text color={textColor} fontSize={`${18 * fontSize}`}>
                        {user.mt_location}
                    </Text>
                    <AutoHeightImage source={isChange ? require('@assets/image/arrow_down.png') : require('@assets/image/arrow_down_white.png')} width={getPixel(8)} style={styles.marginLeft5} />
                </TouchableOpacity>
            </RowBox>
            <RowBox>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Search');
                    }}>
                    <AutoHeightImage style={styles.icon} width={getPixel(20)} source={isChange ? require('@assets/image/search_black.png') : require('@assets/image/search_white.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AllCategory');
                    }}>
                    <AutoHeightImage style={styles.icon} width={getPixel(24)} source={isChange ? require('@assets/image/bar_black.png') : require('@assets/image/bar_white.png')} />
                </TouchableOpacity>
                <AlarmButton isChange={isChange} />
            </RowBox>
            {isModal && (
                <Modal animationType="slide" transparent style={{flex: 1, backgroundColor: '#0006'}} onRequestClose={offIsModal}>
                    <Location offIsModal={offIsModal} />
                </Modal>
            )}
            {isMenu && (
                <Modal visible={isMenu} transparent onRequestClose={offIsMenu}>
                    {isMenu && <ModalMyPage onClose={offIsMenu} />}
                </Modal>
            )}
        </ImageBackground>
    );
};

export default Header;

export const AlarmButton: React.FC<{
    isChange?: boolean;
}> = ({isChange}) => {
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();

    const {data, getData} = useApi<
        {
            al_check: 'N' | 'Y';
        } | null,
        {
            mt_idx: string;
        }
    >(
        null,
        'new_alarm_check.php',
        {
            mt_idx: user.mt_idx as string,
        },
        {isFirst: false},
    );

    useEffect(() => {
        if (user.mt_idx) {
            getData();
        }
    }, []);

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('AlarmList');
            }}>
            <FastImage
                style={[
                    styles.icon,
                    {
                        marginRight: getPixel(16),
                        width: getPixel(20),
                        height: getPixel(20),
                    },
                ]}
                resizeMode={FastImage.resizeMode.contain}
                source={data && data.al_check === 'Y' ? (isChange ? NoticeBlackIcon : NoticeWhiteIcon) : isChange ? NoticeEmptyBlackIcon : NoticeEmptyWhiteIcon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    marginLeft5: {
        marginLeft: getPixel(5),
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
        borderRadius: getPixel(4),
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTouch: {flexDirection: 'row', alignItems: 'center'},
    icon: {
        marginRight: getPixel(10),
    },
    marginRight10: {
        marginRight: getPixel(10),
    },
    firstIcon: {
        marginLeft: getPixel(16),
    },
});
