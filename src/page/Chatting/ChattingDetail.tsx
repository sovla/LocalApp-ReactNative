import {Image, ImageBackground, Keyboard, StyleSheet, TouchableOpacity, View, TextInput, Platform, FlatList, KeyboardAvoidingView} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import AutoHeightImage from 'react-native-auto-height-image';

import BackWhiteIcon from '@assets/image/back_white.png';
import {ChattingDetailProps} from '@/Types/Screen/Screen';

import ChattingBgImage from '@assets/image/chatting_bg.png';

import SearchWhiteIcon from '@assets/image/search_white.png';
import MoreWhiteIcon from '@assets/image/more_white.png';
import StoreWhiteIcon from '@assets/image/store_white.png';
import {getHitSlop} from '@/Util/Util';
import OtherChatting from '@/Components/Chatting/OtherChatting';
import ChatDate from '@/Components/Chatting/ChatDate';
import MyChatting from '@/Components/Chatting/MyChatting';
import ProductChatting from '@/Components/Chatting/ProductChatting';
import SendGrayIcon from '@assets/image/send_gray.png';
import PlusMenuIcon from '@assets/image/plus_menu.png';
import GalleryPurpleIcon from '@assets/image/gallery_purple.png';
import CameraSkyIcon from '@assets/image/camera_sky.png';
import LocationOrangeIcon from '@assets/image/location_orange.png';
import LocationChatting from '@/Components/Chatting/LocationChatting';
import ModalChattingSetting from '@/Components/Chatting/ModalChattingSetting';
import SendBird from 'sendbird';
import messaging from '@react-native-firebase/messaging';
import ModalPhoto from '@/Components/Business/ModalPhoto';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function ChattingDetail({navigation}: ChattingDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const {
        global: {
            data: {token, sb},
        },
        user,
    } = useAppSelector(state => state);
    const {value: isSetting, on: onIsSetting, off: offIsSetting} = useBoolean(false);
    const [isOn, setIsOn] = useState<boolean>(false);

    const [chatting, setChatting] = useState<string>('');
    const [Channel, setChannel] = useState<SendBird.GroupChannel | undefined>();
    const [chatList, setChatList] = useState<(SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage)[]>([]);
    const [query, setQuery] = useState<SendBird.PreviousMessageListQuery>();

    const [isAlbum, setIsAlbum] = useState(false);

    // const [chatIdSet, setChatIdSet] = useState(new Set()); 필요 없을듯

    const flatListRef = useRef<FlatList>(null);
    const scrollPosition = useRef({
        position: 0,
        keyboardHeight: 0,
    });

    const channelHandler = new sb.ChannelHandler();
    channelHandler.onMessageReceived = async (targetChannel, message) => {
        setChatList(prev => [...prev, message]);
    };

    sb.addChannelHandler('chat', channelHandler);

    const getSendBirdMessage = async () => {
        if (Channel) {
            if (query?.hasMore) {
                const messages = await query.load(100, true);
                console.log('getMessages ::: ', messages);
                setChatList(messages);
            }
        }
    };

    const channelName = 'chat_chat_uid';

    const onPressLocation = useCallback(() => {
        navigation.navigate('ChattingLocation');
    }, []);

    const onPressShopIcon = useCallback(() => {
        navigation.navigate('ProfileHome', {
            sell_idx: '1', // 수정필요 고정값
        });
    }, []);

    const scrollToEnd = () => {
        if (flatListRef?.current)
            flatListRef.current?.scrollToOffset({
                offset: chatList.length > 0 ? 500 * chatList.length : 20000,
                animated: true,
            });
    };

    async function StartChat() {
        const params = new sb.UserMessageParams();

        params.message = chatting;

        if (Channel) {
            Channel.sendUserMessage(params, (error, message) => {
                setChatList(prev => [...prev, message]);
                console.log('보낸 메시지 에러', error);
                // setChatList(prev => [...prev, message]);
            });
        }
    }

    const fileSend = async (images: {path: string; mime: string}[]) => {
        setIsAlbum(false);

        const params = new sb.FileMessageParams();
        const image = images[0];
        const cropImage = await ImageCropPicker.openCropper({
            path: image.path,
            mediaType: 'photo',
            compressImageMaxHeight: 1000,
            compressImageMaxWidth: 1000,
            enableRotationGesture: false,
            forceJpg: true,
        });
        params.file = {
            size: cropImage.size,
            url: Platform.OS === 'android' ? cropImage.path.replace('file://', '') : cropImage.path.replace('file://', ''),
            type: cropImage.mime,
            name: 'auto.jpg',
        };
        params.fileName = 'auto.jpg';
        params.fileSize = cropImage.size;
        params.fileUrl = Platform.OS === 'android' ? cropImage.path.replace('file://', '') : cropImage.path.replace('file://', '');
        params.mimeType = cropImage.mime;
        console.log(cropImage);
        Channel?.sendFileMessage(params, (error, message) => {
            if (error) {
                console.log('Error Send File', error);
            }
            console.log('message File Send', message);
        });
    };

    const onPressAlbum = useCallback(() => {
        setIsAlbum(true);
    }, []);
    const onPressCamera = useCallback(() => {}, []);

    useEffect(() => {
        (async () => {
            if (user?.mt_idx) {
                // 토큰 셋팅
                const authorizationStatus = await messaging().requestPermission();
                if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED || authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                    if (Platform.OS === 'ios') {
                        const token = await messaging().getAPNSToken();

                        sb.registerAPNSPushTokenForCurrentUser(token as string);
                    } else {
                        const token = await messaging().getToken();
                        sb.registerGCMPushTokenForCurrentUser(token);
                    }
                }
            }

            await sb.connect(user.mt_uid as string, (err, user) => {
                console.log('connect ::: ', err, user);
            });
            const listQuery = sb.GroupChannel.createMyGroupChannelListQuery(); // 그룹 채널 찾기
            let find = false; // 그룹 채널 있을경우 true
            listQuery.includeEmpty = true; // 빈곳도 찾기

            // listQuery.userIdsIncludeFilter = [user.mt_idx as string];
            listQuery.channelUrlsFilter = ['sendbird_group_channel_72905088_31d25895a7e551fe62b50faa2af6c29bcc194717'];
            if (listQuery.hasNext) {
                await listQuery.next((err, groupChannels) => {
                    if (err) {
                        // 에러 거르기
                        console.log('groupChannelsFind Err', err);
                    }
                    console.log('groupChannels', groupChannels);
                    if (groupChannels && Array.isArray(groupChannels))
                        groupChannels.forEach(channel => {
                            console.log('channelFind', channel);
                            if (channel.name === channelName) {
                                setChannel(channel);
                                find = true;
                            }
                        });
                });
            }
            if (!find) {
                const params = new sb.GroupChannelParams();
                params.isDistinct = false; // 재생성
                params.isPublic = false; // 프라이빗한 공간 생성
                params.isSuper = false; //  슈퍼 그룹방 X
                params.addUserIds([user.mt_uid as string, '7LorEVehbz']); // 560  수정필요
                params.name = channelName; // 수정필요

                const channel = await sb.GroupChannel.createChannel(params, (openChannel, error) => {
                    console.log('openChannel :::', openChannel, error);
                });
                setChannel(channel);
            }
        })();

        return () => {
            sb.disconnect();
        };
    }, []);
    useEffect(() => {
        if (Channel) {
            setQuery(Channel.createPreviousMessageListQuery());
        }
    }, [Channel]);

    useEffect(() => {
        if (query) getSendBirdMessage();
    }, [query]);
    useEffect(() => {
        scrollToEnd();
    }, [chatList]);

    useEffect(() => {
        // 키보드 높이 에 따라 화면 이동 되도록
        Keyboard.addListener('keyboardDidShow', e => {
            scrollPosition.current.keyboardHeight = e.endCoordinates.height;
            flatListRef.current?.scrollToOffset({
                offset: e.endCoordinates.height + scrollPosition.current.position,
                animated: false,
            });
        });
        Keyboard.addListener('keyboardDidHide', e => {
            console.log(scrollPosition.current.position - e.endCoordinates.height, e.endCoordinates);
            flatListRef.current?.scrollToOffset({
                offset: scrollPosition.current.position - scrollPosition.current.keyboardHeight,
                animated: false,
            });
        });
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
            }}>
            <View style={styles.mainView}>
                <ImageBackground style={styles.headerImageBackground} source={ChattingBgImage}>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <AutoHeightImage source={BackWhiteIcon} width={getPixel(30)} />
                        </TouchableOpacity>
                        <WhiteText bold fontSize={`${16 * fontSize}`} style={styles.marginLeft}></WhiteText>
                    </View>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={onPressShopIcon} hitSlop={getHitSlop(5)} style={styles.marginRight}>
                            <AutoHeightImage width={getPixel(18)} source={StoreWhiteIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity hitSlop={getHitSlop(5)} style={styles.marginRight}>
                            <AutoHeightImage width={getPixel(20)} source={SearchWhiteIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onIsSetting} hitSlop={getHitSlop(5)}>
                            <AutoHeightImage width={getPixel(20)} source={MoreWhiteIcon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View
                style={{
                    flex: 1,
                }}>
                <FlatList
                    ref={flatListRef}
                    data={chatList}
                    keyExtractor={(item, index) => index.toString()}
                    // onEndReached={() => {
                    //     getSendBirdMessage();
                    // }}
                    onScroll={e => {
                        scrollPosition.current.position = e.nativeEvent.contentOffset.y;
                    }}
                    renderItem={({item, index}) => {
                        let isMy = null;
                        if (item?.message && typeof item.message === 'string' && '_sender' in item) {
                            isMy = item._sender.userId === user.mt_uid;
                            return (
                                <>
                                    {isMy === false && <OtherChatting date="11:20" content={item.message} />}
                                    {isMy === true && <MyChatting date="11:20" isCheck={2} content={item.message} />}
                                </>
                            );
                        }

                        return (
                            <>
                                {index === 0 && <ChatDate />}
                                {index === 5 && (
                                    <LocationChatting
                                        date="11:20"
                                        isCheck={2}
                                        content="R. Guarani, 266 - Bom Retiro
                    São Paulo - SP, 01123-040"
                                        isMy={index % 2 === 1}
                                    />
                                )}
                                {index === 6 && (
                                    <LocationChatting
                                        date="11:20"
                                        isCheck={2}
                                        content="R. Guarani, 266 - Bom Retiro
                    São Paulo - SP, 01123-040"
                                        isMy={index % 2 === 1}
                                    />
                                )}
                                {index > 8 && <ProductChatting isMyProduct={index % 2 === 1} content={''} date={''} />}
                            </>
                        );
                    }}
                    initialNumToRender={20}
                    ListFooterComponent={<View style={{height: getHeightPixel(10)}}></View>}
                />
            </View>
            <View style={{height: getHeightPixel(50)}}></View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    backgroundColor: Theme.color.white,
                }}>
                <View style={styles.footerView}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsOn(prev => !prev);
                            Keyboard.dismiss();
                        }}>
                        <Image source={PlusMenuIcon} style={styles.footerPlusImage} resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={styles.footerInputView}>
                        <TextInput
                            // autoFocus={false}
                            // disableFullscreenUI={true}
                            // showSoftInputOnFocus={false}
                            onChangeText={setChatting}
                            style={{
                                ...styles.footerTextInput,
                                fontSize: fontSize * 16,
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={StartChat}>
                        <Image source={SendGrayIcon} style={styles.footerSendGray} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                {isOn && (
                    <View style={[styles.footerOnContainer]}>
                        <TouchableOpacity onPress={onPressAlbum} style={[styles.footerImageTouch, styles.footerMarginRight]}>
                            <Image source={GalleryPurpleIcon} style={styles.footerOnImage} />
                            <Text fontSize={`${14 * fontSize}`}>{t('album')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressCamera} style={[styles.footerImageTouch, styles.footerMarginRight]}>
                            <Image source={CameraSkyIcon} style={styles.footerOnImage} />
                            <Text fontSize={`${14 * fontSize}`}>{t('camera')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressLocation} style={styles.footerImageTouch}>
                            <Image source={LocationOrangeIcon} style={styles.footerOnImage} />
                            <Text fontSize={`${14 * fontSize}`}>{t('locationInformation')}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {isSetting && <ModalChattingSetting onClose={offIsSetting} />}
            {isAlbum && <ModalPhoto onClose={() => setIsAlbum(false)} returnFn={fileSend} />}
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        maxHeight: getHeightPixel(50),
        height: getHeightPixel(50),
    },
    footerSendGray: {
        width: getPixel(30),
        height: getPixel(30),
        marginLeft: getPixel(10),
    },
    footerTextInput: {
        width: getPixel(254),
        height: getHeightPixel(40),

        borderRadius: 10,
        backgroundColor: Theme.color.whiteGray_FA,
        borderColor: Theme.color.whiteGray_F2,
        borderWidth: 1,
        color: Theme.color.black,
        // color: Theme.color.black,
        // paddingBottom: getHeightPixel(5),
    },
    footerInputView: {
        height: '100%',
        justifyContent: 'center',
    },
    footerPlusImage: {
        width: getPixel(24),
        height: getPixel(24),
        marginRight: getPixel(10),
    },
    footerView: {
        paddingHorizontal: getPixel(16),
        height: getHeightPixel(55),
        flexDirection: 'row',
        paddingVertical: getHeightPixel(7.5),
        alignItems: 'center',
    },
    footerMarginRight: {
        marginRight: getPixel(55),
    },
    footerOnContainer: {
        width: getPixel(360),
        height: getHeightPixel(150),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    footerImageTouch: {
        width: getPixel(52),
        height: getHeightPixel(75),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerOnImage: {
        width: getPixel(50),
        height: getPixel(50),
    },
    marginRight: {
        marginRight: getPixel(15),
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: getPixel(15),
    },
    headerImageBackground: {
        width: getPixel(360),
        height: getHeightPixel(50),
        backgroundColor: Theme.color.blue_3D,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getPixel(16),
    },
});
