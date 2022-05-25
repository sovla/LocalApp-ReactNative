/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {WhiteText} from '@/Components/Global/text';
import useChannelManagement from '@/Hooks/useChannelManagement';
import store from '@/Store/store';
import {showToastMessage} from '@/Util/Util';
import {t} from 'i18next';
import React, {useEffect, useRef} from 'react';
import {BackHandler, Platform, Text, TouchableOpacity, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast, {ToastConfigParams} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Router from './src/Page/Router';

const App = () => {
    const backRef = useRef<NodeJS.Timeout | null>(null);
    useChannelManagement();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (backRef.current == null) {
                showToastMessage(t('exitApp'), 1000);
                backRef.current = setTimeout(() => {
                    backRef.current = null;
                }, 1000);
                return true;
            } else {
                BackHandler.exitApp();
                return true;
            }
        });

        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => {
                backRef.current = null;
                return true;
            });
        };
    }, []);

    const toastConfig = {
        customToast: ({text1, onPress, isVisible, hide, position, show, type, props}: ToastConfigParams<any>) => (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    width: '92%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? 0 : 0,
                    zIndex: 1000,
                }}>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: 'rgba(22,22,22,0.60)',
                        height: 60,
                        justifyContent: 'center',
                        borderRadius: 17,
                    }}>
                    <WhiteText style={{fontSize: 16}}>{text1}</WhiteText>
                </View>
            </TouchableOpacity>
        ),
        pushToast: ({text1, text2, onPress, props, ...rest}: ToastConfigParams<any>) => (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: 16,
                    marginTop: Platform.OS === 'ios' ? 0 : 0,
                    backgroundColor: '#22222290',
                    zIndex: 1000,
                }}>
                <View
                    style={{
                        width: '100%',
                    }}>
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                color: '#fff',
                                textAlign: 'center',
                            },
                        ]}>
                        {text1}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={[
                            {
                                color: '#fff',
                                textAlign: 'center',
                                marginTop: 10,
                            },
                        ]}>
                        {text2}
                    </Text>
                </View>
            </TouchableOpacity>
        ),
    };

    return (
        <Provider store={store}>
            <Router />
            <Toast config={toastConfig} />
        </Provider>
    );
};

export default App;
