import {Dimensions, Image, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {ModalMyPageProps} from '@/Types/Components/HomeTypes';
import {SlideRightModal} from './ModalFilter';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import DummyProfileImage from '@assets/image/dummy_profile.png';
import Line from '../Global/Line';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import DocumentIcon from '@assets/image/document.png';
import PurchaseListIcon from '@assets/image/purchase_list.png';
import CategoryColorIcon from '@assets/image/category_color.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
import {usePostSend} from '@/Hooks/useApi';
import {LogoutAPi} from '@/Types/API/HomeTypes';
import {AlertButton, apiResult} from '@/Util/Util';
import {useDispatch} from 'react-redux';
import {clearUser} from '@/Store/userState';

const ModalMyPage: React.FC<ModalMyPageProps> = ({onClose}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();
    const dispatch = useDispatch();

    const {PostAPI} = usePostSend<LogoutAPi, any>('member_logout.php', {
        mt_idx: user.mt_idx as string,
    });

    const isLogin = true;
    const isBusiness = user.mt_busi === 'Y';
    const login = {
        name: user?.mt_name ?? '',
        statusMessage: user?.mt_memo ?? '',
        image: {uri: user?.mt_profile},
    };

    const onPressSaleProduct = useCallback(() => {
        //  판매상품 눌럿을 때
        navigation.navigate('MyProduct');
        onClose();
    }, []);

    const onPressMyProfile = useCallback(() => {
        //  내프로필 눌럿을때
        navigation.navigate('ProfileDetail');
        onClose();
    }, []);
    const onPressNotice = useCallback(() => {
        navigation.navigate('Notice');
        onClose();
    }, []);
    const onPressAlarmList = useCallback(() => {
        navigation.navigate('AlarmList', {
            menu: 'alarm',
        });
        onClose();
    }, []);
    const onPressBusinessChange = useCallback(() => {
        if (isBusiness) {
            navigation.navigate('BusinessProfileMenu');
        } else {
            navigation.navigate('BusinessSignUp');
        }

        onClose();
    }, [isBusiness]);
    const onPressPurchase = useCallback(() => {
        navigation.navigate('PurchaseList');
        onClose();
    }, []);
    const onPressInterestCategory = useCallback(() => {
        navigation.navigate('MyCategory');
        onClose();
    }, []);
    const onPressKeywordAlarm = useCallback(() => {
        navigation.navigate('AlarmList');
        onClose();
    }, []);
    const onPressSettings = useCallback(() => {
        navigation.navigate('Setting');
        onClose();
    }, []);
    const onPressServiceCenter = useCallback(() => {
        navigation.navigate('ServiceCenter');
        onClose();
    }, []);
    const onPressLogout = useCallback(() => {
        PostAPI()
            .then(apiResult)
            .then(res => {
                dispatch(clearUser());
                onClose();
                navigation.navigate('Login');
            });
    }, []);

    return (
        <View style={modalDim}>
            <SlideRightModal onClose={onClose}>
                <View>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 100,
                        }}></View>

                    <TouchableOpacity style={styles.backImageView} onPress={onClose}>
                        <Image source={BackBlackBoxIcon} style={styles.backImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressMyProfile} style={styles.profileView}>
                        <View
                            style={
                                isLogin
                                    ? styles.loginImageView
                                    : {
                                          marginRight: getPixel(12),
                                      }
                            }>
                            <Image
                                source={isLogin ? login.image : isBusiness ? require('@assets/image/dummy_b.png') : DummyProfileImage}
                                style={styles.loginImage}
                                resizeMode={isLogin ? 'cover' : 'contain'}
                            />
                        </View>
                        {isLogin ? (
                            <View>
                                <Text fontSize={`${16 * fontSize}`} medium>
                                    {login.name}
                                </Text>
                                <GrayText fontSize={`${12 * fontSize}`}>{login.statusMessage}</GrayText>
                            </View>
                        ) : (
                            <Text
                                medium
                                fontSize={`${16 * fontSize}`}
                                style={{
                                    width: getPixel(92),
                                }}>
                                {t('modalMyPageLoginGuide')}
                            </Text>
                        )}
                    </TouchableOpacity>
                    <ImageWithView image={AnnouncementIcon} content={t('modalMyPageNotice')} width={getPixel(290)} onPress={onPressNotice} />
                    <ImageWithView image={NoticeColorIcon} imageWidth={getPixel(15.38)} content={t('modalMyPageAlarm')} onPress={onPressAlarmList} />
                    <ImageWithView image={StoreIcon} content={t(isBusiness ? 'modalMyPageBusinessUpdate' : 'modalMyPageBusiness')} onPress={onPressBusinessChange} />
                    <Line height={getHeightPixel(10)} style={{marginBottom: getHeightPixel(10)}} />
                    <ImageWithView image={DocumentIcon} content={t('modalMyPageProduct')} onPress={onPressSaleProduct} />
                    <ImageWithView image={PurchaseListIcon} content={t('modalMyPagePurchaseList')} onPress={onPressPurchase} />
                    <ImageWithView image={CategoryColorIcon} content={t('modalMyPageCategory')} onPress={onPressInterestCategory} />
                    <ImageWithView image={NoticeOn} content={t('modalMyPageKeyword')} onPress={onPressKeywordAlarm} />
                    <Line height={getHeightPixel(10)} style={{marginBottom: getHeightPixel(10)}} />
                    <ImageWithView image={SettingsIcon} content={t('modalMyPageSettings')} onPress={onPressSettings} />

                    <ImageWithView image={ServiceCenterIcon} content={t('modalMyPageServiceCenter')} onPress={onPressServiceCenter} />
                    <View style={styles.touchBlockView}></View>
                </View>
                <TouchableOpacity
                    onPress={onPressLogout}
                    style={[
                        styles.loginView,
                        Dimensions.get('window').height > 800
                            ? {
                                  flex: 1,
                              }
                            : {
                                  height: getHeightPixel(83),
                              },
                    ]}>
                    <Image
                        source={isLogin ? require('@assets/image/logout.png') : require('@assets/image/login.png')}
                        style={{
                            width: getPixel(20),
                            height: getPixel(20),
                        }}
                    />
                    <Text fontSize={`${18 * fontSize}`} bold color={Theme.color.blue_3D} style={{marginLeft: getPixel(10)}}>
                        {isLogin ? t('modalMyPageLogout') : t('modalMyPageLogin')}
                    </Text>
                </TouchableOpacity>
            </SlideRightModal>
        </View>
    );
};

export const ImageWithView: React.FC<{
    image: any;
    imageWidth?: number;
    fontSize?: number;
    content: string;
    width?: number;
    onPress?: () => void;
}> = ({image, imageWidth = getPixel(20), fontSize, content, onPress, width = getPixel(310)}) => {
    const fontSizeState = useAppSelector(state => state.fontSize.value);
    const applyFontSize = fontSize ?? 16 * fontSizeState;
    return (
        <>
            <View
                style={{
                    width,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View style={styles.imageWithViewView}>
                    <Image
                        source={image}
                        style={{
                            width: imageWidth,
                            height: getHeightPixel(20),
                        }}
                        resizeMode="contain"
                    />
                </View>
                <TouchableOpacity onPress={onPress} style={[styles.imageWithViewTouch]}>
                    <Text fontSize={`${applyFontSize}`}>{content}</Text>
                </TouchableOpacity>
            </View>
            <Line isGray height={0.4} />
        </>
    );
};

export const modalDim: ViewStyle = {
    flex: 1,
    backgroundColor: '#0007',
};

export default ModalMyPage;

const styles = StyleSheet.create({
    touchBlockView: {
        position: 'absolute',
        left: 0,
        top: getHeightPixel(60),
        width: getPixel(20),
        height: getHeightPixel(700),
    },
    loginImage: {
        width: getPixel(56),
        height: getHeightPixel(56),
    },
    loginImageView: {
        width: getPixel(56),
        height: getHeightPixel(56),
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: getPixel(12),
    },
    loginView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: getPixel(25),
    },
    profileView: {
        flexDirection: 'row',
        marginLeft: getPixel(19),
        marginVertical: getHeightPixel(20),
        alignItems: 'center',
    },
    backImageView: {
        width: getPixel(30),
        height: getPixel(30),
        marginTop: getHeightPixel(14),
        marginLeft: getPixel(19),
    },
    backImage: {
        width: getPixel(30),
        height: getPixel(30),
    },
    imageWithViewTouch: {
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
        width: getPixel(150),
    },
    imageWithViewView: {
        width: getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: getPixel(10),
        marginLeft: getPixel(20),
    },
});
