import Theme from '@/assets/global/Theme';
import {GrayText, WhiteText} from '@/Components/Global/text';
import Header from '@/Components/Profile/Header';
import {useAppDispatch, useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import {changeProfileImage} from '@/Store/userState';
import {BusinessPhotoChangeApi} from '@/Types/API/BusinessTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton, getHitSlop, showToastMessage} from '@/Util/Util';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import CopyIcon from '@assets/image/copy.png';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ModalPhoto from './ModalPhoto';

const BusinessProfileHeader: React.FC<{
    title?: string;
    isUpdate?: boolean;
}> = ({title, isUpdate = true}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const [isModalPhoto, setIsModalPhoto] = useState(false);
    const [image, setImage] = useState<null | {path: string; mime: string}>(null);

    const {PostAPI} = usePostSend<BusinessPhotoChangeApi, any>('member_busi_img_update.php', {
        mt_idx: user.mt_idx as string,
        busi_file: image,
        imageField: 'busi_file',
    });

    const onPressCamera = useCallback(() => {
        if (setIsModalPhoto) setIsModalPhoto(true);
    }, []);
    const imageReturnFn = (image: {path: string; mime: string}[]) => {
        // 이미지 모달 완료 버튼 -> 이미지 저장 및 모달 끄기
        setImage(image[0]);
        PostAPI({
            busi_file: image[0],
        }).then(res => {
            if (res?.result === 'false' && res?.msg) {
                return AlertButton(res.msg);
            } else {
                dispatch(changeProfileImage(image[0].path));
                setImage(null);
            }
        });
        setIsModalPhoto(false);
    };

    const onPressUID = useCallback(() => {
        Clipboard.setString(user.mt_uid as string);
        showToastMessage(t('copyUid'));
    }, []);

    return (
        <View style={styles.headerView}>
            <Header isBack title={title ?? t('BusinessProfileMenuTitle')} />
            <View style={styles.profileContainer}>
                <TouchableOpacity disabled={!isUpdate} onPress={onPressCamera}>
                    <View style={styles.profileView}>
                        <Image source={image ? {uri: image.path} : {uri: user.mt_profile as string}} style={styles.profileImage} />
                    </View>
                    <View>
                        <Image source={CameraWhiteIcon} style={styles.cameraWhiteImage} />
                    </View>
                </TouchableOpacity>
                <View>
                    <WhiteText fontSize={`${16 * fontSize}`} medium>
                        {user.mt_name}
                    </WhiteText>
                    <GrayText fontSize={`${12 * fontSize}`}>{user.mt_memo}</GrayText>
                    <View style={styles.uidView}>
                        <WhiteText fontSize={`${14 * fontSize}`}>NC : {user.mt_uid}</WhiteText>
                        <TouchableOpacity onPress={onPressUID} style={styles.marginLeft10} hitSlop={getHitSlop(5)}>
                            <AutoHeightImage source={CopyIcon} width={getPixel(16)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isModalPhoto && <ModalPhoto onClose={() => setIsModalPhoto(false)} returnFn={imageReturnFn} />}
        </View>
    );
};

export default BusinessProfileHeader;

const styles = StyleSheet.create({
    uidView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHeightPixel(15),
    },
    marginLeft10: {
        marginLeft: getPixel(10),
    },
    headerView: {height: getHeightPixel(200), marginBottom: getHeightPixel(10)},
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
