import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {ChattingLocationProps} from '@/Types/Screen/Screen';

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
        if (!locationName || !detail) {
            return null;
        }
        navigation.navigate('ChattingDetail', {
            region,
            location: locationName,
            locationDetail: detail,
            chat_idx: undefined,
        });
    }, [region, locationName, detail]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={{flex: 1}}>
            {isGeoLoading && (
                <View style={styles.loadingView}>
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
    loadingView: {
        position: 'absolute',
        width: getPixel(360),
        height: getHeightPixel(740),
        backgroundColor: '#0001',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
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
});
