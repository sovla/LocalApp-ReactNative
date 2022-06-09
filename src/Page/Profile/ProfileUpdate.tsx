import Theme from '@/assets/global/Theme';
import ModalPhoto from '@/Components/Business/ModalPhoto';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import Loading from '@/Components/Global/Loading';
import {GrayText, Text, WhiteText} from '@/Components/Global/text';
import Header from '@/Components/Profile/Header';
import SexPicker from '@/Components/Profile/SexPicker';
import {useAppDispatch, useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import {changeOptionalUser} from '@/Store/userState';
import {ProfileUpdateProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {changeBirthDate, getHitSlop, showToastMessage} from '@/Util/Util';
import ArrowDownIcon from '@assets/image/arrow_down.png';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import CopyIcon from '@assets/image/copy.png';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TextInput, TextStyle, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ProfileBackground} from './ProfileHome';

interface localUserInfo {
    mt_name: string;
    mt_memo: string;
    mt_hp_open: 'Y' | 'N';
    mt_email: string;
    mt_gender: 'M' | 'W' | '';
    mt_birth: string;
}

export default function ProfileUpdate({navigation, route: {params}}: ProfileUpdateProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const [userInfo, setUserInfo] = useState<localUserInfo>({
        mt_name: '',
        mt_memo: '',
        mt_hp_open: 'N',
        mt_email: '',
        mt_gender: '',
        mt_birth: '',
    });

    const [image, setImage] = useState<null | {path: string; mime: string}>(null);
    const [isModalImage, setIsModalImage] = useState(false);

    const {PostAPI: sendUserModify, isLoading: isSendLoading} = usePostSend('member_profile_modify.php', {
        mt_idx: user.mt_idx as string,
        mt_profile: image,
        mt_memo: userInfo.mt_memo,
        mt_name: userInfo.mt_name,
        mt_hp_open: userInfo.mt_hp_open,
        mt_email: userInfo.mt_email,
        mt_gender: userInfo.mt_gender,
        mt_birth: changeBirthDate(userInfo.mt_birth, true),
        imageField: 'mt_profile',
    });

    const pickerRef = useRef<any>(null);

    const data = params;

    const onChangeUserInfo = <T extends keyof localUserInfo>(key: T, value: localUserInfo[T]) => {
        setUserInfo(prev => ({...prev, [key]: value}));
    };
    const onPressUID = useCallback(() => {
        Clipboard.setString(user.mt_uid as string);
        showToastMessage(t('copyUid'));
    }, []);

    const onPressSave = useCallback(() => {
        sendUserModify().then(res => {
            if (res?.data) {
                dispatch(
                    changeOptionalUser({
                        mt_name: userInfo.mt_name,
                        mt_memo: userInfo.mt_memo,
                        mt_hp_open: userInfo.mt_hp_open,
                        mt_profile: image ? (image?.path as string) : user.mt_profile,
                    }),
                );
                showToastMessage(t('profileSaveComplete'));
                navigation.navigate('ProfileDetail');
            }
        });
    }, [userInfo, image, user]);
    useEffect(() => {
        if (data) {
            setUserInfo({
                mt_name: data.mt_name,
                mt_memo: data.mt_memo,
                mt_hp_open: data.mt_hp_open,
                mt_email: data.mt_email,
                mt_gender: data.mt_gender,
                mt_birth: changeBirthDate(data.mt_birth),
            });
        }

        return () => {};
    }, []);

    return (
        <View style={{flex: 1}}>
            {isSendLoading && <Loading isAbsolute backgroundColor="#0003" />}
            {isModalImage && (
                <ModalPhoto
                    onClose={() => setIsModalImage(false)}
                    returnFn={image => {
                        setImage(image[0]);
                        setIsModalImage(false);
                    }}
                />
            )}
            <KeyboardAwareScrollView>
                <ProfileBackground height={getHeightPixel(200)} style={styles.bgView} />
                <View style={styles.mainContainer}>
                    <Header isBack title={t('profileDetailTitle')}>
                        <TouchableOpacity onPress={onPressSave} hitSlop={getHitSlop(5)}>
                            <WhiteText fontSize={`${16 * fontSize}`}>저장</WhiteText>
                        </TouchableOpacity>
                    </Header>
                    <View style={styles.profileContainer}>
                        <TouchableOpacity onPress={() => setIsModalImage(true)}>
                            <View style={styles.profileView}>
                                <Image source={{uri: image ? image.path : (user.mt_profile as string)}} style={styles.profileImage} />
                            </View>
                            <View>
                                <Image source={CameraWhiteIcon} style={styles.cameraWhiteImage} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            <WhiteText fontSize={`${16 * fontSize}`} medium>
                                {data?.mt_name}
                            </WhiteText>
                            <GrayText style={{width: getPixel(240)}} fontSize={`${12 * fontSize}`}>
                                {data?.mt_memo}
                            </GrayText>
                            <View style={styles.uidView}>
                                <WhiteText fontSize={`${14 * fontSize}`}>NC :{data?.mt_uid}</WhiteText>
                                <TouchableOpacity onPress={onPressUID} style={styles.marginLeft10} hitSlop={getHitSlop(5)}>
                                    <AutoHeightImage source={CopyIcon} width={getPixel(16)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.mainViewStyle}>
                    <BetweenTextInput
                        leftText={t('profileDetailName')}
                        rightText={data.mt_name}
                        value={userInfo.mt_name}
                        onChangeText={(text: string) => {
                            onChangeUserInfo('mt_name', text);
                        }}
                    />
                    <View>
                        <Text style={styles.marginView} fontSize={`${16 * fontSize}`}>
                            {t('profileDetailState')}
                        </Text>
                        <TextInput
                            placeholder={data?.mt_memo}
                            placeholderTextColor={Theme.color.gray}
                            value={userInfo.mt_memo}
                            onChangeText={(text: string) => {
                                onChangeUserInfo('mt_memo', text);
                            }}
                            style={{
                                ...styles.statusTextInput,
                                fontSize: fontSize * 12,
                                fontFamily: Theme.fontWeight.default,
                            }}
                        />
                    </View>
                    <Line backgroundColor={Theme.color.gray} height={0.6} width={getPixel(320)} />

                    {/* 핸드폰 번호 수정필요 번호 누를시 화면이동 */}
                    <BetweenTextInput leftText={t('profileDetailTel')} rightText={`+${data?.mt_country} ${data?.mt_hp}`} isLine={false} />

                    {/* 번호 공개 여부 */}
                    <View style={styles.betweenTextView}>
                        <Text fontSize={`${16 * fontSize}`}>{t('profileDetailTelOpen')}</Text>
                        <Toggle
                            isOn={userInfo.mt_hp_open === 'Y'}
                            setIsOn={() => {
                                onChangeUserInfo('mt_hp_open', userInfo.mt_hp_open === 'Y' ? 'N' : 'Y');
                            }}
                        />
                    </View>
                    <Line backgroundColor={Theme.color.gray} height={0.6} width={getPixel(320)} />
                    {/* 이메일 */}
                    <BetweenTextInput leftText={t('profileDetailEmail')} rightText={data?.mt_email} value={userInfo.mt_email} onChangeText={text => onChangeUserInfo('mt_email', text)} />
                    <View style={styles.betweenTextView}>
                        <Text
                            fontSize={`${16 * fontSize}`}
                            style={{
                                width: getPixel(100),
                            }}>
                            {t('profileDetailSex')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                pickerRef?.current?.focus();
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text color={userInfo.mt_gender === '' ? Theme.color.gray : Theme.color.black} fontSize={`${14 * fontSize}`} style={styles.marginRight10}>
                                {userInfo.mt_gender === 'M' ? t('man') : t('woman')}
                            </Text>
                            <AutoHeightImage source={ArrowDownIcon} width={getPixel(7)} />
                        </TouchableOpacity>
                    </View>
                    <Line backgroundColor={Theme.color.gray} height={0.4} width={getPixel(320)} />
                    <BetweenTextInput
                        leftText={t('profileDetailDate')}
                        rightText={changeBirthDate(data?.mt_birth)}
                        value={userInfo.mt_birth}
                        onChangeText={text => onChangeUserInfo('mt_birth', text)}
                    />
                </View>
            </KeyboardAwareScrollView>
            <SexPicker ref={pickerRef} select={userInfo.mt_gender} setSelect={text => onChangeUserInfo('mt_gender', text)} />
        </View>
    );
}

export const BetweenTextInput: React.FC<{
    leftText: string;
    rightText?: string;
    isLine?: boolean;
    rightTextStyle?: TextStyle;
    onChangeText?: (text: string) => void;
    value?: string;
}> = ({
    leftText,
    rightText,
    isLine = true,
    rightTextStyle = {
        color: Theme.color.black,
        height: getHeightPixel(50),
        width: getPixel(230),
        textAlign: 'right',
    },
    onChangeText,
    value,
}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <>
            <View style={styles.betweenTextView}>
                <Text
                    fontSize={`${16 * fontSize}`}
                    style={{
                        width: getPixel(100),
                    }}>
                    {leftText}
                </Text>
                <TextInput
                    placeholder={rightText}
                    value={value}
                    placeholderTextColor={Theme.color.gray}
                    onChangeText={onChangeText}
                    style={{...rightTextStyle, fontSize: fontSize * 16, fontFamily: Theme.fontWeight.default}}
                />
            </View>
            {isLine && <Line backgroundColor={Theme.color.gray} height={0.4} width={getPixel(320)} />}
        </>
    );
};

const styles = StyleSheet.create({
    marginRight10: {
        marginRight: getPixel(10),
    },
    mainContainer: {
        height: getHeightPixel(200),
        marginBottom: getHeightPixel(20),
    },
    statusTextInput: {
        width: getPixel(328),
        height: getHeightPixel(40),
        letterSpacing: -0.84,
        color: Theme.color.black,
        marginBottom: getHeightPixel(10),
    },
    uidView: {
        marginTop: getHeightPixel(18),
        flexDirection: 'row',
    },
    marginLeft10: {marginLeft: getPixel(10)},
    marginBottom16: {marginBottom: getHeightPixel(16)},
    marginView: {
        marginTop: getHeightPixel(16),
        marginBottom: getHeightPixel(6),
    },
    mainViewStyle: {
        marginHorizontal: getPixel(16),
    },
    betweenTextView: {
        width: getPixel(328),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cameraWhiteImage: {
        width: getPixel(22),
        height: getPixel(22),
        position: 'absolute',
        right: getPixel(10),
        bottom: 0,
    },
    profileContainer: {
        flexDirection: 'row',
        marginTop: getHeightPixel(30),
        marginLeft: getPixel(16),
    },
    profileView: {
        width: getPixel(80),
        height: getPixel(80),
        overflow: 'hidden',
        borderRadius: getPixel(25),
        marginRight: getPixel(10),
    },
    profileImage: {
        width: getPixel(80),
        height: getPixel(80),
    },
    editImage: {width: getPixel(25), height: getPixel(25)},
    bgView: {
        borderBottomLeftRadius: getPixel(15),
        borderBottomRightRadius: getPixel(15),
    },
});
