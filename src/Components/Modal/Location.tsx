import Theme from '@/assets/global/Theme';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {LocationChangeApi, LocationListApi, locationListItem} from '@/Types/API/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton, getHitSlop} from '@/Util/Util';
import CloseIcon from '@assets/image/close.png';
import CloseBlackIcon from '@assets/image/close_black.png';
import MyLocationIcon from '@assets/image/my-location.png';
import SearchIcon from '@assets/image/search.png';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {BoldText, GrayText, MediumText, Text} from '../Global/text';

export default function Location({offIsModal}: {offIsModal: any}): JSX.Element {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();

    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const {data: usedList, isLoading, isError, errorMessage, getData} = useApi<LocationListApi['T'], LocationListApi['D']>(null, 'mt_location_history.php', {mt_idx: user.mt_idx as string});

    const {PostAPI} = usePostSend<LocationChangeApi, any>('mt_location_modify.php', {
        mt_idx: user.mt_idx as string,
    });
    const {PostAPI: deleteLocationHistory} = usePostSend<
        {
            mt_idx: string;
            his_idx?: string;
        },
        any
    >('mt_location_history_del.php', {
        mt_idx: user.mt_idx as string,
    });

    const onPressLocation = useCallback(() => {
        offIsModal();
        navigation.navigate('LocationChange');
    }, []);

    const onPressItem = useCallback((item: locationListItem) => {
        PostAPI({
            mt_lat: item.his_lat,
            mt_limit: item.his_limit,
            mt_lng: item.his_lng,
            mt_location: item.his_location,
        }).then(res => {
            if (res?.result === 'false' && res?.msg) {
                AlertButton(res.msg);
            } else {
                offIsModal();
            }
        });
    }, []);

    const onPressDeleteItem = useCallback((his_idx: string) => {
        deleteLocationHistory({
            his_idx: his_idx,
        }).then(res => {
            if (res?.result === 'false' && res?.msg) {
                AlertButton(res.msg);
            } else {
                getData();
            }
        });
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={styles.space} />
            <Shadow>
                <View style={styles.whiteBox}>
                    <BoldText fontSize={`${20 * fontSize}`}>{t('locationChange')}</BoldText>

                    <View style={{marginTop: getHeightPixel(8)}}>
                        <TextInput
                            style={[
                                styles.textInput,
                                {
                                    fontSize: 11 * fontSize,
                                },
                            ]}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChangeText={setValue}>
                            {!isFocus && value?.length === 0 && <GrayText fontSize={`${11 * fontSize}`}>{t('locationPlaceholder')}</GrayText>}
                        </TextInput>
                        <Image source={SearchIcon} style={styles.searchImage} />
                    </View>
                    <View style={styles.locationView}>
                        <Image source={MyLocationIcon} style={styles.locationImage} />
                        <TouchableOpacity hitSlop={getHitSlop(5)} onPress={onPressLocation}>
                            <MediumText fontSize={`${12 * fontSize}`}>{t('nowLocation')}</MediumText>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                    {!isFocus && <BoldText fontSize={`${14 * fontSize}`}>{t('areaUsed')}</BoldText>}

                    <ScrollView>
                        {!isFocus &&
                            Array.isArray(usedList) &&
                            usedList.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => onPressItem(item)} style={styles.usedLocationView}>
                                        <Text fontSize={`${14 * fontSize}`}>{item.his_location}</Text>
                                        <TouchableOpacity onPress={() => onPressDeleteItem(item.his_idx)} hitSlop={getHitSlop(5)}>
                                            <Image source={CloseIcon} style={styles.deleteIcon} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                );
                            })}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeBlackTouch} onPress={offIsModal} hitSlop={getHitSlop(5)}>
                        <Image source={CloseBlackIcon} style={styles.closeBlackImage} />
                    </TouchableOpacity>
                </View>
            </Shadow>
        </View>
    );
}

const styles = StyleSheet.create({
    closeBlackImage: {
        width: getPixel(15),
        height: getPixel(15),
    },
    closeBlackTouch: {
        position: 'absolute',
        top: getHeightPixel(21),
        right: getPixel(16),
    },
    usedLocationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: getPixel(328),
        marginTop: 10,
    },
    deleteIcon: {
        width: getPixel(20),
        height: getPixel(20),
    },
    locationImage: {
        width: getPixel(13.2),
        height: getPixel(13.2),
        marginRight: 5,
    },
    line: {
        backgroundColor: Theme.color.gray,
        height: 0.4,
        marginTop: getHeightPixel(8.7),
        marginBottom: getHeightPixel(20),
    },
    locationView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: getHeightPixel(10),
    },
    space: {
        height: getHeightPixel(230),
    },
    searchImage: {
        position: 'absolute',
        left: getPixel(10),
        top: getHeightPixel(10),
        width: getPixel(15),
        height: getPixel(15),
    },
    textInput: {
        width: getPixel(328),
        height: getHeightPixel(35),
        backgroundColor: Theme.color.gray_F5,
        borderRadius: getPixel(20),
        paddingVertical: getHeightPixel(10),
        paddingLeft: getPixel(31),
        paddingRight: getPixel(10),
        color: Theme.color.darkBlue_0F,
        fontFamily: Theme.fontWeight.medium,
    },
    whiteBox: {
        width: getPixel(360),
        height: getHeightPixel(510),
        backgroundColor: Theme.color.white,
        borderTopLeftRadius: getPixel(20),
        borderTopRightRadius: getPixel(20),
        paddingTop: getHeightPixel(36),
        paddingHorizontal: getHeightPixel(16),
    },
});
