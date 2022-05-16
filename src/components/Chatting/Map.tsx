import {Dimensions, FlatList, Image, ImageBackground, Text as RNText, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';

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
import ArrowRightIcon from '@assets/image/arrow_right_new.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import LocationMarkerIcon from '@assets/image/location_marker.png';
import MapView, {Callout, Marker} from 'react-native-maps';
import LocationIcon from '@assets/image/location.png';

const Map: React.FC<{
    region: {
        latitude: number;
        longitude: number;
    };
    setRegion: React.Dispatch<
        React.SetStateAction<{
            latitude: number;
            longitude: number;
        }>
    >;
    isMarker?: boolean;
    markerInfo?: {
        title: string;
        description: string;
    };
    onPressMarker?: () => void;
}> = ({region, setRegion, isMarker = true, markerInfo = {}, onPressMarker}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();
    const [lineLength, setLineLength] = useState(3);
    const ref = useRef<Marker | null>(null);
    const debounceRef = useRef<any>(null);
    useEffect(() => {
        ref.current?.showCallout();
    }, [markerInfo, lineLength]);

    const timerCount = 5;

    const onRegionChange = useCallback(region => {
        setRegion(region);
        return;
        if (debounceRef?.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
            debounceRef.current = setTimeout(() => {
                setRegion(region);
            }, timerCount);
        } else {
            debounceRef.current = setTimeout(() => {}, timerCount);
        }
    }, []);
    return (
        <MapView
            style={{flex: 1}}
            initialRegion={{...region, latitudeDelta: 0.003, longitudeDelta: 0.003}}
            onRegionChange={onRegionChange}
            onPress={e => console.log(e.nativeEvent.coordinate)}
            zoomControlEnabled
            mapType="standard"
            showsUserLocation>
            {isMarker && (
                <>
                    <Marker icon={LocationMarkerIcon} ref={ref} coordinate={{...region, latitudeDelta: 0.003, longitudeDelta: 0.003}} onCalloutPress={onPressMarker} onPress={onPressMarker}>
                        <Callout tooltip={true}>
                            <View
                                style={{
                                    width: getPixel(250),
                                    minHeight: getHeightPixel(70),
                                    height: getHeightPixel(50 + 20 * lineLength),
                                    backgroundColor: Theme.color.white,
                                    borderRadius: 16,
                                    paddingHorizontal: getPixel(14),
                                    paddingVertical: getHeightPixel(14),
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}>
                                    <RNText
                                        style={{
                                            marginRight: getPixel(5),
                                        }}>
                                        <Image
                                            source={LocationIcon}
                                            style={{
                                                width: getPixel(11),
                                                height: getPixel(13),
                                            }}
                                        />
                                    </RNText>
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                width: getPixel(200),
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                            <Text fontSize={`${12 * fontSize}`} bold>
                                                위치 정보
                                            </Text>
                                            <RNText>
                                                <Image
                                                    source={ArrowRightIcon}
                                                    style={{
                                                        width: getPixel(20),
                                                        height: getPixel(20),
                                                    }}
                                                />
                                            </RNText>
                                        </View>
                                        <Text fontSize={`${12 * fontSize}`} onTextLayout={e => setLineLength(e.nativeEvent.lines.length)} style={{width: getPixel(162)}}>
                                            {markerInfo?.description}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                </>
            )}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
