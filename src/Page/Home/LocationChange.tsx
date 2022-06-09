import {View, Image, StyleSheet, StatusBar, Animated, PanResponder, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import MapMarkerIcon from '@assets/image/map-marker_indigo.png';
import {BoldText, GrayText, MediumText, Text, WhiteText} from '@/Components/Global/text';
import Theme from '@/assets/global/Theme';
import Map from '@/Components/Chatting/Map';
import {Slider} from '@miblanchard/react-native-slider';
import MapPersonIcon from '@assets/image/map_person.png';
import AutoHeightImage from 'react-native-auto-height-image';
import {rangeList} from '@/assets/global/dummy';
import {LocationChangeProps} from '@/Types/Screen/Screen';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {AlertButton, geoLanguage} from '@/Util/Util';
import useGeocoding from '@/Hooks/useGeocoding';
import {usePostSend} from '@/Hooks/useApi';
import {selectUser} from '@/Store/userState';
import Loading from '@/Components/Global/Loading';
import {LocationChangeApi} from '@/Types/API/HomeTypes';
import useGeoLocation from '@/Hooks/useGeoLocation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function LocationChange({navigation}: LocationChangeProps): JSX.Element | null {
    const {t, i18n} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const [selectRange, setSelectRange] = useState<number>(4);
    const [isLocation, setIsLocation] = useState(true);
    const {isLoading: isLocationLoading, region, setRegion} = useGeoLocation();
    const {location, detail, city, locationName, isLoading} = useGeocoding(region);

    const {PostAPI} = usePostSend<LocationChangeApi, any>('mt_location_modify.php', {
        mt_idx: user.mt_idx as string,
        mt_location: city,
        mt_lat: region.latitude,
        mt_lng: region.longitude,
        mt_limit: selectRange * 5,
    });

    const onPressSubmit = () => {
        PostAPI().then(res => {
            if (res?.result === 'false' && res?.msg) {
                AlertButton(res?.msg);
            } else {
                navigation.goBack();
            }
        });
    };

    if (isLocationLoading) {
        return null;
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            {isLoading && (
                <View style={styles.loading}>
                    <Loading />
                </View>
            )}
            <Header title={t('locationChangeTitle')} />
            <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: getHeightPixel(100)}}>
                <View
                    style={{
                        width: getPixel(360),
                        height: getHeightPixel(338),
                        backgroundColor: '#0008',
                    }}>
                    <Map region={region} setRegion={setRegion} isMarker={true} />
                    <View style={styles.absoluteLocation}>
                        <WhiteText fontSize={`${12 * fontSize}`}>{t('mapPh')}</WhiteText>
                    </View>
                </View>
                <View style={styles.markerView}>
                    <Image source={MapMarkerIcon} style={styles.markerImage} />
                    <View
                        style={{
                            marginLeft: getPixel(5),
                        }}>
                        <Text fontSize={`${16 * fontSize}`}>{detail}</Text>
                        <GrayText fontSize={`${12 * fontSize}`}>{locationName}</GrayText>
                    </View>
                </View>
                <View style={styles.locationAreaView}>
                    <BoldText fontSize={`${14 * fontSize}`}>{t('locationAreaSelect')}</BoldText>
                    <View style={styles.locationTextView}>
                        <Text fontSize={`${14 * fontSize}`}>
                            {city}
                            {t('at')}
                        </Text>
                        <BoldText fontSize={`${14 * fontSize}`}>{rangeList[selectRange - 1] + t('range')}</BoldText>

                        <Text fontSize={`${14 * fontSize}`}>{t('by')}</Text>
                    </View>

                    <Slider
                        value={selectRange}
                        onValueChange={value => {
                            if (typeof value === 'object' && value[0] && value[0] !== 1) {
                                setSelectRange(value[0]);
                            }
                        }}
                        maximumValue={5}
                        minimumValue={1}
                        step={1}
                        trackStyle={{
                            backgroundColor: Theme.color.whiteGray_EE,
                            height: getHeightPixel(8),
                            borderRadius: 8,
                        }}
                        minimumTrackTintColor={Theme.color.blue_3D}
                        thumbStyle={{
                            backgroundColor: Theme.color.white,
                            borderWidth: 3,
                            borderColor: Theme.color.blue_3D,
                        }}
                    />
                    <View
                        style={{
                            width: getPixel(328),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View>
                            <AutoHeightImage source={MapPersonIcon} width={getPixel(15)} />
                        </View>
                        <View style={styles.locationView1}>
                            <Text fontSize={`${14 * fontSize}`} medium>
                                {t('5km')}
                            </Text>
                        </View>
                        <View>
                            <Text fontSize={`${14 * fontSize}`} medium>
                                {t('10km')}
                            </Text>
                        </View>
                        <View>
                            <Text fontSize={`${14 * fontSize}`} medium>
                                {t('20km')}
                            </Text>
                        </View>
                        <View>
                            <Text fontSize={`${14 * fontSize}`} medium>
                                {t('40km')}
                            </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity onPress={onPressSubmit} style={styles.button}>
                <WhiteText medium fontSize={`${18 * fontSize}`}>
                    선택한 위치로 설정
                </WhiteText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#0004',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: getPixel(360),
        height: getHeightPixel(54),
        backgroundColor: Theme.color.blue_3D,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationView1: {
        marginLeft: getPixel(20),
    },
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
    progressIcon: {
        width: getPixel(20),
        height: getPixel(20),
        backgroundColor: Theme.color.white,
        borderWidth: 3,
        borderColor: Theme.color.blue_3D,
        borderRadius: 100,
    },
    locationTextView: {
        flexDirection: 'row',
        marginTop: getHeightPixel(10),
        marginBottom: getHeightPixel(20),
    },
    locationAreaView: {
        marginTop: getHeightPixel(27),
        marginHorizontal: getPixel(16),
        width: getPixel(328),
    },
    markerImage: {
        width: getPixel(14),
        height: getPixel(18),
        marginTop: getHeightPixel(5),
    },
    markerView: {
        flexDirection: 'row',
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        marginTop: getHeightPixel(26),
        paddingBottom: getHeightPixel(20),
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
    },
});
