import {View, Switch, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {GrayText, MediumText, Text} from '@/Components/Global/text';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Toggle} from '@/Components/Global/button';
import Theme from '@/assets/global/Theme';
import {CloseIconImage} from '@/Components/Global/image';
import {AlertButton, apiResult, getHitSlop, showToastMessage} from '@/Util/Util';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {KeywordAlarmAPi, KeywordAlarmCheckAPi} from '@/Types/Components/HomeTypes';
import Loading from '@/Components/Global/Loading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeywordListAddApi} from '@/Types/API/HomeTypes';

export default function KeywordAlarm() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const navigation = useAppNavigation();
    const [isOn, setIsOn] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');

    const {data, isLoading, isError, errorMessage, getData} = useApi<KeywordAlarmAPi['T'], KeywordAlarmAPi['D']>(
        {
            list: [],
        },
        'keyword_list.php',
        {
            mt_idx: user.mt_idx as string,
        },
        {
            firstLoading: true,
        },
    );
    const {data: checkData, isLoading: isCheckDataLoading} = useApi<KeywordAlarmCheckAPi['T'], KeywordAlarmCheckAPi['D']>(
        null,
        'member_keyword_check.php',
        {
            mt_idx: user.mt_idx as string,
        },
        {
            firstLoading: true,
        },
    );

    const {PostAPI} = usePostSend<KeywordListAddApi, any>('keyword_list_add.php', {
        mt_idx: user.mt_idx as string,
        keyword: keyword,
    });

    const {PostAPI: deletePostAPI, isLoading: deleteIsLoading} = usePostSend<
        {
            mt_idx: string;
            kt_idx?: string;
        },
        any
    >('keyword_list_delete.php', {
        mt_idx: user.mt_idx as string,
    });
    const {PostAPI: alarmTogglePostAPI} = usePostSend<KeywordAlarmCheckAPi['D'], KeywordAlarmCheckAPi['T']>('member_keyword_alert.php', {
        mt_idx: user.mt_idx as string,
    });

    const onPressAlarmSetting = useCallback(() => {
        setIsOn(prev => !prev);
        alarmTogglePostAPI()
            .then(apiResult)
            .then(res => {
                setIsOn(res.data.mt_keyword === 'Y');
            });
    }, []);

    const onSubmit = useCallback(() => {
        if (!keyword.length) {
            AlertButton(t('noneKeyword'));
            return;
        }
        PostAPI()
            .then(apiResult)
            .then(res => {
                showToastMessage(t('toastKeyword'));
                getData();
                setKeyword('');
            });
    }, [keyword]);

    const onPressDelete = useCallback((kt_idx: string) => {
        deletePostAPI({kt_idx})
            .then(apiResult)
            .then(res => {
                showToastMessage(t('toastKeywordDelete'));
                getData();
            });
    }, []);

    useEffect(() => {
        if (checkData) {
            setIsOn(checkData.mt_keyword === 'Y');
        }
    }, [checkData]);

    if (isCheckDataLoading || (isLoading && !data)) {
        return <Loading />;
    }

    return (
        <View>
            <Header title={t('KeywordAlarm')} />
            <KeyboardAwareScrollView>
                <View style={styles.mainContainer}>
                    <MediumText fontSize={`${20 * fontSize}`}>{t('KeywordAlarm')}</MediumText>
                    <GrayText fontSize={`${12 * fontSize}`} style={styles.marginTop10}>
                        {t('KeywordAlarmText1')}
                    </GrayText>
                    <View style={styles.betweenRow}>
                        <Text fontSize={`${16 * fontSize}`}>{t('KeywordAlarmText2')}</Text>
                        <Toggle isOn={isOn} setIsOn={onPressAlarmSetting} />
                    </View>
                    <Text fontSize={`${16 * fontSize}`}>{t('KeywordAlarmText3') + `(${data.list.length}/20)`}</Text>
                    <TextInput
                        style={[
                            styles.textInput,
                            {
                                fontSize: fontSize * 14,
                            },
                        ]}
                        placeholder={t('KeywordAlarmPlaceHolder')}
                        placeholderTextColor={Theme.color.gray}
                        value={keyword}
                        onChangeText={setKeyword}
                        onSubmitEditing={onSubmit}
                    />
                    {Array.isArray(data.list) &&
                        data.list.map(item => {
                            return (
                                <View key={item.kt_idx} style={styles.keywordListView}>
                                    <Text fontSize={`${14 * fontSize}`}>{item.kt_title}</Text>
                                    <TouchableOpacity hitSlop={getHitSlop(5)} onPress={() => onPressDelete(item.kt_idx)}>
                                        <CloseIconImage isGray />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    betweenRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getHeightPixel(20),
        marginBottom: getHeightPixel(30),
    },
    mainContainer: {
        marginHorizontal: getPixel(16),
        marginTop: getHeightPixel(40),
    },
    keywordListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: getPixel(328),
        height: getHeightPixel(50),
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
        alignItems: 'center',
    },
    textInput: {
        width: getPixel(328),
        height: getHeightPixel(45),
        includeFontPadding: false,
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
        color: Theme.color.black,
    },
    marginTop10: {
        marginTop: getHeightPixel(10),
    },
});
