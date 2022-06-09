import Theme from '@/assets/global/Theme';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {SettingPrivacyProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function SettingPrivacy({navigation}: SettingPrivacyProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const [isOpen, setIsOpen] = useState(user.mt_hp_open === 'Y');
    const onPressDeleteAccount = useCallback(() => {
        navigation.navigate('SettingDeleteAccount');
    }, []);
    const onPressTelChange = useCallback(() => {
        navigation.navigate('SettingPrivacyTel');
    }, []);

    return (
        <View
            style={{
                flex: 1,
            }}>
            <Header title={t('settingPrivacyTitle')} />
            <View style={styles.sidePadding}>
                <GrayText style={styles.marginTop30} fontSize={`${12 * fontSize}`}>
                    {t('settingPrivacySubTitle')}
                </GrayText>
                <View style={styles.betweenBox}>
                    <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTelOpen')}</Text>
                    <Toggle isOn={isOpen} setIsOn={setIsOpen} />
                </View>
                <Line isGray />
                <View style={styles.betweenBox}>
                    <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTelChangePh')}</Text>
                    <TouchableOpacity onPress={onPressTelChange}>
                        <Text fontSize={`${16 * fontSize}`} color={Theme.color.blue_3D}>
                            {user.mt_hp}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Line height={getHeightPixel(10)} />
            <View style={styles.sidePadding}>
                <GrayText
                    style={{
                        marginTop: getHeightPixel(30),
                    }}
                    fontSize={`${12 * fontSize}`}>
                    {t('settingPrivacySubTitle2')}
                </GrayText>
                <TouchableOpacity onPress={onPressDeleteAccount} style={styles.betweenBox}>
                    <Text fontSize={`${16 * fontSize}`}>{t('settingPrivacyExit')}</Text>
                </TouchableOpacity>
                <Line isGray />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    marginTop30: {
        marginTop: getHeightPixel(30),
    },
    sidePadding: {
        marginHorizontal: getPixel(16),
    },
    betweenBox: {
        width: getPixel(328),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: getHeightPixel(50),
        alignItems: 'center',
    },
});
