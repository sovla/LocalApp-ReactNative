import {openingHoursInit, TimeList} from '@/assets/global/dummy';
import Theme from '@/assets/global/Theme';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {BusinessOpenListApiData} from '@/Types/API/BusinessTypes';
import {openingHoursTypes} from '@/Types/Components/global';
import {BusinessOpeningHoursProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import {GrayText, Text} from '@Components/Global/text';
import {Picker} from '@react-native-picker/picker';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function BusinessOpeningHours({navigation, route: {params}}: BusinessOpeningHoursProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const isFocused = useIsFocused();

    const ref = useRef<any>(null);

    const [openingHours, setOpeningHours] = useState(openingHoursInit);
    const [isFull, setIsFull] = useState<boolean>(false);
    const [focusItem, setFocusItem] = useState<{
        key?: keyof openingHoursTypes;
        type?: 'startTime' | 'endTime';
    }>({
        key: undefined,
        type: undefined,
    });

    const onPressFull = useCallback(() => {
        // 24시간 영업 클릭
        setIsFull(true);
        setOpeningHours(openingHoursInit);
    }, []);

    const onPressCheckBox = useCallback(
        (key: keyof openingHoursTypes, value?: string, innerKey?: keyof openingHoursTypes['mon']) => {
            if (isFull) {
                setIsFull(false);
            }
            if (!value) {
                // value 없는경우 isOn만 변경
                setOpeningHours(prev => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        isOn: !prev[key].isOn,
                    },
                }));
            } else {
                const typeKey = innerKey as keyof openingHoursTypes['mon'];
                setOpeningHours(prev => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        [typeKey]: value,
                    },
                }));
            }
        },
        [isFull],
    );

    const onChangePicker = useCallback(
        value => {
            if (focusItem.key) {
                onPressCheckBox(focusItem.key, value, focusItem.type);
                setFocusItem({key: undefined, type: undefined});
            }
        },
        [focusItem],
    );

    const onPressSave = useCallback(() => {
        navigation.navigate(params?.navigate ?? 'BusinessProfileSetting', OpenParamReturnSetting(isFull, openingHours));
    }, [isFull, openingHours, params?.navigate]);

    useEffect(() => {
        if (focusItem?.key && ref?.current) {
            ref.current.focus();
        }
    }, [focusItem]);

    useEffect(() => {
        if (!(params?.isFull == null)) {
            setIsFull(params.isFull);
        }
        if (params?.openingHoursTypes) {
            setOpeningHours(params.openingHoursTypes);
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <Header title={t('businessProfileSettingShopOpeningTime')} />
                <View style={styles.mainView}>
                    <View style={styles.height40} />
                    <Text fontSize={`${16 * fontSize}`} medium>
                        {t('openingTime')}
                    </Text>
                    <GrayText fontSize={`${12 * fontSize}`}>{t('openingTimeGuide1')}</GrayText>
                    <View style={styles.height40} />
                    {Object.entries(openingHours).map(([key, value], index) => {
                        const confirmedKey = key as keyof openingHoursTypes;
                        const confirmedValue = value as openingHoursTypes['mon'];
                        return (
                            <View style={[styles.rowCenter, styles.marginBottom20]}>
                                <TouchableOpacity
                                    style={[styles.rowCenter, styles.textWidth]}
                                    onPress={() => {
                                        onPressCheckBox(confirmedKey);
                                    }}>
                                    <CheckBoxImage isOn={confirmedValue.isOn} isCheckImage width={getPixel(24)} height={getPixel(24)} />
                                    <Text fontSize={`${14 * fontSize}`} style={styles.marginLeft8} color={confirmedValue.isOn ? Theme.color.black : Theme.color.gray}>
                                        {t(key)}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={!confirmedValue.isOn}
                                    onPress={() => {
                                        setFocusItem({
                                            key: confirmedKey,
                                            type: 'startTime',
                                        });
                                    }}
                                    style={styles.timeTouch}>
                                    <Text fontSize={`${14 * fontSize}`} color={confirmedValue.isOn ? Theme.color.black : Theme.color.gray}>
                                        {confirmedValue.startTime}
                                    </Text>
                                    <AutoHeightImage source={ArrowDownGrayIcon} width={getPixel(8)} />
                                </TouchableOpacity>

                                <Text fontSize={`${14 * fontSize}`} color={confirmedValue.isOn ? Theme.color.black : Theme.color.gray} style={styles.marginHorizontal10}>
                                    ~
                                </Text>

                                <TouchableOpacity
                                    disabled={!confirmedValue.isOn}
                                    onPress={() => {
                                        setFocusItem({
                                            key: confirmedKey,
                                            type: 'endTime',
                                        });
                                    }}
                                    style={styles.timeTouch}>
                                    <Text fontSize={`${14 * fontSize}`} color={confirmedValue.isOn ? Theme.color.black : Theme.color.gray}>
                                        {confirmedValue.endTime}
                                    </Text>
                                    <AutoHeightImage source={ArrowDownGrayIcon} width={getPixel(8)} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                    <TouchableOpacity style={[styles.rowCenter, styles.textWidth]} onPress={onPressFull}>
                        <CheckBoxImage isOn={isFull} isCheckImage width={getPixel(24)} height={getPixel(24)} />
                        <Text style={styles.marginLeft8} fontSize={`${14 * fontSize}`} color={isFull ? Theme.color.black : Theme.color.gray}>
                            {t('open24hours')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <Button onPress={onPressSave} content={t('save')} style={styles.button} />
            <Picker
                ref={ref}
                style={{
                    display: 'none',
                }}
                onValueChange={onChangePicker}>
                {TimeList.map(v => {
                    return <Picker.Item label={v.label} value={v.value} />;
                })}
            </Picker>
        </View>
    );
}

function OpenParamReturnSetting(
    isFull: boolean,
    obj: openingHoursTypes,
): BusinessOpenListApiData & {
    busi_all_open: 'Y' | 'N';
} {
    return isFull
        ? {
              busi_all_open: 'Y',
              busi_mon_check: 'N',
              busi_mon_end: '00:00',
              busi_mon_start: '00:00',
              busi_pri_check: 'N',
              busi_pri_end: '00:00',
              busi_pri_start: '00:00',
              busi_sat_check: 'N',
              busi_sat_end: '00:00',
              busi_sat_start: '00:00',
              busi_sun_check: 'N',
              busi_sun_end: '00:00',
              busi_sun_start: '00:00',
              busi_thur_check: 'N',
              busi_thur_end: '00:00',
              busi_thur_start: '00:00',
              busi_tue_check: 'N',
              busi_tue_end: '00:00',
              busi_tue_start: '00:00',
              busi_wed_check: 'N',
              busi_wed_end: '00:00',
              busi_wed_start: '00:00',
          }
        : {
              busi_all_open: 'N',
              busi_mon_check: obj.mon.isOn ? 'Y' : 'N',
              busi_mon_end: obj.mon.endTime,
              busi_mon_start: obj.mon.startTime,
              busi_pri_check: obj.fri.isOn ? 'Y' : 'N',
              busi_pri_end: obj.fri.endTime,
              busi_pri_start: obj.fri.startTime,
              busi_sat_check: obj.sat.isOn ? 'Y' : 'N',
              busi_sat_end: obj.sat.endTime,
              busi_sat_start: obj.sat.startTime,
              busi_sun_check: obj.sun.isOn ? 'Y' : 'N',
              busi_sun_end: obj.sun.endTime,
              busi_sun_start: obj.sun.startTime,
              busi_thur_check: obj.thu.isOn ? 'Y' : 'N',
              busi_thur_end: obj.thu.endTime,
              busi_thur_start: obj.thu.startTime,
              busi_tue_check: obj.tue.isOn ? 'Y' : 'N',
              busi_tue_end: obj.tue.endTime,
              busi_tue_start: obj.tue.startTime,
              busi_wed_check: obj.wed.isOn ? 'Y' : 'N',
              busi_wed_end: obj.wed.endTime,
              busi_wed_start: obj.wed.startTime,
          };
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: getPixel(16),
        marginBottom: getHeightPixel(34),
        width: getPixel(328),
    },
    marginLeft8: {marginLeft: getPixel(8)},
    marginHorizontal10: {
        marginHorizontal: getPixel(10),
    },
    textWidth: {
        width: getPixel(138),
    },
    marginBottom20: {
        marginBottom: getHeightPixel(20),
    },
    container: {
        flex: 1,
    },
    mainView: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
    },
    height40: {
        height: getHeightPixel(40),
    },
    timeTouch: {
        width: getPixel(80),
        height: getHeightPixel(35),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.color.gray,
        borderRadius: 4,
        paddingLeft: getPixel(18),
        paddingRight: getPixel(10),
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
