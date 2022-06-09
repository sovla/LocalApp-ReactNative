import Theme from '@/assets/global/Theme';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function SettingDeleteAccount() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [isOn, setIsOn] = useState(false);
    return (
        <View
            style={{
                flex: 1,
            }}>
            <Header title={t('settingPrivacyExit')} />
            <View style={styles.container}>
                <Text style={styles.title} fontSize={`${20 * fontSize}`}>
                    {t('deleteAccountGuide')}
                </Text>
                <View style={styles.row}>
                    <View style={styles.dot} />
                    <Text style={styles.text} fontSize={`${14 * fontSize}`}>
                        {t('deleteAccountGuide1')}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.dot} />
                    <Text style={styles.text} fontSize={`${14 * fontSize}`}>
                        {t('deleteAccountGuide2')}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.dot} />
                    <Text style={styles.text} fontSize={`${14 * fontSize}`}>
                        {t('deleteAccountGuide3')}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.dot} />
                    <Text style={styles.text} fontSize={`${14 * fontSize}`}>
                        {t('deleteAccountGuide4')}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => setIsOn(prev => !prev)} style={styles.row}>
                    <View
                        style={{
                            marginRight: getPixel(10),
                        }}>
                        <CheckBoxImage isBox isOn={isOn} />
                    </View>
                    <Text color={isOn ? Theme.color.blue_3D : Theme.color.gray}>{t('deleteAccountGuide5')}</Text>
                </TouchableOpacity>
                <Button
                    content="탈퇴하기"
                    width="288px"
                    style={{
                        marginTop: getHeightPixel(300),
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: getPixel(36),
    },
    title: {
        marginTop: getHeightPixel(35),
        marginBottom: getHeightPixel(25),
    },
    text: {
        width: getPixel(272),
    },
    dot: {
        width: getPixel(6),
        height: getPixel(6),
        backgroundColor: Theme.color.black,
        borderRadius: getPixel(50),
        marginRight: getPixel(10),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: getPixel(328),
        marginBottom: getHeightPixel(10),
    },
});
