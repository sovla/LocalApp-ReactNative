import {Dimensions, FlatList, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {DarkBlueText, GrayText, Text, WhiteText} from '@Components/Global/text';
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
import i18next from 'i18next';
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import EditModal from '@/Components/Product/EditModal';
import Screen from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import TrashBlueIcon from '@assets/image/trash_blue.png';
import ExportIcon from '@assets/image/export.png';
import ExitIcon from '@assets/image/exit.png';
import ReportIcon from '@assets/image/report.png';
import BlockBlueIcon from '@assets/image/block_blue.png';
import {SlideRightModal} from '../Home/ModalFilter';

import CloseBlueIcon from '@assets/image/close_blue.png';
import NoticeEmptyBlackIcon from '@assets/image/notice_empty_black.png';
import {ModalAlertViewProps, ModalChattingSettingProps} from '@/Types/Components/ChattingTypes';
import Notice from '@/Page/Notice/Notice';
import {usePostSend} from '@/Hooks/useApi';
import {apiResult} from '@/Util/Util';
import {ChatAlarmSettingApi, ChatBlindSettingApi, ChatHistoryDeleteApi, ChatHistoryExportApi} from '@/Types/API/ChattingTypes';
import {API} from '@/API/API';

const ModalChattingSetting: React.FC<ModalChattingSettingProps> = ({onClose, chatInfo}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    // const {user} = useAppSelector(state => state);
    const user = {
        mt_idx: '20',
        mt_uid: 'j1UxzrfptW',
    };
    const navigation = useAppNavigation();
    const [isAlarm, setIsAlarm] = useState(false); //  알람 온오프
    const [isBlock, setIsBlock] = useState(false); //  차단 온오프

    const {value: isAlert, on: onIsAlert, off: offIsAlert} = useBoolean(false);
    const [alertModal, setAlertModal] = useState<{
        content: string;
        title: string;
        onPressConfirm: () => void;
        onPressCancle: () => void;
    }>({
        content: '',
        title: '',
        onPressConfirm: () => {},
        onPressCancle: offIsAlert,
    });

    const {PostAPI: alarmSettingApi} = usePostSend<ChatAlarmSettingApi['D'], ChatAlarmSettingApi['T']>('chat_room_push_set.php', {
        mt_idx: user.mt_idx as string,
        chat_idx: chatInfo.chat_idx,
        push_set: isAlarm ? 'Y' : 'N',
    });
    const {PostAPI: blindSettingApi} = usePostSend<ChatBlindSettingApi['D'], ChatBlindSettingApi['T']>('chat_room_check_blind.php', {
        mt_idx: user.mt_idx as string,
        chat_idx: chatInfo.chat_idx,
        blind_check: isBlock ? 'Y' : 'N',
    });
    const {PostAPI: deleteChatHistoryApi} = usePostSend<ChatHistoryDeleteApi['D'], ChatHistoryDeleteApi['T']>('chat_room_chatting_delete.php', {
        mt_idx: user.mt_idx as string,
        chat_idx: chatInfo.chat_idx,
    });

    const {PostAPI: exportChatHistoryApi} = usePostSend<ChatHistoryExportApi['D'], ChatHistoryExportApi['T']>('chat_room_chatting_text_down.php', {
        mt_idx: user.mt_idx as string,
        chat_idx: chatInfo.chat_idx,
    });

    const onPressDeleteChattingContent = () => {
        //   대화내용 지우기
        onIsAlert();
        setAlertModal(prev => ({
            ...prev,
            title: t('deleteChattingContent'),
            content: t('deleteChattingContentGuide'),
            onPressConfirm: () => {
                deleteChatHistoryApi().then(apiResult);
                offIsAlert();
            },
        }));
    };
    const onPressChattingDownload = () => {
        //   대화내용 내보내기
        onIsAlert();
        setAlertModal(prev => ({
            ...prev,
            title: t('chattingDownloadAlert'),
            content: t('chattingDownloadGuideAlert'),
            onPressConfirm: () => {
                exportChatHistoryApi().then(apiResult);
                offIsAlert();
            },
        }));
    };
    const onPressUserBlock = () => {
        //   유저 차단
        if (!isBlock) {
            onIsAlert();
            setAlertModal(prev => ({
                ...prev,
                title: t('userBlock'),
                content: t('userBlockAlert'),
                onPressConfirm: () => {
                    setIsBlock(true);
                    offIsAlert();
                },
            }));
        } else {
            setIsBlock(false);
        }
    };

    const onPressBlockManagement = () => {
        onClose();
        navigation.navigate('BlockList');
    };
    const onPressReport = () => {
        onClose();
        navigation.navigate('ReportCategory', {
            pt_idx: chatInfo.pt_idx,
        });
    };

    const onPressExit = useCallback(() => {
        onClose();
        navigation.goBack();
        API.post('chat_room_leave.php', {mt_idx: user.mt_idx, chat_idx: chatInfo.chat_idx}); // 방나가기
    }, []);

    useEffect(() => {
        alarmSettingApi().then(apiResult);
    }, [isAlarm]);
    useEffect(() => {
        blindSettingApi().then(apiResult);
    }, [isBlock]);

    return (
        <Modal visible transparent onRequestClose={onClose}>
            <View style={[styles.dim]}>
                {isAlert && (
                    <View style={styles.alertAbsoluteView}>
                        <ModalAlertView
                            isBang
                            title={alertModal.title}
                            content={alertModal.content}
                            onClose={onClose}
                            onPressConfirm={alertModal.onPressConfirm}
                            onPressCancle={alertModal.onPressCancle}
                        />
                    </View>
                )}

                <SlideRightModal onClose={onClose}>
                    <View
                        style={{
                            paddingHorizontal: getPixel(16),
                            paddingTop: getHeightPixel(60),
                        }}>
                        <View style={styles.rowBoxBetween}>
                            <View style={styles.rowCenter}>
                                <View style={styles.imageView}>
                                    <AutoHeightImage source={NoticeColorIcon} width={getPixel(15.84)} />
                                </View>
                                <Text fontSize={`${16 * fontSize}`}>{t('alarmSetting')}</Text>
                            </View>
                            <Toggle isOn={isAlarm} setIsOn={setIsAlarm} />
                        </View>
                        <View style={styles.rowBoxBetween}>
                            <View style={styles.rowCenter}>
                                <View style={styles.imageView}>
                                    <AutoHeightImage source={CloseBlueIcon} width={getPixel(20)} />
                                </View>
                                <Text fontSize={`${16 * fontSize}`}>{t('userBlock')}</Text>
                            </View>
                            <Toggle isOn={isBlock} setIsOn={onPressUserBlock} />
                        </View>
                        <Line isGray width={getPixel(274)} />
                        <TouchableOpacity onPress={onPressDeleteChattingContent} style={[styles.rowBox]}>
                            <View style={styles.imageView}>
                                <AutoHeightImage source={TrashBlueIcon} width={getPixel(20)} />
                            </View>
                            <Text fontSize={`${16 * fontSize}`}>{t('deleteChattingContent')}</Text>
                        </TouchableOpacity>
                        <Line isGray width={getPixel(274)} />
                        <TouchableOpacity onPress={onPressChattingDownload} style={[styles.rowBox, {paddingVertical: getHeightPixel(20)}]}>
                            <View
                                style={[
                                    styles.imageView,
                                    {
                                        alignSelf: 'flex-start',
                                        marginTop: getHeightPixel(5),
                                    },
                                ]}>
                                <AutoHeightImage source={ExportIcon} width={getPixel(20)} />
                            </View>
                            <View>
                                <Text fontSize={`${16 * fontSize}`}>{t('chattingDownload')}</Text>
                                <GrayText fontSize={`${12 * fontSize}`}>{t('chattingDownloadGuide')}</GrayText>
                            </View>
                        </TouchableOpacity>
                        <Line isGray width={getPixel(274)} />
                        <TouchableOpacity onPress={onPressBlockManagement} style={[styles.rowBox]}>
                            <View style={styles.imageView}>
                                <AutoHeightImage source={BlockBlueIcon} width={getPixel(20)} />
                            </View>
                            <Text fontSize={`${16 * fontSize}`}>{t('blockUserManagement')}</Text>
                        </TouchableOpacity>
                        <Line isGray width={getPixel(274)} />

                        <TouchableOpacity onPress={onPressReport} style={[styles.rowBox]}>
                            <View style={styles.imageView}>
                                <AutoHeightImage source={ReportIcon} width={getPixel(20)} />
                            </View>
                            <Text fontSize={`${16 * fontSize}`}>{t('report')}</Text>
                        </TouchableOpacity>
                        <Line isGray width={getPixel(274)} />
                        <TouchableOpacity onPress={onPressExit} style={[styles.rowBox]}>
                            <View style={styles.imageView}>
                                <AutoHeightImage source={ExitIcon} width={getPixel(20)} />
                            </View>
                            <Text fontSize={`${16 * fontSize}`}>{t('exit')}</Text>
                        </TouchableOpacity>
                    </View>
                </SlideRightModal>
            </View>
        </Modal>
    );
};

export default ModalChattingSetting;

export const ModalAlertView: React.FC<ModalAlertViewProps> = ({onClose, title, content, onPressConfirm, isBang, onPressCancle}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.alertModalWhitebox}>
            <View style={styles.alertModalView}>
                <View style={styles.rowCenter}>
                    {isBang && <Image source={BangBlackIcon} style={styles.alertModalBangImage} />}
                    <Text fontSize={`${18 * fontSize}`}>{title}</Text>
                </View>
                <Line isGray width={getPixel(240)} style={styles.alertModalLine} />
                <View style={styles.alertModalContentText}>
                    <Text fontSize={`${14 * fontSize}`}>{content}</Text>
                </View>
                <View style={styles.rowCenter}>
                    <TouchableOpacity onPress={onPressCancle} style={styles.alertModalCancleView}>
                        <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
                            {t('cancle')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressConfirm} style={styles.alertModalConfirmView}>
                        <Text color={Theme.color.white} fontSize={`${16 * fontSize}`}>
                            {t('confirm')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export const ModalAlertViewNoneTitle: React.FC<Pick<ModalAlertViewProps, 'onClose' | 'content' | 'onPressConfirm' | 'onPressCancle'>> = ({onClose, content, onPressConfirm, onPressCancle}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={{...styles.alertModalWhitebox, height: getHeightPixel(146)}}>
            <View style={styles.alertModalView}>
                <View style={{...styles.alertModalContentText, height: getHeightPixel(55)}}>
                    <Text fontSize={`${14 * fontSize}`}>{content}</Text>
                </View>
                <View style={styles.rowCenter}>
                    <TouchableOpacity onPress={onPressCancle} style={styles.alertModalCancleView}>
                        <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
                            {t('cancle')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressConfirm} style={styles.alertModalConfirmView}>
                        <Text color={Theme.color.white} fontSize={`${16 * fontSize}`}>
                            {t('confirm')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    alertAbsoluteView: {
        position: 'absolute',
        width: getPixel(360),
        height: getHeightPixel(740),
        zIndex: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0007',
    },
    imageView: {
        width: getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: getPixel(10),
    },
    alertModalBangImage: {
        width: getPixel(20),
        height: getPixel(20),
        marginRight: getPixel(10),
    },
    alertModalWhitebox: {
        width: getPixel(280),
        height: getHeightPixel(185),
        backgroundColor: Theme.color.white,
        borderRadius: getPixel(8),
    },
    alertModalView: {
        width: getPixel(240),
        marginTop: getHeightPixel(20),
        marginLeft: getPixel(20),
    },
    alertModalLine: {
        marginTop: getHeightPixel(10),
        marginBottom: getHeightPixel(20),
    },
    alertModalConfirmView: {
        width: getPixel(114),
        height: getHeightPixel(36),
        borderColor: Theme.color.blue_3D,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Theme.color.blue_3D,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: getPixel(15),
    },
    alertModalCancleView: {
        width: getPixel(114),
        height: getHeightPixel(36),
        borderColor: Theme.color.blue_3D,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertModalContentText: {
        height: getHeightPixel(40),
        marginBottom: getHeightPixel(10),
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBox: {
        flexDirection: 'row',
        minHeight: getHeightPixel(50),
        width: getPixel(274),
        alignItems: 'center',
    },
    rowBoxBetween: {
        flexDirection: 'row',
        height: getHeightPixel(50),
        justifyContent: 'space-between',
        width: getPixel(274),
        alignItems: 'center',
    },
    dim: {
        flex: 1,
        backgroundColor: '#0007',
    },
});
