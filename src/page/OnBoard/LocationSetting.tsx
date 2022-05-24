import {Dimensions, FlatList, Image, ImageBackground, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {Fragment, useCallback, useEffect, useLayoutEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationGrayBoxIcon from '@assets/image/location_gray_box.png';
import SearchIcon from '@assets/image/search.png';
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
import Screen, {LocationSettingProps} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useAutoCompleteLocation from '@/Hooks/useAutoCompleteLocation';
import useGeoLocation from '@/Hooks/useGeoLocation';
import useGeocoding from '@/Hooks/useGeocoding';
import {API} from '@/API/API';
import axios from 'axios';

const LocationSetting = ({navigation}: LocationSettingProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {token} = useAppSelector(state => state.global.data);
    const {text, setText, locationList} = useAutoCompleteLocation('Bom Retiro');
    const {region, isLoading, setRegion} = useGeoLocation();
    const {city, detail, isLoading: isGeocodingLoading, location, locationName} = useGeocoding(region);

    const onPressItem = useCallback(
        async (placeId: string) => {
            const res = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                params: {
                    place_id: placeId,
                    sessiontoken: token,
                    key: 'AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704',
                },
            });

            if (res.data?.status === 'OK') {
                console.log(res.data.result.geometry.location);
            }
        },
        [token],
    );

    const onPressNext = useCallback(() => {
        AsyncStorage.setItem('done', 'Login');
        navigation.reset({
            routes: [
                {
                    name: 'Login',
                },
            ],
        });
    }, []);
    useLayoutEffect(() => {
        (async () => {
            const location = await AsyncStorage.getItem('location');
            if (location) {
                console.log(location);
            }
        })();
    }, []);
    return (
        <>
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                    <Text fontSize={`${24 * fontSize}`}>{t('locationSetting')}</Text>
                    <View style={styles.searchView}>
                        <Image source={SearchIcon} style={styles.searchImage} resizeMode="contain" />
                        <TextInput
                            value={text}
                            onChangeText={setText}
                            style={[
                                styles.textInput,
                                {
                                    fontSize: fontSize * 14,
                                },
                            ]}
                            placeholder={t('addressPh')}
                            placeholderTextColor={Theme.color.gray}
                        />
                    </View>
                    <View style={styles.imageView}>
                        <Image source={require('@assets/image/my_location.png')} resizeMode="contain" style={styles.image} />
                        <Text fontSize={`${12 * fontSize}`} medium>
                            {t('nowLocation')}
                        </Text>
                    </View>
                    <Line isGray style={{marginTop: getHeightPixel(15)}} width={getPixel(288)} />
                    <Line height={getHeightPixel(5)} width={getPixel(288)} />
                    {Array.isArray(locationList) &&
                        locationList.map(v => {
                            return (
                                <>
                                    <TouchableOpacity style={{flexDirection: 'row', paddingVertical: getHeightPixel(14)}} onPress={() => onPressItem(v.place_id)}>
                                        <Image
                                            source={LocationGrayBoxIcon}
                                            style={{
                                                width: getPixel(20),
                                                height: getPixel(20),
                                                marginRight: getPixel(12),
                                                marginTop: getHeightPixel(3),
                                            }}
                                            resizeMode="contain"
                                        />
                                        <View>
                                            <Text fontSize={`${16 * fontSize}`}>{v?.structured_formatting?.main_text}</Text>
                                            <GrayText fontSize={`${12 * fontSize}`}>{v?.structured_formatting?.secondary_text}</GrayText>
                                        </View>
                                    </TouchableOpacity>
                                    <Line isGray />
                                </>
                            );
                        })}
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Button style={styles.button} width="288px" content={t('next')} onPress={onPressNext} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
};

export default LocationSetting;

const styles = StyleSheet.create({
    mainContainer: {flex: 1, paddingHorizontal: getPixel(36), paddingTop: getHeightPixel(30)},
    searchView: {flexDirection: 'row', alignItems: 'center', borderBottomColor: Theme.color.gray, borderBottomWidth: 0.4, marginTop: getHeightPixel(30)},
    searchImage: {width: getPixel(15), height: getPixel(15)},
    textInput: {
        flex: 1,
        paddingLeft: getPixel(15),
        color: Theme.color.black,
        minHeight: getHeightPixel(50),
    },
    imageView: {width: getPixel(288), justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: getHeightPixel(15)},
    button: {alignSelf: 'center', marginBottom: getHeightPixel(36)},

    image: {
        width: getPixel(13.17),
        height: getPixel(13.17),
    },
});
