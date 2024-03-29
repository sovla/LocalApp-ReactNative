import {languageList} from '@/assets/global/dummy';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import Header from '@/Components/LoginSignUp/Header';
import {useAppDispatch, useAppSelector} from '@/Hooks/CustomHook';
import {changeLang} from '@/Store/langState';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import BangGrayIcon from '@assets/image/bang_gray.png';
import {GrayText, Text} from '@Components/Global/text';
import i18next from 'i18next';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

export default function SettingLanguage() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const dispatch = useAppDispatch();
    const [selectLanguage, setSelectLanguage] = useState(0);
    useLayoutEffect(() => {
        const index = languageList.findIndex(v => v === i18next.language);
        setSelectLanguage(index);
    }, []);
    const onPressSave = useCallback(() => {
        dispatch(changeLang(languageList[selectLanguage]));
    }, [selectLanguage]);

    return (
        <View style={{flex: 1}}>
            <Header title={t('settingLanguageTitle')} />
            <TouchableOpacity style={styles.betweenTouch} onPress={() => setSelectLanguage(0)}>
                <Text fontSize={`${16 * fontSize}`}>Portugues (Brasil)</Text>
                <CheckBoxImage isOn={selectLanguage === 0} />
            </TouchableOpacity>
            <Line isGray />
            <TouchableOpacity style={styles.betweenTouch} onPress={() => setSelectLanguage(1)}>
                <Text fontSize={`${16 * fontSize}`}>Spanish</Text>
                <CheckBoxImage isOn={selectLanguage === 1} />
            </TouchableOpacity>
            <Line isGray />
            <TouchableOpacity style={styles.betweenTouch} onPress={() => setSelectLanguage(2)}>
                <Text fontSize={`${16 * fontSize}`}>English</Text>
                <CheckBoxImage isOn={selectLanguage === 2} />
            </TouchableOpacity>
            <Line isGray />
            <TouchableOpacity style={styles.betweenTouch} onPress={() => setSelectLanguage(3)}>
                <Text fontSize={`${16 * fontSize}`}>한국어</Text>
                <CheckBoxImage isOn={selectLanguage === 3} />
            </TouchableOpacity>
            <Line isGray />
            <View style={styles.guideView}>
                <AutoHeightImage source={BangGrayIcon} width={getPixel(14)} />
                <GrayText style={{marginLeft: getPixel(5)}} fontSize={`${12 * fontSize}`}>
                    {t('settingLanguageGuide1')}
                </GrayText>
            </View>
            <View style={styles.saveView}>
                <Button width="288px" content={t('save')} onPress={onPressSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    saveView: {
        position: 'absolute',
        bottom: getHeightPixel(30),
        left: getPixel(32),
    },
    guideView: {
        width: getPixel(360),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: getHeightPixel(15),
    },
    betweenTouch: {
        width: getPixel(288),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: getPixel(36),
    },
});
