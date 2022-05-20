import {Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppDispatch, useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import {TextInput} from 'react-native-gesture-handler';

import {AlertButton, timer} from '@/Util/Util';
import {ModalAuthProps} from '@/Types/Components/LoginSignUpTypes';
import useInterval from '@/Hooks/useInterval';
import {API} from '@/API/API';
import {changeUser, userState} from '@/Store/userState';

export default function ModalAuth({onClose, onPressRetry, tel, selectNum, isBusiness = false}: ModalAuthProps) {
    const {t, i18n} = useTranslation();
    const {
        fontSize: {value: fontSize},
        global: {
            data: {token},
        },
    } = useAppSelector(state => state);

    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();

    const [count, setCount] = useState(120);
    const [authNum, setAuthNum] = useState('');
    const onPressNext = useCallback(async () => {
        // if (!(count > 0)) {
        //   return AlertButton(t('authAlert1'));
        // }
        if (authNum.length !== 6) {
            return AlertButton(t('authAlert2'));
        }
        const result = await API.post(isBusiness ? 'member_busi_check.php' : 'member_login.php', {
            jct_country: selectNum.replace('+', ''),
            jct_hp: tel,
            lang: i18n.language,
            passcode: authNum,
            mt_app_token: token,
        });
        if (!isBusiness) {
            if (result.data.result === 'true') {
                dispatch(changeUser(result.data.data.data));
                navigation.navigate('LoginComplete');
            } else {
                AlertButton(result.data?.msg);
            }
        } else {
            if (result.data.result === 'true') {
                dispatch(changeUser(result.data.data.data));
                onClose();
                navigation.navigate('BusinessForm');
            } else {
                AlertButton(result.data?.msg);
            }
        }
    }, [authNum, count, isBusiness]);
    useInterval(() => {
        if (count > 0) setCount(prev => prev - 1);
    }, 1000);
    return (
        <Modal transparent onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                                width: getPixel(328),
                                minHeight: getHeightPixel(250),
                                borderRadius: 16,

                                backgroundColor: Theme.color.white,
                            }}>
                            <KeyboardAwareScrollView style={{flex: 1}}>
                                <View style={styles.view}>
                                    <View style={styles.authNumView}>
                                        <TextInput caretHidden style={styles.textInput} onChangeText={setAuthNum} maxLength={6} keyboardType="number-pad" />
                                        <View style={styles.boxView}>
                                            <Text fontSize={`${20 * fontSize}`}>{authNum[0]}</Text>
                                        </View>
                                        <View style={styles.boxView}>
                                            <Text fontSize={`${20 * fontSize}`}>{authNum[1]}</Text>
                                        </View>
                                        <View style={styles.boxView}>
                                            <Text fontSize={`${20 * fontSize}`}>{authNum[2]}</Text>
                                        </View>
                                        <View style={styles.boxView}>
                                            <Text fontSize={`${20 * fontSize}`}>{authNum[3]}</Text>
                                        </View>
                                        <View style={styles.boxView}>
                                            <Text fontSize={`${20 * fontSize}`}>{authNum[4]}</Text>
                                        </View>
                                        <View style={{...styles.boxView, marginRight: 0}}>
                                            <Text fontSize={`${20 * fontSize}`}>{authNum[5]}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.authRetryView}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCount(120);
                                                onPressRetry();
                                            }}>
                                            <GrayText fontSize={`${12 * fontSize}`}>{t('authRetry')}</GrayText>
                                        </TouchableOpacity>
                                        <GrayText fontSize={`${12 * fontSize}`}>{timer(count)}</GrayText>
                                    </View>
                                    <Button onPress={onPressNext} content={t('confirm')} />
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    authRetryView: {
        width: getPixel(288),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getHeightPixel(20),
        marginBottom: getHeightPixel(40),
    },
    authNumView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHeightPixel(40),
    },
    textInput: {
        position: 'absolute',
        backgroundColor: '#0000',
        width: getPixel(288),
        height: getHeightPixel(40),
        zIndex: 100,
        color: '#0000',
    },
    boxView: {
        width: getPixel(39),
        height: getPixel(39),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.color.blue_F5,
        borderRadius: 4,
        marginRight: getPixel(10),
    },
    telLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.5,
        width: getPixel(54),
        height: getHeightPixel(50),
    },
    width175: {
        width: getPixel(175),
    },
    touch: {
        width: getPixel(288),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getHeightPixel(30),
    },
    titleText: {
        textAlign: 'center',
        marginBottom: getHeightPixel(20),
    },
    container: {
        flex: 1,
        backgroundColor: '#0007',
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        marginTop: getHeightPixel(40),
    },
    mr5: {
        marginRight: getPixel(5),
    },
    width15: {
        width: getPixel(15),
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBoxView: {
        width: getPixel(288),
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
