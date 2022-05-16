import {Image, ImageBackground, Keyboard, StyleSheet, TouchableOpacity, View, TextInput, Platform, FlatList, KeyboardAvoidingView} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {DarkBlueText, Text, WhiteText} from '@Components/Global/text';
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
import {brPrice, getHitSlop} from '@/Util/Util';
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
import {useIsFocused} from '@react-navigation/native';

export default function ChattingDetail({navigation, route: {params}}: ChattingDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {
        global: {
            data: {token, sb},
        },
        user,
    } = useAppSelector(state => state);

    const isFocused = useIsFocused();

    const {value: isSetting, on: onIsSetting, off: offIsSetting} = useBoolean(false);
    const [isOn, setIsOn] = useState<boolean>(false);

    const [chatting, setChatting] = useState<string>('');
    const [Channel, setChannel] = useState<SendBird.GroupChannel | undefined>();
    const [chatList, setChatList] = useState<(SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage)[]>([]);
    const [query, setQuery] = useState<SendBird.PreviousMessageListQuery>();

    const [isAlbum, setIsAlbum] = useState(false);

    const [isFirst, setIsFirst] = useState(false); // 처음 푸터 아래로
    const [isFileLoading, setIsFileLoading] = useState(false);

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
                const messages = await query.load(100, false);
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

    const scrollToEnd = (animated: boolean | undefined = false) => {
        if (flatListRef?.current)
            if (animated) {
                flatListRef.current.scrollToEnd();
            } else {
                flatListRef.current?.scrollToOffset({
                    offset: chatList.length > 0 ? 500 * chatList.length : 20000,
                    animated,
                });
            }
    };

    const messageSend = async (
        type?: 'location' | undefined,
        message?:
            | string
            | {
                  latitude: number;
                  longitude: number;
              }
            | undefined,
    ) => {
        if (!chatting?.length && !type) {
            return;
        }
        const params = new sb.UserMessageParams();
        if (!type && !message) {
            setChatting(''); // text 인경우
            params.message = chatting;
            params.customType = 'text';
        } else if (type === 'location' && message && typeof message !== 'string') {
            params.data = JSON.stringify(message);
            params.message = 'location';
            params.customType = type;
        }

        if (Channel) {
            Channel.sendUserMessage(params, (error, message) => {
                setChatList(prev => [...prev, message]);

                console.log('보낸 메시지', message);
                if (error) {
                    console.log('보낸 메시지 에러', error);
                }
                scrollToEnd(true);
                // setChatList(prev => [...prev, message]);
            });
        }
    };

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
            compressImageQuality: 0.8,
            freeStyleCropEnabled: false,
        });
        params.file = {
            size: cropImage.size,
            uri: Platform.OS === 'android' ? cropImage.path : cropImage.path.replace('file://', ''),
            type: cropImage.mime,
            name: 'auto.jpg',
        };
        setIsFileLoading(true);

        await Channel?.sendFileMessage(params, (error, message) => {
            if (error) {
                console.log('Error Send File', error);
            }
            console.log('message File Send', message);
            setChatList(prev => [...prev, message]);
            setIsOn(false);
        });
        setIsFileLoading(false);
    };

    const onPressAlbum = useCallback(() => {
        setIsAlbum(true);
    }, []);
    const onPressCamera = useCallback(async () => {
        const image = await ImageCropPicker.openCamera({
            mediaType: 'photo',
        });
        fileSend([image]);
        setIsOn(false);
    }, []);

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

            await sb.connect(user.mt_uid as string, '9cc146a50f722a97c5984f7f65107092d7a07a14', (err, user) => {
                console.log('connect ::: ', err, user);
            });
            const listQuery = sb.GroupChannel.createMyGroupChannelListQuery(); // 그룹 채널 찾기
            let find = false; // 그룹 채널 있을경우 true
            listQuery.includeEmpty = true; // 빈곳도 찾기

            // listQuery.userIdsIncludeFilter = [user.mt_idx as string];
            listQuery.channelUrlsFilter = ['sendbird_group_channel_72907156_f98b58c9242c20470421909a8710c3cf2f69ec32'];
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
            // if (!find) {
            //     const params = new sb.GroupChannelParams();
            //     params.isDistinct = false; // 재생성
            //     params.isPublic = false; // 프라이빗한 공간 생성
            //     params.isSuper = false; //  슈퍼 그룹방 X
            //     params.addUserIds([user.mt_uid as string, '7LorEVehbz']); // 560  수정필요
            //     params.name = channelName; // 수정필요

            //     const channel = await sb.GroupChannel.createChannel(params, (openChannel, error) => {
            //         console.log('openChannel :::', openChannel, error);
            //     });
            //     setChannel(channel);
            // }
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
        if (!isFirst) {
            scrollToEnd();

            setIsOn(false);
        }
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

    useLayoutEffect(() => {
        if (isFocused && params?.region) {
            messageSend('location', params.region);
        }
        if (!isFocused) {
            offIsSetting();
        }
    }, [isFocused]);

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
            <View style={styles.productHeaderView}>
                <View style={styles.productHeaderRow}>
                    <View style={styles.productHeaderImageView}>
                        <Image source={require('@assets/image/dummy.png')} style={styles.productHeaderImage} />
                    </View>
                    <View>
                        <Text bold style={{width: getPixel(250)}} medium numberOfLines={2}>
                            Smart Insulation Cup Water Bottle Led Temperature Dis asfasdkfjsdkfjsldkjfsdaklfska
                        </Text>
                        <DarkBlueText>{brPrice('120', {isPadding: true})}</DarkBlueText>
                    </View>
                </View>
            </View>
            <View style={styles.productHeaderRelative} />
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
                        if (item.messageType === 'user' && item?.sender) {
                            // 유저타입 분별용

                            const _item = item as SendBird.UserMessage;
                            if (_item.customType === 'location' && _item?.data) {
                                return <LocationChatting region={_item.data} date={''} content={''} />;
                            }
                            if (_item == null || _item.sender == null || _item.message == null) {
                                return null; // 타입 가드
                            }
                            const isMy = _item.sender.userId === user.mt_uid;
                            return (
                                <>
                                    {isMy === false && <OtherChatting date="11:20" content={_item.message} />}
                                    {isMy === true && <MyChatting date="11:20" isCheck={2} content={_item.message} />}
                                </>
                            );
                        } else if (item.messageType === 'file' && item?.url) {
                            const _fileItem = item as SendBird.FileMessage;

                            const isMy = _fileItem?.sender?.userId === user?.mt_uid;
                            if (_fileItem) {
                                // 수정 필요 이미지 디자인
                                return (
                                    <View style={{alignSelf: isMy ? 'flex-end' : 'flex-start', marginVertical: getHeightPixel(20)}}>
                                        <Image
                                            source={{
                                                uri: _fileItem.url,
                                            }}
                                            resizeMode="contain"
                                            style={{
                                                width: getPixel(150),
                                                height: getPixel(150),
                                            }}
                                        />
                                    </View>
                                );
                            }
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
                    initialNumToRender={100}
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
                            value={chatting}
                        />
                    </View>
                    <TouchableOpacity onPress={() => messageSend()}>
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
    productHeaderRelative: {
        height: getHeightPixel(95),
    },
    productHeaderImage: {
        width: getPixel(62),
        height: getPixel(62),
    },
    productHeaderImageView: {
        width: getPixel(62),
        height: getPixel(62),
        marginRight: getPixel(16),
        borderRadius: 8,
        overflow: 'hidden',
    },
    productHeaderRow: {
        width: getPixel(328),
        height: getHeightPixel(95),
        flexDirection: 'row',
        marginHorizontal: getPixel(16),
        alignItems: 'center',
    },
    productHeaderView: {
        width: getPixel(360),
        height: getHeightPixel(95),
        backgroundColor: Theme.color.white,
        position: 'absolute',
        top: getHeightPixel(50),
        left: 0,
        zIndex: 100,
    },
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
