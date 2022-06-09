import Theme from '@/assets/global/Theme';
import {Button, Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import Header from '@/Components/LoginSignUp/Header';
import {useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {changeOptionalUser} from '@/Store/userState';
import {BusinessOpenListApiData, BusinessSignUpApi} from '@/Types/API/BusinessTypes';
import {BusinessSignUpFormProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton, apiResult} from '@/Util/Util';
import ArrowRightNewIcon from '@assets/image/arrow_right_new.png';
import ClockIcon from '@assets/image/clock.png';
import FacebookBlueIcon from '@assets/image/facebook_blue.png';
import HomeIcon from '@assets/image/home.png';
import InstagramBlueIcon from '@assets/image/instagram_blue.png';
import PhoneBlueIcon from '@assets/image/phone_blue.png';
import WebIcon from '@assets/image/web.png';
import WhatsappBlueIcon from '@assets/image/whatsapp_blue.png';
import {GrayText, RedText, Text, WhiteText} from '@Components/Global/text';
import {useIsFocused} from '@react-navigation/native';
import {FormikHelpers, useFormik} from 'formik';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {TextInput} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {getOpeningHoursTypesParam, ImageInput, RedDotText} from './BusinessProfileSetting';

interface BusinessSignUpData {
    busi_title: string;
    busi_cnpj: string;
    busi_info: string;
    hp_open_check: 'Y' | 'N';
    busi_email: string;
    busi_location: string;
    busi_location_detail: string;
    busi_lat: number;
    busi_lng: number;
    busi_tel_country: string;
    busi_tel_number: string;
    busi_cell_country: string;
    busi_cell_number: string;
    busi_all_open: 'Y' | 'N';
    busi_website: string;
    busi_facebook: string;
    busi_insta: string;
    busi_whats: string;
}

type FormikData = BusinessSignUpData & BusinessOpenListApiData;

const BusinessSignUpForm = ({navigation, route: {params}}: BusinessSignUpFormProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const {
        handleChange,
        handleBlur,

        handleSubmit,
        values: {
            busi_title,
            busi_cnpj,
            busi_info,
            hp_open_check,
            busi_location,
            busi_location_detail,
            busi_lat,
            busi_email,
            busi_lng,
            busi_tel_country,
            busi_tel_number,
            busi_cell_country,
            busi_cell_number,
            busi_all_open,
            busi_mon_check,
            busi_mon_start,
            busi_mon_end,
            busi_website,
            busi_facebook,
            busi_insta,
            busi_whats,
        },
        errors,
        setValues,
        values,
    } = useFormik<FormikData>({
        initialValues: {
            busi_title: '',
            busi_cnpj: '42.156.596/0001-63',
            busi_info: '',
            hp_open_check: user?.mt_hp_open ?? 'Y',
            busi_location: '',
            busi_location_detail: '',
            busi_email: user?.mt_email as string,
            busi_lat: -23.15123124,
            busi_lng: -32.12341,
            busi_tel_country: '',
            busi_tel_number: '',
            busi_cell_country: '',
            busi_cell_number: '',
            busi_all_open: 'N',
            busi_website: '',
            busi_facebook: '',
            busi_insta: '',
            busi_whats: '',
            busi_mon_check: 'N',
            busi_pri_check: 'N',
            busi_sat_check: 'N',
            busi_sun_check: 'N',
            busi_tue_check: 'N',
            busi_wed_check: 'N',
            busi_thur_check: 'N',
            busi_mon_end: '00:00',
            busi_mon_start: '00:00',
            busi_pri_end: '00:00',
            busi_pri_start: '00:00',
            busi_sat_end: '00:00',
            busi_sat_start: '00:00',
            busi_sun_end: '00:00',
            busi_sun_start: '00:00',
            busi_tue_end: '00:00',
            busi_tue_start: '00:00',
            busi_wed_end: '00:00',
            busi_wed_start: '00:00',
            busi_thur_end: '00:00',
            busi_thur_start: '00:00',
        },
        onSubmit: (values: FormikData, formikHelpers: FormikHelpers<FormikData>) => {
            console.log(values);
            formikHelpers.validateField('asd');
            signUpApi().then(apiResult);
        },
        validationSchema: Yup.object({
            busi_title: Yup.string().required('Required'),
            busi_cnpj: Yup.string().required('Required'),
            busi_info: Yup.string().required('Required'),
            busi_location: Yup.string().required('Required'),
            busi_tel_number: Yup.string().required('Required'),
        }),

        validateOnChange: false,
    });

    const {PostAPI: checkCNPJ} = usePostSend('busi_cnpj_check.php', {
        busi_cnpj: busi_cnpj,
    });

    const {PostAPI: signUpApi} = usePostSend<BusinessSignUpApi, any>('member_busi_reg.php', {
        ...values,
        mt_idx: user.mt_idx as string,
    });
    const _handleChange = useCallback(
        <T extends keyof FormikData>(field: T) =>
            (e: FormikData[T] | React.ChangeEvent<any>) => {
                if (typeof e === 'string') {
                    handleChange(field)(e);
                }
            },
        [],
    );

    const onPressShopAddress = useCallback(() => {
        navigation.navigate('ProductLocation', {
            navigate: 'BusinessSignUpForm',
        });
    }, []);
    const onPressShopTime = useCallback(() => {
        navigation.navigate('BusinessOpeningHours', {navigate: 'BusinessSignUpForm', openingHoursTypes: getOpeningHoursTypesParam(values), isFull: busi_all_open === 'Y'});
    }, [values]);

    const onPressCheckCNPJ = () => {
        checkCNPJ().then(res => {
            if (res?.result === 'false') {
                setIsError(true);
            } else {
                setIsError(false);
                setIsCheck(true);
                AlertButton(t('availableCNPJ'));
            }
        });
    };
    const onPressComplete = () => {
        signUpApi()
            .then(apiResult)
            .then(res => {
                dispatch(
                    changeOptionalUser({
                        mt_busi: 'Y',
                    }),
                );
                navigation.navigate('Home');
                AlertButton(t('confirmComplete'));
            });
    };

    useLayoutEffect(() => {
        if (params && 'location' in params && params?.location && params?.pt_location_detail) {
            setValues(prev => ({...prev, busi_location: params.location as string, busi_location_detail: params.pt_location_detail as string}));
        }
        if (params && 'busi_all_open' in params) {
            setValues(prev => ({...prev, ...params}));
        }

        return () => {};
    }, [isFocused]);

    useUpdateEffect(() => {
        setIsCheck(false);
    }, [values.busi_cnpj]);

    const isSetTime =
        values?.busi_all_open === 'Y' || // 전체 시간 체크 혹은
        (values &&
            Object.entries(values).filter(([key, value]) => {
                // 7 일 중 하나라도 Y 라면
                if (key.includes('check') && !key.includes('hp_open_check') && value === 'Y') {
                    return true;
                }
            }).length > 0); // 영업시간 체크용

    return (
        <View style={{flex: 1}}>
            <Header title={t('modalMyPageBusiness')} />

            <View style={{flex: 1}}>
                <KeyboardAwareScrollView style={{flex: 1, paddingBottom: getHeightPixel(80)}}>
                    <View style={styles.rowCenter}>
                        <View style={styles.textRowCenter}>
                            <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopName')}</Text>
                            <RedText fontSize={`${16 * fontSize}`} style={styles.marginLeft3}>
                                *
                            </RedText>
                        </View>
                        <TextInput
                            style={{...styles.textInput, fontSize: 14 * fontSize}}
                            onChangeText={_handleChange('busi_title')}
                            onBlur={handleBlur('busi_title')}
                            value={busi_title}
                            placeholderTextColor={Theme.color.gray}
                            placeholder={t('businessProfileSettingShopNamePh')}
                        />
                    </View>
                    <Line height={0.4} isGray width={getPixel(328)} style={styles.marginLeft16} />
                    <View>
                        <View style={{...styles.rowCenter, minHeight: getHeightPixel(40)}}>
                            <View style={styles.textRowCenter}>
                                <Text fontSize={`${14 * fontSize}`}>{t('cnpj')}</Text>
                                <RedText fontSize={`${14 * fontSize}`} style={styles.marginLeft3}>
                                    *
                                </RedText>
                            </View>
                            <TextInput
                                style={{
                                    ...styles.textInput,
                                    fontSize: 14 * fontSize,
                                    height: 'auto',
                                    includeFontPadding: false,
                                    paddingVertical: getHeightPixel(3),
                                }}
                                onChangeText={_handleChange('busi_cnpj')}
                                onBlur={handleBlur('busi_cnpj')}
                                value={busi_cnpj}
                                placeholderTextColor={Theme.color.gray}
                                placeholder={t('cnpjPh')}
                            />
                            <TouchableOpacity disabled={isCheck} onPress={onPressCheckCNPJ} style={styles.button}>
                                <WhiteText fontSize={`${12 * fontSize}`}>CHECK</WhiteText>
                            </TouchableOpacity>
                        </View>
                        {isError && (
                            <View style={styles.errorCNPJ}>
                                <RedText fontSize={`${10 * fontSize}`}>{t('notValidCNPJ')}</RedText>
                            </View>
                        )}
                    </View>
                    <Line height={0.4} isGray width={getPixel(328)} style={styles.marginLeft16} />
                    <View style={styles.introView}>
                        <View style={styles.textRowCenter}>
                            <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopIntroduction')}</Text>
                            <RedText fontSize={`${16 * fontSize}`} style={styles.marginLeft3}>
                                *
                            </RedText>
                        </View>
                        <TextInput
                            style={{
                                ...styles.textInput,
                                fontSize: 14 * fontSize,
                            }}
                            onChangeText={_handleChange('busi_info')}
                            onBlur={handleBlur('busi_info')}
                            value={busi_info}
                            placeholderTextColor={Theme.color.gray}
                            placeholder={t('businessProfileSettingShopIntroductionPh')}
                        />
                    </View>
                    {/* 전화번호 */}
                    <Line height={0.4} isGray width={getPixel(328)} style={styles.marginLeft16} />
                    <View style={styles.rowBetween}>
                        <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTel')}</Text>
                        <GrayText fontSize={`${14 * fontSize}`}>
                            +{user.mt_country} {user.mt_hp?.substring(0, 2)} {user.mt_hp?.substring(2)}
                        </GrayText>
                    </View>
                    {/* 핸드폰 정보 공개 여부 */}
                    <View style={styles.rowBetween}>
                        <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTelOpen')}</Text>
                        <Toggle
                            isOn={hp_open_check === 'Y'}
                            setIsOn={() => {
                                _handleChange('hp_open_check')(hp_open_check === 'Y' ? 'N' : 'Y');
                            }}
                        />
                    </View>
                    <Line height={0.4} isGray width={getPixel(328)} style={{...styles.marginLeft16, marginTop: getHeightPixel(16)}} />
                    {/* 이메일 */}
                    <View style={{...styles.rowBetween, marginTop: 0}}>
                        <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopEmail')}</Text>
                        <TextInput
                            style={{
                                ...styles.textInput,
                                fontSize: 14 * fontSize,
                                textAlign: 'right',
                            }}
                            onChangeText={_handleChange('busi_email')}
                            onBlur={handleBlur('busi_email')}
                            value={busi_email}
                            placeholderTextColor={Theme.color.black}
                            placeholder={t('email')}
                            editable={false}
                        />
                    </View>
                    <Line height={0.4} isGray width={getPixel(328)} style={styles.marginLeft16} />
                    {/* 업체 주소 등록 */}
                    <View style={styles.view}>
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
                                    value={busi_location ? t('businessProfileSettingShopAddress') : ''}
                                />
                            </View>
                            <AutoHeightImage source={ArrowRightNewIcon} width={getPixel(20)} />
                        </TouchableOpacity>

                        {/* 전화번호 */}
                        <ImageInput
                            image={PhoneBlueIcon}
                            value={busi_tel_number}
                            onChange={_handleChange('busi_tel_number')}
                            PlaceHolder={() => <RedDotText content={t('businessProfileSettingShopHp')} color={Theme.color.gray} isView={false} />}
                        />

                        {/* 영업시간 */}
                        <TouchableOpacity onPress={onPressShopTime} style={{...styles.imageInputView, justifyContent: 'space-between'}}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View style={[styles.imageInputImageView, styles.marginRight20]}>
                                    <AutoHeightImage source={ClockIcon} width={getPixel(20)} />
                                </View>

                                <RedDotText
                                    content={t('businessProfileSettingShopOpeningTime')}
                                    color={Theme.color.gray}
                                    isView={true}
                                    value={isSetTime ? t('businessProfileSettingShopAddress') : ''}
                                />
                            </View>
                            <AutoHeightImage source={ArrowRightNewIcon} width={getPixel(20)} />
                        </TouchableOpacity>

                        <ImageInput
                            image={WebIcon}
                            value={busi_website}
                            onChange={_handleChange('busi_website')}
                            PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopWebSite')}</GrayText>}
                        />
                        <ImageInput
                            image={FacebookBlueIcon}
                            value={busi_facebook}
                            onChange={_handleChange('busi_facebook')}
                            PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopFacebook')}</GrayText>}
                        />

                        <ImageInput
                            image={InstagramBlueIcon}
                            value={busi_insta}
                            onChange={_handleChange('busi_insta')}
                            PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopInstagram')}</GrayText>}
                        />
                        <ImageInput
                            image={WhatsappBlueIcon}
                            value={busi_whats}
                            onChange={_handleChange('busi_whats')}
                            PlaceHolder={() => <GrayText fontSize={`${14 * fontSize}`}>{t('businessProfileSettingShopWhatsApp')}</GrayText>}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: getPixel(16),
                            marginTop: getHeightPixel(100),
                            marginBottom: getHeightPixel(34),
                        }}>
                        <Button onPress={onPressComplete} content={t('save')} width="328px" />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

export default BusinessSignUpForm;

const styles = StyleSheet.create({
    introView: {
        marginLeft: getPixel(16),
        marginTop: getHeightPixel(16),
        width: getPixel(328),
    },
    view: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
    },
    errorCNPJ: {marginLeft: getPixel(85), marginBottom: getHeightPixel(15)},
    rowBetween: {
        flexDirection: 'row',
        width: getPixel(328),
        alignItems: 'center',
        marginHorizontal: getPixel(16),
        justifyContent: 'space-between',
        marginTop: getHeightPixel(16),
    },
    marginLeft16: {marginLeft: getPixel(16)},
    button: {
        width: getPixel(64),
        height: getHeightPixel(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.color.blue_3D,
        borderRadius: 4,
    },
    textRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        width: getPixel(65),
    },
    textInput: {
        height: '100%',
        flex: 1,
        color: Theme.color.black,
        fontFamily: Theme.fontWeight.default,
    },
    marginLeft3: {marginLeft: getPixel(3)},
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        minHeight: getHeightPixel(50),
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
    marginRight20: {
        marginRight: getPixel(20),
    },
});
