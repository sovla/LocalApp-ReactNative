import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import ArrowRightWhiteIcon from '@assets/image/arrow_right_white.png';
import ArrowRightIcon from '@assets/image/arrow_right.png';

import MapView, {Marker} from 'react-native-maps';
import {LocationChattingProps} from '@/Types/Components/ChattingTypes';
import AutoHeightImage from 'react-native-auto-height-image';

const LocationChatting: React.FC<LocationChattingProps> = ({date, content, isCheck, isMy, region}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();

    const location = JSON.parse(region);
    const onPressLocation = useCallback(() => {
        navigation.navigate('ChattingLocation');
    }, []);

    return (
        <View
            style={[
                styles.container,
                {
                    justifyContent: isMy ? 'flex-end' : 'flex-start',
                },
            ]}>
            {isMy ? (
                <View style={styles.dateView}>
                    <View style={styles.rowCenter}>
                        {isCheck && isCheck > 0 && <Image source={isCheck === 1 ? require('@assets/image/check.png') : require('@assets/image/check_double.png')} style={styles.checkImage} />}

                        <Text fontSize={`${11 * fontSize}`} color="#59636C">
                            {date}
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.profileView}>
                    <Image source={require('@assets/image/dummy.png')} style={styles.profileImage} />
                </View>
            )}

            <View
                style={[
                    styles.chattingView,
                    {
                        backgroundColor: isMy ? Theme.color.blue_3D : Theme.color.white,
                    },
                ]}>
                <MapView
                    initialRegion={{
                        ...location,
                    }}
                    zoomEnabled={false}
                    zoomTapEnabled={false}
                    zoomControlEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    region={{
                        ...location,
                    }}
                    style={{
                        width: getPixel(245),
                        height: getHeightPixel(110),
                    }}>
                    <Marker
                        coordinate={{
                            ...location,
                        }}
                    />
                </MapView>
                <TouchableOpacity onPress={onPressLocation} style={styles.mapContentTouch}>
                    <Text color={isMy ? Theme.color.white : Theme.color.black} style={styles.mapContentView} fontSize={`${12 * fontSize}`} medium>
                        {content}
                    </Text>
                    <Image source={isMy ? require('@assets/image/arrow_right_white.png') : require('@assets/image/arrow_right_new.png')} style={styles.mapContentArrowImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LocationChatting;

const styles = StyleSheet.create({
    mapContentArrowImage: {width: getPixel(30), height: getPixel(30)},
    mapContentView: {
        width: getPixel(200),
    },
    mapContentTouch: {
        width: getPixel(245),
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: getPixel(16),
    },
    checkImage: {
        width: getPixel(24),
        height: getPixel(24),
    },
    rowCenter: {flexDirection: 'row', alignItems: 'center'},
    container: {
        height: getHeightPixel(160),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: getPixel(360),
        paddingHorizontal: getPixel(16),
        marginTop: getHeightPixel(15),
    },
    dateView: {
        marginRight: getPixel(5),
        justifyContent: 'flex-end',
        marginBottom: getHeightPixel(3),
    },
    chattingView: {
        width: getPixel(245),
        height: getHeightPixel(160),
        borderRadius: getPixel(15),
        backgroundColor: Theme.color.blue_3D,
        overflow: 'hidden',
    },
    profileView: {
        width: getHeightPixel(44),
        height: getHeightPixel(44),
        borderRadius: getPixel(16),
        overflow: 'hidden',
        marginRight: getPixel(8),
    },
    profileImage: {width: getHeightPixel(44), height: getHeightPixel(44)},
});
