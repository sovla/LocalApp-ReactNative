import Theme from '@/assets/global/Theme';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import ArrowRightIcon from '@assets/image/arrow_right_new.png';
import LocationIcon from '@assets/image/location.png';
import LocationMarkerIcon from '@assets/image/location_marker.png';
import WhiteBoxDownIcon from '@assets/image/white_box_down.png';
import {Text} from '@Components/Global/text';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text as RNText, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import MapView, {Callout, Marker} from 'react-native-maps';

const Map: React.FC<{
    region: {
        latitude: number;
        longitude: number;
    };
    setRegion?: React.Dispatch<
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
    isShow?: boolean;
}> = ({region, setRegion, isMarker = true, markerInfo, onPressMarker, isShow}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();
    const [lineLength, setLineLength] = useState(3);
    const ref = useRef<Marker | null>(null);
    const debounceRef = useRef<any>(null);
    useEffect(() => {
        ref.current?.showCallout();
    }, [markerInfo, lineLength]);
    const timerCount = 7;

    const onRegionChange = useCallback(region => {
        // if (setRegion) setRegion(region);
        // return;

        if (debounceRef?.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
            debounceRef.current = setTimeout(() => {
                setRegion && setRegion(region);
            }, timerCount);
        } else {
            debounceRef.current = setTimeout(() => {}, timerCount);
        }
    }, []);

    const _onPressMarker = () => {
        if (isShow) {
            return null;
        } else if (onPressMarker && !isShow) {
            onPressMarker();
        }
    };
    return (
        <MapView
            style={{flex: 1}}
            initialRegion={{...region, latitudeDelta: 0.003, longitudeDelta: 0.003}}
            onRegionChangeComplete={region => onRegionChange(region)}
            onRegionChange={onRegionChange}
            zoomControlEnabled
            mapType="standard"
            showsUserLocation>
            {isMarker && (
                <>
                    <Marker icon={LocationMarkerIcon} ref={ref} coordinate={{...region, latitudeDelta: 0.003, longitudeDelta: 0.003}} onCalloutPress={_onPressMarker} onPress={_onPressMarker}>
                        {onPressMarker != null && markerInfo && markerInfo?.description?.length > 0 && (
                            <Callout tooltip={true}>
                                <View
                                    style={{
                                        width: getPixel(250),
                                        height: getHeightPixel(60) + 18 * lineLength,
                                    }}>
                                    <View
                                        style={{
                                            ...styles.callOutView,
                                            height: getHeightPixel(50) + 18 * lineLength,
                                        }}>
                                        <View style={styles.row}>
                                            <RNText style={styles.locationImageText}>
                                                <Image source={LocationIcon} style={styles.locationImage} />
                                            </RNText>
                                            <View>
                                                <View style={styles.whiteInnerView}>
                                                    <Text fontSize={`${12 * fontSize}`} bold>
                                                        위치 정보
                                                    </Text>
                                                    <RNText>
                                                        <Image source={ArrowRightIcon} style={styles.arrowRightImage} />
                                                    </RNText>
                                                </View>
                                                <Text fontSize={`${12 * fontSize}`} onTextLayout={e => setLineLength(e.nativeEvent.lines.length)} style={{width: getPixel(162)}}>
                                                    {markerInfo?.description}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.tooltipView}>
                                            <RNText>
                                                <AutoHeightImage
                                                    style={{
                                                        zIndex: 200,
                                                    }}
                                                    width={getPixel(20)}
                                                    source={WhiteBoxDownIcon}
                                                />
                                            </RNText>
                                        </View>
                                    </View>
                                </View>
                            </Callout>
                        )}
                    </Marker>
                </>
            )}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({
    tooltipView: {
        position: 'absolute',
        bottom: -getHeightPixel(10),
        left: getPixel(250 / 2 - 10),
        zIndex: 150,
    },
    arrowRightImage: {
        width: getPixel(20),
        height: getPixel(20),
    },
    whiteInnerView: {
        flexDirection: 'row',
        width: getPixel(200),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationImage: {
        width: getPixel(11),
        height: getPixel(13),
    },
    locationImageText: {
        marginRight: getPixel(5),
        marginTop: getHeightPixel(3),
    },
    row: {
        flexDirection: 'row',
    },
    callOutView: {
        width: getPixel(250),
        minHeight: getHeightPixel(70),
        backgroundColor: Theme.color.white,
        borderRadius: 16,
        paddingHorizontal: getPixel(14),
        paddingVertical: getHeightPixel(14),
    },
});
