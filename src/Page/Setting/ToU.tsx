import Loading from '@/Components/Global/Loading';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import WebView from 'react-native-webview';

export default function ToU() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [isLoading, setIsLoading] = useState(true);
    return (
        <View style={{flex: 1}}>
            <Header title={t('ToUTitle')} />
            {isLoading && <Loading isAbsolute backgroundColor="#fff0" />}
            <View style={{flex: 1}}>
                <WebView source={{uri: 'https://dmonster1786.cafe24.com/webview/agree_used.php'}} onLoadEnd={() => setIsLoading(false)} />
            </View>
        </View>
    );
}
