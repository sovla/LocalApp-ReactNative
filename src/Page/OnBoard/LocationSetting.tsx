import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {useAppSelector} from '@/Hooks/CustomHook';
import useAutoCompleteLocation from '@/Hooks/useAutoCompleteLocation';
import useGeocoding, {getReverseGeoCoding} from '@/Hooks/useGeocoding';
import useGeoLocation from '@/Hooks/useGeoLocation';
import {LocationSettingProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationGrayBoxIcon from '@assets/image/location_gray_box.png';
import SearchIcon from '@assets/image/search.png';
import {GrayText, Text} from '@Components/Global/text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Fragment, useCallback, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LocationSetting = ({navigation}: LocationSettingProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {token} = useAppSelector(state => state.global.data);
    const {text, setText, locationList} = useAutoCompleteLocation('Bom Retiro');
    const {region, isLoading, setRegion} = useGeoLocation();
    const {city, detail, isLoading: isGeocodingLoading, location, locationName} = useGeocoding(region);

    const [isCurrentLocation, setIsCurrentLocation] = useState(false);

    const onPressItem = useCallback(
        async (placeId?: string | undefined) => {
            if (placeId) {
                const res = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                    params: {
                        place_id: placeId,
                        sessiontoken: token,
                        key: 'AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704',
                    },
                });

                if (res.data?.status === 'OK') {
                    const {
                        city: _city,
                        detail: _detail,
                        locationName: _locationName,
                    } = await getReverseGeoCoding({
                        latitude: res.data.result.geometry.location.lat,
                        longitude: res.data.result.geometry.location.lng,
                    });
                    AsyncStorage.setItem(
                        'location',
                        JSON.stringify({
                            lat: res.data.result.geometry.location.lat,
                            lng: res.data.result.geometry.location.lng,
                            city: _city,
                            detail: _detail,
                            locationName: _locationName,
                        }),
                    );
                    onPressNext();
                }
            } else {
                AsyncStorage.setItem(
                    'location',
                    JSON.stringify({
                        lat: region.latitude,
                        lng: region.longitude,
                        city,
                        detail,
                        locationName,
                    }),
                );
                onPressNext();
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

    useLayoutEffect(() => {
        if (isCurrentLocation) {
            setIsCurrentLocation(false);
        }
    }, [text]);
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
                    <TouchableOpacity onPress={() => setIsCurrentLocation(true)} style={styles.imageView}>
                        <Image source={require('@assets/image/my_location.png')} resizeMode="contain" style={styles.image} />
                        <Text fontSize={`${12 * fontSize}`} medium>
                            {t('nowLocation')}
                        </Text>
                    </TouchableOpacity>
                    <Line isGray style={{marginTop: getHeightPixel(15)}} width={getPixel(288)} />
                    <Line height={getHeightPixel(5)} width={getPixel(288)} />
                    {isCurrentLocation && (
                        <>
                            <TouchableOpacity style={{flexDirection: 'row', paddingVertical: getHeightPixel(14)}} onPress={() => onPressItem()}>
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
                                    <Text fontSize={`${16 * fontSize}`}>{city}</Text>
                                    <GrayText fontSize={`${12 * fontSize}`}>{detail}</GrayText>
                                </View>
                            </TouchableOpacity>
                            <Line isGray />
                        </>
                    )}
                    {Array.isArray(locationList) &&
                        !isCurrentLocation &&
                        locationList.map((v: any, index) => {
                            return (
                                <Fragment key={index}>
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
                                </Fragment>
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
