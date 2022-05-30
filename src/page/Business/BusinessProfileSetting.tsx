import Theme from '@/assets/global/Theme';
import BusinessProfileHeader from '@/Components/Business/BusinessProfileHeader';
import {Button, Toggle} from '@/Components/Global/button';
import Input from '@/Components/Global/Input';
import Line from '@/Components/Global/Line';
import Loading from '@/Components/Global/Loading';
import {GrayText, RedText, Text} from '@/Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {changeOptionalUser} from '@/Store/userState';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton, showToastMessage} from '@/Util/Util';
import ArrowRightNewIcon from '@assets/image/arrow_right_new.png';
import ClockIcon from '@assets/image/clock.png';
import FacebookBlueIcon from '@assets/image/facebook_blue.png';
import HomeIcon from '@assets/image/home.png';
import InstagramBlueIcon from '@assets/image/instagram_blue.png';
import PhoneBlueIcon from '@assets/image/phone_blue.png';
import WebIcon from '@assets/image/web.png';
import WhatsappBlueIcon from '@assets/image/whatsapp_blue.png';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BusinessProfileInfoAPi, BusinessSignUpApi} from '@Types/API/BusinessTypes';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import Screen from 'Types/Screen/Screen';
import {BetweenText} from '../Profile/ProfileDetail';
import {ProfileBackground} from '../Profile/ProfileHome';

export default function BusinessProfileSetting({navigation, route: {params}}: StackScreenProps<Screen, 'BusinessProfileSetting'>) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const isFocused = useIsFocused();
    const {user} = useAppSelector(state => state);

    const dispatch = useDispatch();

    const {values, setFieldValue, setValues} = useFormik<Omit<BusinessSignUpApi, 'mt_idx'>>({
        initialValues: {
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
        },
        onSubmit: (values, formikHelpers) => {},
    });

    const {data, setData, isLoading} = useApi<BusinessProfileInfoAPi['T'], BusinessProfileInfoAPi['D']>(null, 'member_busi_modi_info.php', {
        mt_idx: user.mt_idx as string,
    });

    const {PostAPI: sendBusinessInformation, isLoading: isSaveLoading} = usePostSend<BusinessSignUpApi, any>('member_busi_reg.php', {
        mt_idx: user.mt_idx as string,
        ...values,
    });

    const onChangeProfile = useCallback(<T extends keyof Omit<BusinessSignUpApi, 'mt_idx'>>(field: T, value: BusinessSignUpApi[T]) => {
        setFieldValue(field, value);
    }, []);

    const onPressSave = useCallback(() => {
        sendBusinessInformation().then(res => {
            if (res?.result === 'false' && res?.msg) {
                return AlertButton(res.msg);
            }
            dispatch(
                changeOptionalUser({
                    mt_hp_open: values.hp_open_check,
                }),
            );
            showToastMessage(t('businessSaveComplete'));
            navigation.goBack();
        });
    }, [values, user.mt_idx]);

    const onPressShopAddress = useCallback(() => {
        navigation.navigate('ProductLocation', {navigate: 'BusinessProfileSetting'});
    }, []);
    const onPressShopTime = useCallback(() => {
        if (data) {
            navigation.navigate('BusinessOpeningHours', {
                isFull: data.busi_all_open === 'Y',
                openingHoursTypes: getOpeningHoursTypesParam(data),
            });
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setValues(prev => ({
                ...prev,
                ...data,
                hp_open_check: user.mt_hp_open,
            }));
        }
    }, [data]);

    useEffect(() => {
        if (isFocused && params) {
            setValues(prev => ({
                ...prev,
                busi_location: params.location,
                busi_location_detail: params.pt_location_detail,
                busi_lat: params.pt_lat,
                busi_lng: params.pt_lng,
            }));
        }
    }, [isFocused]);

    const isSetTime =
        values?.busi_all_open === 'Y' || // 전체 시간 체크 혹은
        (values &&
            Object.entries(values).filter(([key, value]) => {
                // 7 일 중 하나라도 Y 라면
                if (key.includes('check') && key !== 'hp_open_check' && value === 'Y') {
                    return true;
                }
            }).length > 0);
    return (
        <View
            style={{
                flex: 1,
            }}>
            {(isLoading || !data || isSaveLoading) && <Loading isAbsolute backgroundColor="#0003" />}
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
                            value={values.busi_title}
                            onChangeText={text => onChangeProfile('busi_title', text)}
                        />
                    </View>
                    <Line style={{marginVertical: getHeightPixel(10), width: getPixel(328)}} isGray />

                    <View>
                        <RedDotText content={t('businessProfileSettingShopIntroduction')} />
                        <Input
                            width={getPixel(328)}
                            height={getHeightPixel(45)}
                            PlaceHolderComponent={() => <GrayText>{t('businessProfileSettingShopIntroductionPh')}</GrayText>}
                            value={values.busi_info}
                            onChange={text => onChangeProfile('busi_info', text)}
                        />
                    </View>
                    <BetweenText
                        leftText={t('businessProfileSettingShopTel')}
                        rightText={`+${values.busi_cell_country} ${values.busi_cell_number}`}
                        rightTextStyle={{
                            color: Theme.color.black,
                            fontSize: 14 * fontSize,
                        }}
                        isLine={false}
                    />
                    <View style={styles.betweenTextView}>
                        <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTelOpen')}</Text>
                        <Toggle isOn={values.hp_open_check === 'Y'} setIsOn={() => onChangeProfile('hp_open_check', values.hp_open_check === 'Y' ? 'N' : 'Y')} />
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

                            <RedDotText
                                content={t('businessProfileSettingShopAddress')}
                                color={Theme.color.gray}
                                isView={true}
                                value={values.busi_location ? t('businessProfileSettingShopAddress') : ''}
                            />
                        </View>
                        <AutoHeightImage source={ArrowRightNewIcon} width={getPixel(20)} />
                    </TouchableOpacity>

                    {/* 전화번호 */}
                    <ImageInput
                        image={PhoneBlueIcon}
                        value={values.busi_tel_number}
                        onChange={text => onChangeProfile('busi_tel_number', text)}
                        PlaceHolder={() => <RedDotText content={t('businessProfileSettingShopHp')} color={Theme.color.gray} isView={false} />}
                    />

                    {/* 핸드폰 제거됨
                    <ImageInput
                        image={MobileBlueIcon}
                        imageWidth={getPixel(13.31)}
                        value=""
                        onChange={() => {}}
                        PlaceHolder={() => <RedDotText content={t('businessProfileSettingShopTelPh')} color={Theme.color.gray} isView={false} />}
                    /> */}

                    {/* 영업시간 */}
                    <TouchableOpacity onPress={onPressShopTime} style={{...styles.imageInputView, justifyContent: 'space-between'}}>
                        <View style={styles.rowCenter}>
                            <View style={[styles.imageInputImageView, styles.marginRight20]}>
                                <AutoHeightImage source={ClockIcon} width={getPixel(20)} />
                            </View>

                            <RedDotText
                                content={t('businessProfileSettingShopOpeningTime')}
                                color={Theme.color.gray}
                                isView={true}
                                value={isSetTime ? t('businessProfileSettingShopOpeningTime') : ''}
                            />
                        </View>
                        <AutoHeightImage source={ArrowRightNewIcon} width={getPixel(20)} />
                    </TouchableOpacity>
                    {/* 웹사이트 */}
                    <ImageInput
                        image={WebIcon}
                        value={values.busi_website}
                        onChange={(text: string) => onChangeProfile('busi_website', text)}
                        PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopWebSite')}</GrayText>}
                    />
                    {/* 페이스북 */}
                    <ImageInput
                        image={FacebookBlueIcon}
                        value={values.busi_facebook}
                        onChange={(text: string) => onChangeProfile('busi_facebook', text)}
                        PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopFacebook')}</GrayText>}
                    />
                    {/* 인스타 */}
                    <ImageInput
                        image={InstagramBlueIcon}
                        value={values.busi_insta}
                        onChange={(text: string) => onChangeProfile('busi_insta', text)}
                        PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopInstagram')}</GrayText>}
                    />
                    {/* 왓츠앱 */}
                    <ImageInput
                        image={WhatsappBlueIcon}
                        value={values.busi_whats}
                        onChange={(text: string) => onChangeProfile('busi_whats', text)}
                        PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopWhatsApp')}</GrayText>}
                    />
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

export const RedDotText: React.FC<{
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

export const ImageInput: React.FC<{
    value: string;
    onChange: (text: string) => void;
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
                onChangeText={onChange}
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

export function getOpeningHoursTypesParam(obj: {
    busi_mon_check: string;
    busi_mon_end: any;
    busi_mon_start: any;
    busi_tue_check: string;
    busi_tue_end: any;
    busi_tue_start: any;
    busi_wed_check: string;
    busi_wed_end: any;
    busi_wed_start: any;
    busi_thur_check: string;
    busi_thur_end: any;
    busi_thur_start: any;
    busi_pri_check: string;
    busi_pri_end: any;
    busi_pri_start: any;
    busi_sat_check: string;
    busi_sat_end: any;
    busi_sat_start: any;
    busi_sun_check: string;
    busi_sun_end: any;
    busi_sun_start: any;
}) {
    return {
        mon: {
            isOn: obj.busi_mon_check === 'Y',
            endTime: obj.busi_mon_end,
            startTime: obj.busi_mon_start,
        },
        tue: {
            isOn: obj.busi_tue_check === 'Y',
            endTime: obj.busi_tue_end,
            startTime: obj.busi_tue_start,
        },
        wed: {
            isOn: obj.busi_wed_check === 'Y',
            endTime: obj.busi_wed_end,
            startTime: obj.busi_wed_start,
        },
        thu: {
            isOn: obj.busi_thur_check === 'Y',
            endTime: obj.busi_thur_end,
            startTime: obj.busi_thur_start,
        },
        fri: {
            isOn: obj.busi_pri_check === 'Y',
            endTime: obj.busi_pri_end,
            startTime: obj.busi_pri_start,
        },
        sat: {
            isOn: obj.busi_sat_check === 'Y',
            endTime: obj.busi_sat_end,
            startTime: obj.busi_sat_start,
        },
        sun: {
            isOn: obj.busi_sun_check === 'Y',
            endTime: obj.busi_sun_end,
            startTime: obj.busi_sun_start,
        },
    };
}

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
