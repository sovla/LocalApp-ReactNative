import Theme from '@/assets/global/Theme';
import Line from '@/Components/Global/Line';
import Loading from '@/Components/Global/Loading';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ProductLocationProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationGrayIcon from '@assets/image/location_gray.png';
import MyLocationIcon from '@assets/image/my_location.png';
import {GrayText, Text} from '@Components/Global/text';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

const ProductLocation = ({navigation, route: {params}}: ProductLocationProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {
        global: {
            data: {token},
        },
    } = useAppSelector(state => state);
    // const {} = useGeocoding()

    const [locationList, setLocationList] = useState<any>([]);
    const [text, setText] = useState('Bom retiro');
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    const onSubmit = useCallback(() => {
        const config: any = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=establishment&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704&sessionToken=${token}`,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                console.log(response.data);

                if (response.data.status === 'OK') {
                    setLocationList(response.data.predictions);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [text]);
    useEffect(() => {
        onSubmit();
    }, [text]);
    useEffect(() => {
        return () => setIsSearchLoading(false);
    }, []);
    const onPress = useCallback(main_text => {
        setIsSearchLoading(true);
        const config: any = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${main_text}&inputtype=textquery&locationbias=circle%3A2000%4047.6918452%2C-122.2226413&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704&sessionToken=${token}`,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                console.log(response);
                if (response.data.status === 'OK') {
                    const item = response.data.candidates[0];

                    if (params?.navigate === 'BusinessSignUpForm' || params?.navigate === 'BusinessProfileSetting') {
                        navigation.navigate(params.navigate, {
                            location: item?.name as string,
                            pt_location_detail: item?.formatted_address as string,
                            pt_lat: item?.geometry?.location?.lat as number,
                            pt_lng: item?.geometry?.location?.lng as number,
                        });
                    } else {
                        navigation.navigate('ProductUpdate', {
                            location: item?.name as string,
                            pt_location_detail: item?.formatted_address as string,
                            pt_lat: item?.geometry?.location?.lat as number,
                            pt_lng: item?.geometry?.location?.lng as number,
                        });
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setIsSearchLoading(false);
            });
    }, []);

    return (
        <View>
            {isSearchLoading && <Loading isAbsolute backgroundColor="#0003" />}
            <Header title={params?.navigate ? t('businessProfileSettingShopAddress') : t('tradingLocationUpdate')} />
            <FlatList
                data={locationList}
                ListHeaderComponent={
                    <>
                        <View style={styles.headerView}>
                            <Text medium fontSize={`${20 * fontSize}`} style={styles.headerText}>
                                {t('locationUpdateGuide1')}
                            </Text>
                            <View>
                                <TextInput
                                    onSubmitEditing={onSubmit}
                                    style={[
                                        styles.textInput,
                                        {
                                            fontSize: fontSize * 16,
                                        },
                                    ]}
                                    value={text}
                                    onChangeText={setText}
                                    placeholder="Run Tres Rios"
                                    placeholderTextColor={Theme.color.gray_BB}
                                />
                            </View>
                            <TouchableOpacity style={styles.headerLocationTouch}>
                                <AutoHeightImage source={MyLocationIcon} width={getPixel(20)} />
                                <Text fontSize={`${14 * fontSize}`}>{t('myLocation')}</Text>
                            </TouchableOpacity>
                        </View>
                        <Line height={getHeightPixel(10)} />
                    </>
                }
                renderItem={({item, index}) => {
                    return (
                        <LocationSelect
                            onPress={() => onPress(item.structured_formatting.main_text)}
                            locationTitle={item.structured_formatting.main_text}
                            locationSubTitle={item.structured_formatting.secondary_text}
                        />
                    );
                }}
                ListFooterComponent={
                    <View
                        style={{
                            height: getHeightPixel(110),
                        }}
                    />
                }
            />
        </View>
    );
};

export default ProductLocation;

const LocationSelect: React.FC<{
    onPress?: () => void;
    locationTitle: string;
    locationSubTitle: string;
}> = ({locationTitle, locationSubTitle, onPress}) => {
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <>
            <TouchableOpacity onPress={onPress} style={styles.locationTouch}>
                <AutoHeightImage
                    source={LocationGrayIcon}
                    width={getPixel(14)}
                    style={{
                        marginTop: getHeightPixel(5),
                    }}
                />
                <View
                    style={{
                        marginLeft: getPixel(16),
                    }}>
                    <Text fontSize={`${16 * fontSize}`}>{locationTitle}</Text>
                    <GrayText fontSize={`${12 * fontSize}`}>{locationSubTitle}</GrayText>
                </View>
            </TouchableOpacity>
            <Line isGray />
        </>
    );
};

const styles = StyleSheet.create({
    headerText: {
        marginTop: getHeightPixel(30),
        marginBottom: getHeightPixel(20),
    },
    locationTouch: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        paddingVertical: getHeightPixel(20),
        flexDirection: 'row',
        paddingTop: getHeightPixel(14),
        alignItems: 'flex-start',
    },
    headerView: {
        marginHorizontal: getPixel(16),
        width: getPixel(328),
    },
    textInput: {
        width: getPixel(328),
        minHeight: getHeightPixel(40),

        backgroundColor: Theme.color.gray_F1,
        borderRadius: getPixel(4),
        color: Theme.color.black,
    },
    headerLocationTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: getHeightPixel(20),
    },
    tierImageView: {
        position: 'absolute',
        bottom: getHeightPixel(0),
        right: getPixel(5),
        width: getPixel(60),
        height: getHeightPixel(60),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    tierImage: {
        width: getPixel(60),
        height: getHeightPixel(67.8),
    },
    boxContainer: {
        marginHorizontal: getPixel(16),
        marginBottom: getHeightPixel(16),
    },
    contentText: {
        width: getPixel(221),
    },
    boxView: {
        width: getPixel(328),
        height: getHeightPixel(100),
        borderRadius: getPixel(10),
        paddingTop: getHeightPixel(16),
        paddingLeft: getPixel(18),
    },
});
