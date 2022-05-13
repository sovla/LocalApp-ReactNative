import {View, StyleSheet, Image, TouchableOpacity, TextStyle} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Header from '@/Components/Profile/Header';
import {ProfileBackground} from './ProfileHome';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import EditIcon from '@assets/image/edit_ver.png';
import {changeBirthDate, getHitSlop} from '@/Util/Util';
import {GrayText, Text, WhiteText} from '@/Components/Global/text';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import CopyIcon from '@assets/image/copy.png';
import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {Toggle} from '@/Components/Global/button';
import {ProfileDetailProps} from '@/Types/Screen/Screen';
import AutoHeightImage from 'react-native-auto-height-image';
import useApi from '@/Hooks/useApi';
import {ProfileGetInformationApi} from '@/Types/API/ProfileTypes';
import Loading from '@/Components/Global/Loading';

export default function ProfileDetail({navigation}: ProfileDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const [isOn, setIsOn] = useState(false);

    const {data, isLoading} = useApi<ProfileGetInformationApi['T'], ProfileGetInformationApi['D']>(
        null,
        'member_profile_info.php',
        {
            mt_idx: user.mt_idx as string,
        },
        {focusRetry: true},
    );

    const onPressProfileEdit = useCallback(() => {
        if (data) {
            navigation.navigate('ProfileUpdate', {
                ...data,
            });
        }
    }, [data]);

    const onPressTelNumber = useCallback(() => {
        navigation.navigate('ProfileTel');
    }, []);

    useEffect(() => {
        if (data) {
            setIsOn(data?.mt_hp_open === 'Y');
        }
    }, [data]);
    if (isLoading && data == null) {
        return <Loading />;
    }

    return (
        <View style={{flex: 1}}>
            <ProfileBackground height={getHeightPixel(200)} style={styles.bgView} />
            <View style={styles.mainContainer}>
                <Header isBack title={t('profileDetailTitle')}>
                    <TouchableOpacity onPress={onPressProfileEdit} hitSlop={getHitSlop(5)}>
                        <Image source={EditIcon} style={styles.editImage} />
                    </TouchableOpacity>
                </Header>
                <View style={styles.profileContainer}>
                    <View>
                        <View style={styles.profileView}>
                            <Image source={{uri: user.mt_profile as string}} style={styles.profileImage} />
                        </View>
                        <Image source={CameraWhiteIcon} style={styles.cameraWhiteImage} />
                    </View>
                    <View>
                        <WhiteText fontSize={`${16 * fontSize}`} medium>
                            {data?.mt_name}
                        </WhiteText>
                        <GrayText style={{width: getPixel(240)}} fontSize={`${12 * fontSize}`}>
                            {data?.mt_memo}
                        </GrayText>
                        <View style={styles.uidView}>
                            <WhiteText fontSize={`${14 * fontSize}`}>NC :{data?.mt_uid}</WhiteText>
                            <TouchableOpacity style={styles.marginLeft10} hitSlop={getHitSlop(5)}>
                                <AutoHeightImage source={CopyIcon} width={getPixel(16)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.mainViewStyle}>
                <BetweenText leftText={t('profileDetailName')} rightText={data?.mt_name} />
                <View>
                    <Text style={styles.marginView} fontSize={`${16 * fontSize}`}>
                        {t('profileDetailState')}
                    </Text>
                    <Text style={styles.marginBottom16} fontSize={`${12 * fontSize}`}>
                        {data?.mt_memo}
                    </Text>
                </View>
                <Line backgroundColor={Theme.color.gray} height={0.6} width={getPixel(320)} />
                <BetweenText leftText={t('profileDetailTel')} rightText={`+${data?.mt_country} ${data?.mt_hp}`} onPressRight={onPressTelNumber} isLine={false} />
                <View style={styles.betweenTextView}>
                    <Text fontSize={`${16 * fontSize}`}>{t('profileDetailTelOpen')}</Text>
                    <Toggle isOn={isOn} />
                </View>
                <Line backgroundColor={Theme.color.gray} height={0.6} width={getPixel(320)} />
                <BetweenText leftText={t('profileDetailEmail')} rightText={data?.mt_email} />
                <BetweenText leftText={t('profileDetailSex')} rightText={data?.mt_gender === 'M' ? t('man') : t('woman')} />
                <BetweenText
                    leftText={t('profileDetailDate')}
                    rightText={changeBirthDate(data?.mt_birth)} //'2000. 12. 12'
                />
            </View>
        </View>
    );
}

export const BetweenText: React.FC<{
    leftText: string;
    rightText?: string;
    isLine?: boolean;
    rightTextStyle?: TextStyle;
    onPressRight?: () => void;
}> = ({
    leftText,
    rightText,
    isLine = true,
    rightTextStyle = {
        color: Theme.color.black,
    },
    onPressRight,
}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <>
            <View style={styles.betweenTextView}>
                <Text fontSize={`${16 * fontSize}`}>{leftText}</Text>
                <TouchableOpacity disabled={!onPressRight} onPress={onPressRight}>
                    <Text fontSize={`${16 * fontSize}`} style={rightTextStyle}>
                        {rightText}
                    </Text>
                </TouchableOpacity>
            </View>
            {isLine && <Line backgroundColor={Theme.color.gray} height={0.4} width={getPixel(320)} />}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: getHeightPixel(200),
        marginBottom: getHeightPixel(20),
    },
    uidView: {
        marginTop: getHeightPixel(18),
        flexDirection: 'row',
    },
    marginLeft10: {marginLeft: getPixel(10)},
    marginBottom16: {marginBottom: getHeightPixel(16)},
    marginView: {
        marginTop: getHeightPixel(16),
        marginBottom: getHeightPixel(26),
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
