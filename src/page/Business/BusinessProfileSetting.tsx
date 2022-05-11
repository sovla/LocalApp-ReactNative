import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, RedText, Text} from '@/Components/Global/text';
import {ProfileBackground} from '../Profile/ProfileHome';

import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {StackScreenProps} from '@react-navigation/stack';
import Screen from 'Types/Screen/Screen';
import Input from '@/Components/Global/Input';
import {BetweenText} from '../Profile/ProfileDetail';
import {Button, Toggle} from '@/Components/Global/button';

import HomeIcon from '@assets/image/home.png';
import PhoneBlueIcon from '@assets/image/phone_blue.png';
import MobileBlueIcon from '@assets/image/mobile_blue.png';
import ClockIcon from '@assets/image/clock.png';
import WebIcon from '@assets/image/web.png';
import FacebookBlueIcon from '@assets/image/facebook_blue.png';
import InstagramBlueIcon from '@assets/image/instagram_blue.png';
import ArrowRightNewIcon from '@assets/image/arrow_right_new.png';
import WhatsappBlueIcon from '@assets/image/whatsapp_blue.png';
import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BusinessProfileHeader from '@/Components/Business/BusinessProfileHeader';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {BusinessProfileInfoAPi, BusinessProfileInformation, BusinessSignUpApi} from '@Types/API/BusinessTypes';
import {useIsFocused} from '@react-navigation/native';
import ModalPhoto from '@/Components/Business/ModalPhoto';
import Loading from '@/Components/Global/Loading';

export default function BusinessProfileSetting({navigation, route: {params}}: StackScreenProps<Screen>) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const isFocused = useIsFocused();
    const {user} = useAppSelector(state => state);
    const [isOn, setIsOn] = useState<boolean>(false);

    const [image, setImage] = useState<null | {
        path: string;
        mime: string;
    }>(null);

    const {data, setData, isLoading} = useApi<BusinessProfileInfoAPi['T'], BusinessProfileInfoAPi['D']>(null, 'member_busi_modi_info.php', {
        mt_idx: user.mt_idx as string,
    });

    const {PostAPI: sendBusinessInformation} = usePostSend<BusinessSignUpApi>('member_busi_reg.php', {
        mt_idx: user.mt_idx as string,
        busi_title: '',
        busi_cnpj: '',
        busi_info: '',
        hp_open_check: null,
        busi_location: '',
        busi_location_detail: '',
        busi_lat: '',
        busi_lng: '',
        busi_tel_country: '',
        busi_tel_number: '',
        busi_cell_country: '',
        busi_cell_number: '',
        busi_all_open: null,
        busi_mon_check: null,
        busi_mon_end: '',
        busi_mon_start: '',
        busi_pri_check: null,
        busi_pri_end: null,
        busi_pri_start: null,
        busi_sat_check: null,
        busi_sat_end: null,
        busi_sat_start: null,
        busi_sun_check: null,
        busi_sun_end: null,
        busi_sun_start: null,
        busi_thur_check: null,
        busi_thur_end: null,
        busi_thur_start: null,
        busi_tue_check: null,
        busi_tue_end: null,
        busi_tue_start: null,
        busi_wed_check: null,
        busi_wed_end: null,
        busi_wed_start: null,
        busi_website: '',
        busi_facebook: '',
        busi_insta: '',
        busi_whats: '',
    });

    const onPressSave = useCallback(() => {
        sendBusinessInformation();
    }, []);

    const onPressShopAddress = useCallback(() => {
        navigation.navigate('ProductLocation');
    }, []);
    const onPressShopTime = useCallback(() => {
        if (data) {
            navigation.navigate('BusinessOpeningHours', {
                isFull: data.busi_all_open === 'Y',
                openingHoursTypes: {
                    mon: {
                        isOn: data.busi_mon_check === 'Y',
                        endTime: data.busi_mon_end,
                        startTime: data.busi_mon_start,
                    },
                    tue: {
                        isOn: data.busi_tue_check === 'Y',
                        endTime: data.busi_tue_end,
                        startTime: data.busi_tue_start,
                    },
                    wed: {
                        isOn: data.busi_wed_check === 'Y',
                        endTime: data.busi_wed_end,
                        startTime: data.busi_wed_start,
                    },
                    thu: {
                        isOn: data.busi_thur_check === 'Y',
                        endTime: data.busi_thur_end,
                        startTime: data.busi_thur_start,
                    },
                    fri: {
                        isOn: data.busi_pri_check === 'Y',
                        endTime: data.busi_pri_end,
                        startTime: data.busi_pri_start,
                    },
                    sat: {
                        isOn: data.busi_sat_check === 'Y',
                        endTime: data.busi_sat_end,
                        startTime: data.busi_sat_start,
                    },
                    sun: {
                        isOn: data.busi_sun_check === 'Y',
                        endTime: data.busi_sun_end,
                        startTime: data.busi_sun_start,
                    },
                },
            });
        }
    }, [data]);

    const onChangeData = <K extends keyof BusinessProfileInformation>(key: K, value: BusinessProfileInformation[K]) => {
        setData((prev: any) => ({...prev, [key]: value}));
    };

    useEffect(() => {
        if (data) {
            // 휴대전화 공개 여부
            // setIsOn(data.)
        }
    }, [data]);

    useEffect(() => {
        if (isFocused && params) {
            setData((prev: any) => ({...prev, ...params}));
        }
    }, [isFocused]);
    if (isLoading && !data) {
        return <Loading />;
    }

    const isSetTime =
        data?.busi_all_open === 'Y' || // 전체 시간 체크 혹은
        (data &&
            Object.entries(data).filter(([key, value]) => {
                // 7 일 중 하나라도 Y 라면
                if (key.includes('check') && value === 'Y') {
                    return true;
                }
            }).length > 0);
    return (
        <View
            style={{
                flex: 1,
            }}>
            <KeyboardAwareScrollView>
                <ProfileBackground height={getHeightPixel(200)} style={styles.imageBackground} />

                <BusinessProfileHeader title={t('BusinessProfileMenuTitle')} isUpdate />

                <View
                    style={{
                        width: getPixel(328),
                        marginHorizontal: getPixel(16),
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <RedDotText content={t('businessProfileSettingShopName')} />
                        <TextInput
                            placeholder={t('businessProfileSettingShopNamePh')}
                            placeholderTextColor={Theme.color.gray}
                            style={[
                                styles.shopNameInput,
                                {
                                    fontSize: 14 * fontSize,
                                },
                            ]}
                            value={data?.busi_title}
                            onChangeText={text => onChangeData('busi_title', text)}
                        />
                    </View>
                    <Line style={{marginVertical: getHeightPixel(10), width: getPixel(328)}} isGray />

                    <View>
                        <RedDotText content={t('businessProfileSettingShopIntroduction')} />
                        <Input width={getPixel(328)} height={getHeightPixel(45)} PlaceHolderComponent={() => <GrayText>{t('businessProfileSettingShopIntroductionPh')}</GrayText>} value={data?.busi_info} onChange={text => onChangeData('busi_info', text)} />
                    </View>
                    <BetweenText
                        leftText={t('businessProfileSettingShopTel')}
                        rightText={`+${data?.busi_cell_country} ${data?.busi_cell_number}`}
                        rightTextStyle={{
                            color: Theme.color.black,
                            fontSize: 14 * fontSize,
                        }}
                        isLine={false}
                    />
                    <View style={styles.betweenTextView}>
                        <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTelOpen')}</Text>
                        <Toggle isOn={isOn} setIsOn={setIsOn} />
                    </View>
                    <Line style={{marginVertical: getHeightPixel(10), width: getPixel(328)}} isGray />
                    <BetweenText
                        leftText={t('businessProfileSettingShopEmail')}
                        rightText={'이메일 추가 필요'} //data?.email
                        rightTextStyle={{
                            fontSize: 14 * fontSize,
                        }}
                    />
                    {/* 업체 주소 등록 */}
                    <TouchableOpacity onPress={onPressShopAddress} style={{...styles.imageInputView, justifyContent: 'space-between'}}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View style={[styles.imageInputImageView, styles.marginRight20]}>
                                <AutoHeightImage source={HomeIcon} width={getPixel(20)} />
                            </View>

                            <RedDotText content={t('businessProfileSettingShopAddress')} color={Theme.color.gray} isView={true} value={data?.busi_location ? t('businessProfileSettingShopAddress') : ''} />
                        </View>
                        <AutoHeightImage source={ArrowRightNewIcon} width={getPixel(20)} />
                    </TouchableOpacity>

                    {/* 전화번호 */}
                    <ImageInput image={PhoneBlueIcon} value={data?.busi_tel_number ?? ''} onChange={() => {}} PlaceHolder={() => <RedDotText content={t('businessProfileSettingShopHp')} color={Theme.color.gray} isView={false} />} />

                    {/* 핸드폰 */}
                    <ImageInput image={MobileBlueIcon} imageWidth={getPixel(13.31)} value="" onChange={() => {}} PlaceHolder={() => <RedDotText content={t('businessProfileSettingShopTelPh')} color={Theme.color.gray} isView={false} />} />

                    {/* 영업시간 */}
                    <TouchableOpacity onPress={onPressShopTime} style={{...styles.imageInputView, justifyContent: 'space-between'}}>
                        <View style={styles.rowCenter}>
                            <View style={[styles.imageInputImageView, styles.marginRight20]}>
                                <AutoHeightImage source={ClockIcon} width={getPixel(20)} />
                            </View>

                            <RedDotText content={t('businessProfileSettingShopOpeningTime')} color={Theme.color.gray} isView={true} value={isSetTime ? t('businessProfileSettingShopOpeningTime') : ''} />
                        </View>
                        <AutoHeightImage source={ArrowRightNewIcon} width={getPixel(20)} />
                    </TouchableOpacity>

                    <ImageInput image={WebIcon} value={data?.busi_website ?? ''} onChange={(text: string) => onChangeData('busi_website', text)} PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopWebSite')}</GrayText>} />
                    <ImageInput image={FacebookBlueIcon} value={data?.busi_facebook ?? ''} onChange={(text: string) => onChangeData('busi_facebook', text)} PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopFacebook')}</GrayText>} />

                    <ImageInput image={InstagramBlueIcon} value={data?.busi_insta ?? ''} onChange={(text: string) => onChangeData('busi_insta', text)} PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopInstagram')}</GrayText>} />
                    <ImageInput image={WhatsappBlueIcon} value={data?.busi_whats ?? ''} onChange={(text: string) => onChangeData('busi_whats', text)} PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopWhatsApp')}</GrayText>} />
                </View>
                <View
                    style={{
                        marginHorizontal: getPixel(16),
                        marginTop: getHeightPixel(100),
                        marginBottom: getHeightPixel(34),
                    }}>
                    <Button onPress={onPressSave} content={t('save')} width="328px" />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const RedDotText: React.FC<{
    fontSize?: number;
    content: string;
    color?: string;
    isView?: boolean;
    value?: string;
}> = ({fontSize, content, color = Theme.color.black, isView = true, value}) => {
    const fontSizeState = useAppSelector(state => state.fontSize.value);
    const applyFontSize = fontSize ?? fontSizeState * 16;

    return isView ? (
        <View style={styles.redDotView}>
            {!(value == null) && value?.length > 0 ? (
                <Text color={Theme.color.black} fontSize={`${applyFontSize}`}>
                    {value}
                </Text>
            ) : (
                <>
                    <Text color={color} fontSize={`${applyFontSize}`}>
                        {content}
                    </Text>
                    <RedText style={{marginLeft: getPixel(5)}} fontSize={`${applyFontSize}`}>
                        *
                    </RedText>
                </>
            )}
        </View>
    ) : (
        <>
            <Text color={color} fontSize={`${applyFontSize}`}>
                {content}
            </Text>
            <RedText fontSize={`${applyFontSize}`}>{`  *`}</RedText>
        </>
    );
};

const ImageInput: React.FC<{
    value: string;
    onChange: any;
    PlaceHolder?: React.FC;
    image: any;
    imageWidth?: number;
}> = ({value, onChange, PlaceHolder, image, imageWidth = getPixel(20)}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.imageInputView}>
            <View style={styles.imageInputImageView}>
                <AutoHeightImage source={image} width={imageWidth} />
            </View>
            <TextInput
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                style={[
                    styles.imageInput,
                    {
                        fontSize: fontSize * 14,
                    },
                ]}>
                {!isFocus && !value && PlaceHolder !== undefined && <PlaceHolder />}
                {value?.length > 0 && <Text>{value}</Text>}
            </TextInput>
        </View>
    );
};
const styles = StyleSheet.create({
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    marginRight20: {
        marginRight: getPixel(20),
    },
    uidView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHeightPixel(15),
    },
    marginLeft10: {
        marginLeft: getPixel(10),
    },
    imageInputView: {
        width: getPixel(328),
        height: 55,
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageInputImageView: {
        marginRight: getPixel(15),
        width: getPixel(30),
        height: getPixel(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageInput: {
        width: getPixel(270),
        height: getHeightPixel(50),
        includeFontPadding: false,
        color: Theme.color.black,
    },
    betweenTextView: {
        width: getPixel(328),
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shopNameInput: {
        width: getPixel(250),
        marginLeft: getPixel(22),
        height: getHeightPixel(40),
        includeFontPadding: false,
        color: Theme.color.black,
    },
    redDotView: {flexDirection: 'row', alignItems: 'center'},
    headerView: {height: getHeightPixel(150), marginBottom: getHeightPixel(10)},
    menuArrowImage: {marginRight: getPixel(10)},
    menuText: {marginLeft: getPixel(12)},
    menuView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuContainer: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        height: getHeightPixel(50),
        justifyContent: 'center',
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
    },
    imageBackground: {
        borderBottomLeftRadius: getPixel(15),
        borderBottomRightRadius: getPixel(15),
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
        alignItems: 'center',
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
