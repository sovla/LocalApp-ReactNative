import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppDispatch, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {Picker} from '@react-native-picker/picker';
import {usePostSend} from '@/Hooks/useApi';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {apiResult} from '@/Util/Util';
import {changeOptionalUser} from '@/Store/userState';
import {setAlramPushApi} from '@/Types/Components/SettingTypes';

export interface channerId {
    type: 'sound1' | 'sound2' | 'sound3' | 'default';
}

export default function SettingAlarm() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const dispatch = useAppDispatch();

    const [messageAlarm, setMessageAlarm] = useState(user.mt_message === 'Y');
    const [vibration, setVibration] = useState(user.mt_vibrate === 'Y');
    const [isShow, setIsShow] = useState(user.mt_pushcon === 'Y');
    const [channerId, setChannerId] = useState<channerId['type']>('default');

    const {PostAPI: setSetting} = usePostSend<setAlramPushApi, any>('member_message_modify.php', {
        mt_idx: user.mt_idx as string,
        mt_message: messageAlarm ? 'Y' : 'N',
        mt_message_id: channerId,
        mt_vibrate: vibration ? 'Y' : 'N',
        mt_pushcon: isShow ? 'Y' : 'N',
    });

    const ref = useRef<any>(null);
    const debounceRef = useRef<any>(null);

    useUpdateEffect(() => {
        setSetting()
            .then(apiResult)
            .then(res => {
                if (res) {
                    dispatch(
                        changeOptionalUser({
                            mt_message: messageAlarm ? 'Y' : 'N',
                            mt_vibrate: vibration ? 'Y' : 'N',
                            mt_pushcon: isShow ? 'Y' : 'N',
                        }),
                    );
                }
            });
    }, [messageAlarm, vibration, isShow, channerId]);

    return (
        <View>
            <Header title={t('settingMenu2')} />
            <View style={styles.container}>
                <GrayText fontSize={`${12 * fontSize}`}>{t('message')}</GrayText>
                <View style={styles.betweenView}>
                    <Text fontSize={`${16 * fontSize}`}>{t('messageAlarm')}</Text>
                    <Toggle isOn={messageAlarm} setIsOn={setMessageAlarm} />
                </View>
                <Line isGray width={getPixel(328)} />
                <View style={styles.betweenView}>
                    <Text fontSize={`${16 * fontSize}`}>{t('alarmSoundSetting')}</Text>
                    <TouchableOpacity onPress={() => ref.current.focus()}>
                        <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
                            {channerId}
                            {/* {t('alarmSettingDefault')} */}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Line isGray width={getPixel(328)} />
                <View style={styles.betweenView}>
                    <Text fontSize={`${16 * fontSize}`}>{t('vibration')}</Text>
                    <Toggle isOn={vibration} setIsOn={setVibration} />
                </View>
                <Line isGray width={getPixel(328)} />
                <View style={styles.betweenView}>
                    <View>
                        <Text fontSize={`${16 * fontSize}`}>{t('alarmShow')}</Text>
                        <GrayText fontSize={`${14 * fontSize}`}>{t('alarmShowGuide')}</GrayText>
                    </View>

                    <Toggle isOn={isShow} setIsOn={setIsShow} />
                </View>
                <Line isGray width={getPixel(328)} />
            </View>
            <Picker
                ref={ref}
                style={{
                    display: 'none',
                }}
                onValueChange={value => {
                    if (typeof value === 'string') setChannerId(value as channerId['type']);
                }}>
                <Picker.Item label="기본" value="default" />
                <Picker.Item label="소리1" value="sound1" />
                <Picker.Item label="소리2" value="sound2" />
                <Picker.Item label="소리3" value="sound3" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
    },
    betweenView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: getHeightPixel(16),
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
    },
});
