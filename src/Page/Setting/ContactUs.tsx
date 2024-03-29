import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import {ContactUsProps} from '@/Types/Screen/Screen';
import ArrowDownIcon from '@assets/image/arrow_down.png';
import {TextInput} from 'react-native-gesture-handler';

import {ContactType} from '@/Types/Components/SettingTypes';

import useObject from '@/Hooks/useObject';
import CameraGrayIcon from '@assets/image/camera_gray.png';
import ModalContact from '@/Components/Setting/ModalContact';
import ModalPhoto from '@/Components/Business/ModalPhoto';
import {usePostSend} from '@/Hooks/useApi';
import {AlertButton, apiResult, showToastMessage} from '@/Util/Util';

const ContactUs = ({navigation}: ContactUsProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const [isSelectModal, setIsSelectModal] = useState(false);
    const [isPhotoModal, setIsPhotoModal] = useState(false);
    const [contact, setContact, onChangeContact] = useObject<{
        type: number | null;
        email: string;
        content: string;
        image: {
            path: string;
            mime: string;
        }[];
    }>({
        type: null,
        email: '',
        content: '',
        image: [],
    });

    const {PostAPI} = usePostSend('mng_qna_reg.php', {
        mqr_type: contact.type,
        mqr_email: contact.email,
        mqr_content: contact.content,
        imageField: 'mqr_file',
        mqr_file: contact.image,
    });

    const onPressCamera = useCallback(() => {
        setIsPhotoModal(true);
    }, []);

    const onPressItem = useCallback((typeNumber: number) => {
        onChangeContact('type', typeNumber);
        setIsSelectModal(false);
    }, []);

    const onPressPhotoComplete = useCallback(
        (
            image: {
                path: string;
                mime: string;
            }[],
        ) => {
            onChangeContact('image', image);
            setIsPhotoModal(false);
        },

        [],
    );

    const onPressComplete = useCallback(async () => {
        if (contact.type == null) {
            AlertButton(t('contactTypeAlert'));
            return;
        }
        if (contact.email.length === 0) {
            AlertButton(t('contactEmailAlert'));
            return;
        }
        if (contact.content.length === 0) {
            AlertButton(t('contactContentAlert'));
            return;
        }
        PostAPI()
            .then(apiResult)
            .then(res => {
                navigation.goBack();
                showToastMessage(t('toastContact'));
            });
        // api 처리
        // ;
    }, [contact]);
    const menuList: ContactType[] = ['user', 'ad', 'report', 'error', 'other'];

    return (
        <View style={{flex: 1, backgroundColor: isSelectModal ? '#0001' : '#fff'}}>
            <Header title={t('contactUsTitle')} />
            <View style={styles.conatiner}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => setIsSelectModal(true)} style={styles.typeView}>
                        <Text color={contact.type != null ? Theme.color.black : Theme.color.gray} fontSize={`${14 * fontSize}`}>
                            {t(contact.type != null ? 'contact' + menuList[contact.type] : 'contactUsGuide1')}
                        </Text>
                        <Image
                            source={ArrowDownIcon}
                            style={{
                                width: getPixel(8),
                                height: getPixel(12),
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{...styles.emailTextInput, fontSize: 14 * fontSize}}
                        value={contact.email}
                        placeholder={t('contactUsGuide2')}
                        onChangeText={text => onChangeContact('email', text)}
                        placeholderTextColor={Theme.color.gray}
                    />
                    <TextInput
                        style={{
                            ...styles.contactTextInput,
                            fontSize: 14 * fontSize,
                        }}
                        multiline
                        maxLength={1000}
                        placeholder={t('contactUsGuide3')}
                        value={contact.content}
                        onChangeText={text => onChangeContact('content', text)}
                        placeholderTextColor={Theme.color.gray}
                    />
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={onPressCamera} style={styles.cameraImageTouch}>
                            <AutoHeightImage source={CameraGrayIcon} width={getPixel(20)} />

                            <GrayText fontSize={`${14 * fontSize}`}>{`${contact.image.length}/${2}`}</GrayText>
                        </TouchableOpacity>
                        <GrayText fontSize={`${14 * fontSize}`} style={styles.marginLeft12}>
                            {t('contactUsGuide4')}
                        </GrayText>
                    </View>
                    <View
                        style={[
                            styles.rowCenter,
                            {
                                marginTop: getHeightPixel(10),
                            },
                        ]}>
                        {contact.image.map(v => (
                            <View style={styles.imageView}>
                                <Image source={{uri: v.path}} style={styles.image} />
                            </View>
                        ))}
                    </View>
                    <Button
                        onPress={onPressComplete}
                        content={t('searchModalButton')}
                        width="300px"
                        style={{marginHorizontal: getPixel(14), marginTop: getHeightPixel(contact.image.length > 0 ? 45 : 120)}}
                    />
                </KeyboardAwareScrollView>
            </View>
            {isSelectModal && <ModalContact onClose={() => setIsSelectModal(false)} onPressItem={onPressItem} />}
            {isPhotoModal && <ModalPhoto onClose={() => setIsPhotoModal(false)} returnFn={onPressPhotoComplete} count={2} />}
        </View>
    );
};

export default ContactUs;

const styles = StyleSheet.create({
    image: {
        width: getPixel(64),
        height: getPixel(64),
    },
    imageView: {
        width: getPixel(64),
        height: getPixel(64),
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: getPixel(12),
    },
    rowCenter: {flexDirection: 'row', alignItems: 'center'},
    conatiner: {
        flex: 1,
        paddingHorizontal: getPixel(16),
    },
    cameraImageTouch: {
        width: getPixel(64),
        height: getPixel(64),
        borderRadius: getPixel(8),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    marginLeft12: {
        marginLeft: getPixel(12),
    },
    contactTextInput: {
        width: getPixel(328),
        minHeight: getHeightPixel(230),
        paddingVertical: getHeightPixel(12),
        borderColor: '#DADADA',
        borderWidth: 0.6,
        borderRadius: 4,
        paddingHorizontal: getPixel(14),
        textAlignVertical: 'top',
        marginTop: getHeightPixel(26),
        marginBottom: getHeightPixel(10),
        color: Theme.color.black,
    },
    emailTextInput: {
        width: getPixel(328),
        minHeight: getHeightPixel(44),
        maxHeight: 44,
        paddingVertical: getHeightPixel(12),
        borderColor: '#DADADA',
        borderWidth: 0.6,
        borderRadius: 4,
        paddingHorizontal: getPixel(14),
        color: Theme.color.black,
    },
    typeView: {
        width: getPixel(328),
        height: getHeightPixel(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#DADADA',
        borderWidth: 0.6,
        borderRadius: 4,
        paddingHorizontal: getPixel(14),
        marginTop: getHeightPixel(40),
        marginBottom: getHeightPixel(10),
    },
});
