import {Dimensions, FlatList, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {DarkBlueText, GrayText, RedText, Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps, ModalMyPageProps, ModalUploadModalProps} from '@/Types/Components/HomeTypes';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import WriteIcon from '@assets/image/write.png';
import TrashWhiteIcon from '@assets/image/trash_white.png';
import BackWhiteIcon from '@assets/image/back_white.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
import Header from '@/Components/LoginSignUp/Header';
import {Button, CheckBox, CheckBoxImage, Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch} from 'react-redux';
import {fontChange, fontSizeState} from '@/Store/fontSizeState';
import i18next, {t} from 'i18next';
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import EditModal from '@/Components/Product/EditModal';
import Screen, {BusinessSignUpFormProps} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik, FormikHelpers, useFormik} from 'formik';
import {string} from 'yup';
import {RowBox} from '@/Components/Global/container';
import {ImageInput, RedDotText} from './BusinessProfileSetting';

import HomeIcon from '@assets/image/home.png';
import PhoneBlueIcon from '@assets/image/phone_blue.png';
import MobileBlueIcon from '@assets/image/mobile_blue.png';
import ClockIcon from '@assets/image/clock.png';
import WebIcon from '@assets/image/web.png';
import FacebookBlueIcon from '@assets/image/facebook_blue.png';
import InstagramBlueIcon from '@assets/image/instagram_blue.png';
import ArrowRightNewIcon from '@assets/image/arrow_right_new.png';
import WhatsappBlueIcon from '@assets/image/whatsapp_blue.png';
import * as Yup from 'yup';
import {usePostSend} from '@/Hooks/useApi';
import {apiResult} from '@/Util/Util';

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
    busi_mon_check: 'Y' | 'N';
    busi_mon_start: string;
    busi_mon_end: string;
    busi_website: string;
    busi_facebook: string;
    busi_insta: string;
    busi_whats: string;
}

const BusinessSignUpForm = ({navigation}: BusinessSignUpFormProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
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
    } = useFormik<BusinessSignUpData>({
        initialValues: {
            busi_title: '',
            busi_cnpj: '15.664.649/0001-84',
            busi_info: '',
            hp_open_check: user?.mt_hp_open ?? 'Y',
            busi_location: '',
            busi_location_detail: '',
            busi_email: user?.mt_email ?? 'dummy@naver.com',
            busi_lat: -23.15123124,
            busi_lng: -32.12341,
            busi_tel_country: '',
            busi_tel_number: '',
            busi_cell_country: '',
            busi_cell_number: '',
            busi_all_open: 'Y',
            busi_mon_check: 'N',
            busi_mon_start: '09:00',
            busi_mon_end: '18:00',
            busi_website: '',
            busi_facebook: '',
            busi_insta: '',
            busi_whats: '',
        },
        onSubmit: (values: BusinessSignUpData, formikHelpers: FormikHelpers<BusinessSignUpData>) => {
            console.log('전송된 데이터', values);
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
    const _handleChange = useCallback(
        <T extends keyof BusinessSignUpData>(field: T) =>
            (e: BusinessSignUpData[T] | React.ChangeEvent<any>) => {
                if (typeof e === 'string') {
                    handleChange(field)(e);
                }
            },
        [],
    );

    const onPressShopAddress = useCallback(() => {
        navigation.navigate('ProductLocation');
    }, []);
    const onPressShopTime = useCallback(() => {
        navigation.navigate('BusinessOpeningHours');
    }, []);

    const onPressCheckCNPJ = () => {
        checkCNPJ()
            .then(apiResult)
            .then(res => {
                if (res) {
                    console.log(res, 'result');
                }
            });
    };

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
                            <TouchableOpacity onPress={onPressCheckCNPJ} style={styles.button}>
                                <WhiteText fontSize={`${12 * fontSize}`}>CHECK</WhiteText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.errorCNPJ}>
                            <RedText fontSize={`${10 * fontSize}`}>* CNPJ não é válido!</RedText>
                        </View>
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
                    <Line height={0.4} isGray width={getPixel(328)} style={styles.marginLeft16} />
                    <View style={styles.rowBetween}>
                        <Text fontSize={`${16 * fontSize}`}>{t('businessProfileSettingShopTel')}</Text>
                        <GrayText fontSize={`${14 * fontSize}`}>
                            +{user.mt_country} {user.mt_hp?.substring(0, 2)} {user.mt_hp?.substring(2)}
                        </GrayText>
                    </View>
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
                            onChange={() => {}}
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
                                    value={busi_location ? t('businessProfileSettingShopAddress') : ''}
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
                        <Button onPress={handleSubmit} content={t('save')} width="328px" />
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
