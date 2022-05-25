import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {CheckBox} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch} from 'react-redux';
import {fontChange, fontSizeState} from '@/Store/fontSizeState';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingChatting() {
    const {t} = useTranslation();
    const {value: fontSize, size} = useAppSelector(state => state.fontSize);
    const dispatch = useDispatch();
    const [isOn, setIsOn] = useState(false);

    const onPressCheckBox = (selectSize: fontSizeState['size']) => {
        AsyncStorage.setItem('fontSize', selectSize);
        dispatch(
            fontChange({
                size: selectSize,
                value: fontNameToValue(selectSize),
            }),
        );
        return;
    };

    return (
        <View>
            <Header title={t('settingMenu3')} />
            <View
                style={{
                    marginHorizontal: getPixel(16),
                }}>
                <GrayText
                    style={{
                        marginTop: getHeightPixel(45),
                    }}
                    fontSize={`${12 * fontSize}`}>
                    {t('settingChattingTitle')}
                </GrayText>
                <View style={styles.betweenView}>
                    <Text fontSize={`${16 * fontSize}`}>{t('fontSize')}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setIsOn(prev => !prev);
                        }}>
                        <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
                            {t(`fontSize${size}`)}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Line isGray width={getPixel(328)} />
            </View>
            {isOn && (
                <Modal transparent animationType="fade" visible onRequestClose={() => setIsOn(false)}>
                    <TouchableOpacity
                        onPressIn={() => setIsOn(false)}
                        activeOpacity={1}
                        style={{
                            flex: 1,
                        }}>
                        <View style={styles.modalContainer}>
                            <Shadow distance={5}>
                                <View style={styles.modalView}>
                                    <Text medium fontSize={`${16 * fontSize}`} style={styles.textMargin}>
                                        {t('fontSize')}
                                    </Text>
                                    <View style={styles.height35}>
                                        <CheckBox
                                            isOn={size === 'Small'}
                                            setIsOn={() => {
                                                onPressCheckBox('Small');
                                            }}
                                            text={t('fontSizeSmall')}
                                        />
                                    </View>
                                    <View style={styles.height35}>
                                        <CheckBox
                                            isOn={size === 'Medium'}
                                            setIsOn={() => {
                                                onPressCheckBox('Medium');
                                            }}
                                            text={t('fontSizeMedium')}
                                        />
                                    </View>
                                    <View style={styles.height35}>
                                        <CheckBox
                                            isOn={size === 'Large'}
                                            setIsOn={() => {
                                                onPressCheckBox('Large');
                                            }}
                                            text={t('fontSizeLarge')}
                                        />
                                    </View>
                                </View>
                            </Shadow>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    height35: {height: getHeightPixel(35)},
    textMargin: {
        marginTop: getHeightPixel(20),
        marginBottom: getHeightPixel(10),
    },
    modalContainer: {
        position: 'absolute',
        top: getHeightPixel(155),
        right: getPixel(16),
    },
    modalView: {
        borderRadius: getPixel(10),

        width: getPixel(107),
        height: getHeightPixel(190),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
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

export const fontNameToValue = (str: string) => {
    if (str === 'Medium') {
        return 1;
    } else if (str === 'Large') {
        return 1.2;
    } else if (str === 'Small') {
        return 0.8;
    } else {
        return 1;
    }
};
