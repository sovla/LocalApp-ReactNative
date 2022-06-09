import {View} from 'react-native';
import React, {useState} from 'react';

import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import Header from '@/Components/LoginSignUp/Header';

import WebView from 'react-native-webview';
import Loading from '@/Components/Global/Loading';

export default function PrivacyPolicy() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [isLoading, setIsLoading] = useState(true);
    return (
        <View
            style={{
                flex: 1,
            }}>
            <Header title={t('PrivacyPolicyTitle')} />
            {isLoading && <Loading isAbsolute backgroundColor="#fff0" />}
            {/* <View
                    style={{
                        width: getPixel(328),
                        marginHorizontal: getPixel(16),
                    }}>
                    <Text
                        style={{
                            marginTop: getHeightPixel(40),
                            marginBottom: getHeightPixel(8),
                        }}
                        fontSize={`${14 * fontSize}`}
                        medium>
                        {t('PrivacyPolicyTitle')}
                    </Text>
                    <Text color={Theme.color.darkGray_78} fontSize={`${14 * fontSize}`}>
                        {t('privacyPolicyGuide')}
                    </Text>
                </View> */}
            <View style={{flex: 1}}>
                <WebView source={{uri: 'https://dmonster1786.cafe24.com/webview/agree_privacy.php'}} onLoadEnd={() => setIsLoading(false)} />
            </View>
        </View>
    );
}
