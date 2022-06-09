import Theme from '@/assets/global/Theme';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import {KeywordListAddApi} from '@/Types/API/HomeTypes';
import {ModalKeywordProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton, getHitSlop, showToastMessage} from '@/Util/Util';
import SettingIcon from '@assets/image/setting.png';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button} from '../Global/button';
import {CloseIconImage} from '../Global/image';
import {Text} from '../Global/text';

const ModalKeyword: React.FC<ModalKeywordProps> = ({onClose, keyword}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();

    const {PostAPI} = usePostSend<KeywordListAddApi, any>('keyword_list_add.php', {
        mt_idx: user.mt_idx as string,
        keyword: keyword,
    });

    const onPressSetting = () => {
        navigation.navigate('KeywordAlarm');
    };

    const onPressEnrolled = () => {
        PostAPI().then(res => {
            if (res?.result === 'false') {
                return AlertButton(res.msg);
            } else {
                showToastMessage(t('toastKeywordEnrolled'));
                onClose();
            }
        });
    };
    return (
        <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={onClose} style={{flex: 1}}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>
            <View style={styles.whiteView}>
                <TouchableOpacity hitSlop={getHitSlop(5)} style={styles.settingView} onPress={onPressSetting}>
                    <Image source={SettingIcon} style={{width: getPixel(18.5), height: getPixel(20)}} />
                </TouchableOpacity>
                <TouchableOpacity hitSlop={getHitSlop(5)} style={styles.closeIconTouch} onPress={onClose}>
                    <CloseIconImage />
                </TouchableOpacity>

                <View style={styles.keywordContentView}>
                    {/* <Text fontSize={`${20 * fontSize}`}>{`'${keyword}'`}</Text> */}
                    <Text fontSize={`${20 * fontSize}`} bold textAlign="center">{`'${keyword}'`}</Text>
                    <Text
                        fontSize={`${20 * fontSize}`}
                        style={{
                            letterSpacing: getPixel(-2),
                        }}
                        textAlign="center">
                        {t('searchModalKeyword')}
                    </Text>
                </View>

                <Button onPress={onPressEnrolled} width="278px" height="40px" content={t('searchModalButton')} style={{marginBottom: getHeightPixel(40)}} />
            </View>
        </View>
    );
};

export default ModalKeyword;

const styles = StyleSheet.create({
    whiteView: {
        width: getPixel(360),
        minHeight: getHeightPixel(210),
        backgroundColor: Theme.color.white,
        borderTopRightRadius: getPixel(15),
        borderTopLeftRadius: getPixel(15),
        alignItems: 'center',
    },
    settingView: {
        position: 'absolute',
        left: getPixel(17.7),
        top: getHeightPixel(12),
    },
    closeIconTouch: {
        position: 'absolute',
        right: getPixel(17.5),
        top: getHeightPixel(16.6),
    },

    keywordContentView: {
        marginVertical: getHeightPixel(35),
        alignItems: 'center',
        width: getPixel(290),
    },
});
