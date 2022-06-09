import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton} from '@/Util/Util';
import {Text} from '@Components/Global/text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {AppPermissionProps} from '@Types/Screen/Screen';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

const AndroidPermission = [
    PERMISSIONS.ANDROID.READ_SMS,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.CAMERA,
];

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export default function AppPermission({navigation}: AppPermissionProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const onPressAll = useCallback(async () => {
        if (Platform.OS === 'android') {
            const result = await requestMultiple(AndroidPermission).then(state => {
                if (
                    state[AndroidPermission[0]] === 'granted' &&
                    state[AndroidPermission[1]] === 'granted' &&
                    state[AndroidPermission[2]] === 'granted' &&
                    state[AndroidPermission[3]] === 'granted' &&
                    state[AndroidPermission[4]] === 'granted'
                ) {
                    AsyncStorage.setItem('done', 'LocationSetting');
                    return navigation.reset({
                        routes: [
                            {
                                name: 'LocationSetting',
                            },
                        ],
                    });
                } else {
                    AlertButton(t('appPermissionAlert'));
                }
            });
        } else {
            await requestUserPermission();
        }
    }, []);

    const menuList = [
        {
            title: 'call',
            require: 'require',
            content: 'appPermissionGuide2',
            image: require('@assets/image/phone_blue.png'),
        },
        {
            title: 'storage',
            require: 'require',
            content: 'appPermissionGuide3',
            image: require('@assets/image/storage_space.png'),
        },
        {
            title: 'locationInformation',
            require: 'require',
            content: 'appPermissionGuide4',
            image: require('@assets/image/location2.png'),
        },
        {
            title: 'cameraGallery',
            require: 'option',
            content: 'appPermissionGuide5',
            image: require('@assets/image/camera.png'),
        },
        {
            title: 'modalMyPageAlarm',
            require: 'option',
            content: 'appPermissionGuide6',
            image: require('@assets/image/notice_color.png'),
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text fontSize={`${24 * fontSize}`} medium>
                    {t('appPermissionGuide')}
                </Text>
                <View style={{height: getHeightPixel(40)}} />
                {menuList.map(item => {
                    return (
                        <TouchableOpacity style={styles.rowTouch} key={item.title}>
                            <View style={styles.permissionView}>
                                <AutoHeightImage width={getPixel(20)} source={item.image} />
                            </View>
                            <View>
                                <View style={styles.rowCenterView}>
                                    <Text style={styles.marginText} fontSize={`${16 * fontSize}`} medium>
                                        {t(item.title)}
                                    </Text>
                                    <Text color={item.require === 'require' ? Theme.color.red : Theme.color.black} fontSize={`${16 * fontSize}`}>
                                        {t(item.require)}
                                    </Text>
                                </View>
                                <Text style={[styles.marginText, styles.textWidth]} color={Theme.color.darkGray_78} fontSize={`${13 * fontSize}`}>
                                    {t(item.content)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Button content={t('next')} onPress={onPressAll} style={styles.button} />
        </View>
    );
}

const styles = StyleSheet.create({
    rowCenterView: {flexDirection: 'row', alignItems: 'center'},
    permissionView: {
        alignSelf: 'flex-start',
        paddingTop: getHeightPixel(5),
    },
    button: {
        position: 'absolute',
        bottom: getHeightPixel(32),
        left: getPixel(32),
    },
    mainView: {
        width: getPixel(288),
        paddingTop: getHeightPixel(30),
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textWidth: {
        width: getPixel(232),
    },
    marginTop30: {
        marginTop: getHeightPixel(30),
    },
    rowTouch: {
        width: getPixel(288),
        flexDirection: 'row',
        marginBottom: getHeightPixel(25),
        alignItems: 'center',
    },
    marginText: {
        marginLeft: getPixel(16),
        marginRight: getPixel(5),
    },
});
