import Theme from '@/assets/global/Theme';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import {ReportApi} from '@/Types/Components/ChattingTypes';
import {ReportDetailProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton} from '@/Util/Util';
import {GrayText, Text} from '@Components/Global/text';
import {useNavigationState} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ReportDetail({
    route: {
        params: {reportType, pt_idx},
    },
    navigation,
}: ReportDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const title = (() => {
        switch (reportType) {
            case 'prohibited':
                return 'reportGuideTitle1';
            case 'scam':
                return 'reportGuideTitle3';
            case 'unmanned':
                return 'reportGuideTitle2';
        }
    })();

    const prohibitedMenuList = [t('lifeTrade'), t('weapon'), t('drugs'), t('privacy'), t('charityProduct'), t('medicalEquipment'), t('other')];

    const userName = 'NETSHOES';
    const [text, setText] = useState<string>('');
    const [selectMenu, setSelectMenu] = useState<string>('0');
    const naviState = useNavigationState(state => state);
    const {PostAPI} = usePostSend<ReportApi, any>('product_decar.php', {
        mt_idx: user.mt_idx as string,
        dl_type: reportType === 'prohibited' ? 'P' : reportType === 'scam' ? 'S' : 'M',
        pt_idx: pt_idx,
        dl_check: reportType === 'prohibited' ? selectMenu : undefined,
        dl_memo: text,
    });
    const onPressReport = useCallback(() => {
        PostAPI().then(res => {
            if (res.result === 'false' && res.msg) {
                return AlertButton(res.msg);
            }
            const count = reportType == 'prohibited' ? 1 : 2;

            navigation.pop(count);
            AlertButton(t('reportComplete'));
        });
    }, [naviState, reportType, text, selectMenu]);

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
            }}
            behavior="height"
            enabled={Platform.OS === 'android'}>
            <Header title={t(`${title}`)} />
            <View
                style={{
                    flex: 1,
                    marginBottom: getHeightPixel(90),
                }}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    {reportType === 'prohibited' && (
                        <View>
                            {prohibitedMenuList.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setSelectMenu(`${index}`);
                                        }}
                                        style={styles.menuListTouch}>
                                        <CheckBoxImage isOn={`${index}` === selectMenu} />
                                        <Text style={styles.menuListText} fontSize={`${16 * fontSize}`}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                            <Line isGray style={styles.line} />
                        </View>
                    )}
                    {(reportType === 'scam' || reportType === 'unmanned') && (
                        <View style={styles.line}>
                            <Text fontSize={`${14 * fontSize}`} medium style={styles.textWidth}>
                                {`'${userName}'${t('reportGuide2')}`}
                            </Text>
                            <GrayText fontSize={`${14 * fontSize}`} style={styles.grayText}>
                                {reportType === 'scam' ? t('reportGuide4') : t('reportGuide3')}
                            </GrayText>
                        </View>
                    )}
                    <View style={styles.line}>
                        <Text fontSize={`${14 * fontSize}`} medium>
                            {t('reportGuide1')}
                        </Text>
                        <TextInput
                            onChangeText={setText}
                            style={[
                                styles.reportInput,
                                {
                                    fontSize: fontSize * 14,
                                },
                            ]}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <Button onPress={onPressReport} content={t('submit')} style={styles.footerButton} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    footerButton: {
        width: getPixel(328),
        position: 'absolute',
        bottom: getHeightPixel(32),
        left: getPixel(16),
    },
    textWidth: {
        width: getPixel(328),
    },
    grayText: {
        width: getPixel(328),
        marginTop: getHeightPixel(20),
    },
    reportInput: {
        width: getPixel(328),
        height: getHeightPixel(72),
        borderWidth: 1,
        borderColor: Theme.color.gray,
        borderRadius: 4,
        marginTop: getHeightPixel(10),
        color: Theme.color.black,
    },
    menuListTouch: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        marginTop: getHeightPixel(30),
        marginHorizontal: getPixel(16),
        width: getPixel(328),
    },
    menuListText: {
        marginLeft: getPixel(20),
        width: getPixel(280),
    },
});
