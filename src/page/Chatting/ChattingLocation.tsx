import {ActivityIndicator, Dimensions, FlatList, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {DarkBlueText, GrayText, Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps, ModalMyPageProps, ModalUploadModalProps} from '@/Types/Components/HomeTypes';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import WriteIcon from '@assets/image/write.png';
import TrashWhiteIcon from '@assets/image/trash_white.png';
import BackWhiteIcon from '@assets/image/back_white.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
import Header from '@/Components/LoginSignUp/Header';
import {Button, CheckBox, CheckBoxImage, Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch} from 'react-redux';
import {fontChange, fontSizeState} from '@/Store/fontSizeState';
import i18next from 'i18next';
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import EditModal from '@/Components/Product/EditModal';
import Screen, {ChattingLocationProps} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';
import MapView, {Marker} from 'react-native-maps';
import Map from '@/Components/Chatting/Map';
import useGeoLocation from '@/Hooks/useGeoLocation';
import Loading from '@/Components/Global/Loading';
import useGeocoding from '@/Hooks/useGeocoding';

export default function ChattingLocation({navigation, route: {params}}: ChattingLocationProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {isLoading, region, setRegion} = useGeoLocation(
        params?.isShow
            ? {
                  latitude: +params.region.lat,
                  longitude: +params.region.lon,
              }
            : undefined,
    );

    const {locationName, detail, isLoading: isGeoLoading} = useGeocoding(isLoading ? null : region);

    const onPressMarker = useCallback(() => {
        navigation.navigate('ChattingDetail', {
            region,
            location: locationName,
            locationDetail: detail,
        });
    }, [region, locationName, detail]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={{flex: 1}}>
            {isGeoLoading && (
                <View
                    style={{
                        position: 'absolute',
                        width: getPixel(360),
                        height: getHeightPixel(740),
                        backgroundColor: '#0001',
                        zIndex: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator />
                </View>
            )}
            <Header title={t('locationInformation')} />
            <View style={{flex: 1}}>
                <Map
                    region={region}
                    setRegion={params?.isShow ? undefined : setRegion}
                    isMarker={true}
                    markerInfo={{title: locationName, description: detail}}
                    onPressMarker={onPressMarker}
                    isShow={params?.isShow}
                />
                <View style={styles.absoluteLocation}>
                    <WhiteText fontSize={`${12 * fontSize}`}>{t('mapPh')}</WhiteText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    absoluteLocation: {
        position: 'absolute',
        left: getPixel(76),
        top: getHeightPixel(26),
        width: getPixel(208),
        height: getHeightPixel(34),
        backgroundColor: Theme.color.blue_3D,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
