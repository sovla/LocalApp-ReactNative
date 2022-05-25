import {API} from '@/API/API';
import Theme from '@/assets/global/Theme';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import useBoolean from '@/Hooks/useBoolean';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {ChatAlarmSettingApi, ChatBlindSettingApi, ChatHistoryDeleteApi, ChatHistoryExportApi} from '@/Types/API/ChattingTypes';
import {ModalAlertViewProps, ModalChattingSettingProps} from '@/Types/Components/ChattingTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {apiResult} from '@/Util/Util';
import BangBlackIcon from '@assets/image/bang_black.png';
import BlockBlueIcon from '@assets/image/block_blue.png';
import CloseBlueIcon from '@assets/image/close_blue.png';
import ExitIcon from '@assets/image/exit.png';
import ExportIcon from '@assets/image/export.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import ReportIcon from '@assets/image/report.png';
import TrashBlueIcon from '@assets/image/trash_blue.png';
import {GrayText, Text} from '@Components/Global/text';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import RNFetchBlob from 'rn-fetch-blob';
import {SlideRightModal} from '../Home/ModalFilter';

const ModalChattingSetting: React.FC<ModalChattingSettingProps> = ({onClose, chatInfo, initData}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const navigation = useAppNavigation();
    const [isAlarm, setIsAlarm] = useState(initData.isAlarm); //  알람 온오프
    const [isBlock, setIsBlock] = useState(initData.isBlock); //  차단 온오프

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

    const downloadFile = useCallback((filePath: string) => {
        const fileArray = filePath.split('/');
        const name = fileArray[fileArray.length - 1];
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mime: 'text/plain',
                path: `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`,
                mediaScannable: true,
            },
        })
            .fetch('GET', filePath, {
                //some headers ..
            })
            .then(res => {
                // the temp file path
                console.log('The file saved to ', res.path());
            });
    }, []);

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
                exportChatHistoryApi()
                    .then(apiResult)
                    .then(res => {
                        if (res?.data) {
                            downloadFile(res.data[0]);
                        }
                    });
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

    useUpdateEffect(() => {
        alarmSettingApi().then(apiResult);
    }, [isAlarm]);
    useUpdateEffect(() => {
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
