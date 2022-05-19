import {Image, ImageBackground, Keyboard, StyleSheet, TouchableOpacity, View, TextInput, Platform, FlatList, KeyboardAvoidingView, Dimensions} from 'react-native';
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
import {apiResult, brPrice, getHitSlop} from '@/Util/Util';
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
import {useIsFocused, useRoute} from '@react-navigation/native';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {ChattingDetailListApi, ChattingRoomInformationApi, ChattingSendApi, dateChat, userChat} from '@/Types/API/ChattingTypes';
import {Axios, AxiosResponse} from 'axios';
import {API} from '@/API/API';
import RNFetchBlob from 'rn-fetch-blob';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {CALLBACK_TYPE} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

export default function ChattingDetail({navigation, route: {params}}: ChattingDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {
        global: {
            data: {token, sb},
        },
    } = useAppSelector(state => state);
    const user = {
        mt_idx: Dimensions.get('window').height > 750 ? '20' : '21',
        mt_uid: 'j1UxzrfptW',
    };

    const isFocused = useIsFocused();
    const _route = useRoute();

    const {value: isSetting, on: onIsSetting, off: offIsSetting} = useBoolean(false);
    const [isOn, setIsOn] = useState<boolean>(false);

    const [chatting, setChatting] = useState<string>('');
    const [Channel, setChannel] = useState<SendBird.GroupChannel | undefined>();
    const [chatList, setChatList] = useState<(SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage)[]>([]);
    const [query, setQuery] = useState<SendBird.PreviousMessageListQuery>();

    const [isAlbum, setIsAlbum] = useState(false);

    const [isFirst, setIsFirst] = useState(false); // 처음 푸터 아래로
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [isBlock, setIsBlock] = useState(true); // 차단 여부

    const [roomInfo, setRoomInfo] = useState<ChattingRoomInformationApi['T']>(null); // 룸 정보 불러오기

    const [loading, setLoading] = useState({
        messageSend: false,
        fileSend: false,
    });

    // 채팅 내용 불러오기 API
    const [chattingList, setChattingList] = useState<ChattingDetailListApi['T']>(null);
    const [chattingPage, setChattingPage] = useState(1);
    const [isChatLast, setIsChatLast] = useState(false);

    const flatListRef = useRef<FlatList>(null);
    const scrollPosition = useRef({
        position: 0,
        keyboardHeight: 0,
    });

    const {PostAPI: sendChatApi, isLoading: IsSendChat} = usePostSend<ChattingSendApi['D'], ChattingSendApi['T']>('chat_room_chatting_send.php', {
        mt_idx: user.mt_idx,
        chat_idx: roomInfo?.chat_idx as string,
        imageField: 'chat_file',
    });

    const {PostAPI: chattingRoomInApi} = usePostSend<ChattingRoomInformationApi['D'], ChattingRoomInformationApi['T']>('chat_room_info.php', {mt_idx: user.mt_idx, chat_idx: '6'}); // 수정필요

    const channelHandler = new sb.ChannelHandler();
    channelHandler.onMessageReceived = async (targetChannel, message) => {
        getChattingListApi(1);
    };

    sb.addChannelHandler('chat', channelHandler);

    // const getSendBirdMessage = async () => {
    //     if (Channel) {
    //         if (query?.hasMore) {
    //             const messages = await query.load(100, false);
    //             console.log('getMessages ::: ', messages);
    //             setChatList(messages);
    //         }
    //     }
    // };
    const getChattingListApi = useCallback(
        async (page?: undefined | number) => {
            const _page = page ? page : chattingPage;
            if (isChatLast && !page) {
                return null;
            }
            setIsChatLast(false);
            const res = await API.post<
                ChattingDetailListApi['T'],
                AxiosResponse<{
                    result: 'true' | 'false';
                    data: {
                        data: ChattingDetailListApi['T'];
                    };
                    msg: string;
                }>,
                ChattingDetailListApi['D']
            >('chat_room_chatting_detail.php', {
                mt_idx: user.mt_idx,
                chat_idx: roomInfo?.chat_idx as string,
                page: _page,
            });

            if (res.data?.result === 'true') {
                setChattingList(prev => getChattingListState(prev, res, setIsChatLast));
                if (page === 1) {
                    setChattingPage(2);
                } else {
                    setChattingPage(prev => prev + 1);
                }
            } else {
            }
        },
        [user.mt_idx, roomInfo?.chat_idx, chattingPage],
    );
    const onPressLocation = useCallback(() => {
        navigation.navigate('ChattingLocation');
    }, []);
    const onPressSearch = useCallback(() => {
        navigation.navigate('Search');
    }, []);
    const onPressShopIcon = useCallback(() => {
        if (roomInfo)
            navigation.navigate('ProfileHome', {
                sell_idx: roomInfo.sell_idx, // 수정필요 고정값
            });
    }, [roomInfo]);

    const scrollToEnd = (animated: boolean | undefined = false) => {
        if (flatListRef?.current)
            if (chattingList)
                flatListRef.current?.scrollToOffset({
                    offset: chattingList?.list?.length > 0 ? -500 * chattingList?.list?.length : -20000,
                    animated,
                });
    };

    const messageSend = async (
        type?: 'location' | 'text' | undefined,
        message?:
            | string
            | {
                  latitude: number;
                  longitude: number;
                  location: string;
                  locationDetail: string;
              }
            | undefined,
    ) => {
        if ((chatting.length === 0 && type === 'text') || IsSendChat || loading.messageSend) {
            return;
        }
        setLoading(prev => ({...prev, messageSend: true}));

        const params = new sb.UserMessageParams();

        if (type === 'text') {
            // 샌드버드 셋팅
            params.message = chatting;
            params.customType = 'text';
            // 채팅인경우
            setChatting(''); // text 인경우
            setChattingList(dummyMessageAdd(params, user));

            await sendChatApi({
                chat_type: 'text',
                content: params.message,
            })
                .then(apiResult)
                .then(res => {
                    setChattingList(dummyMessageChange(res));
                    getChattingListApi(1);
                })
                .catch(err => {
                    if (err == '거래완료된 채팅방입니다') {
                        // 거래 완료된경우
                    }
                });
        } else if (type === 'location' && message && typeof message !== 'string') {
            // 샌드버드 셋팅
            params.data = JSON.stringify(message);
            params.message = message.locationDetail;
            params.customType = type;

            // 지역인경우

            await sendChatApi({
                chat_type: 'location',
                lat: message.latitude,
                lng: message.longitude,
                location_detail: message.locationDetail,
            })
                .then(apiResult)
                .then(res => {
                    getChattingListApi(1);
                })
                .catch(err => {
                    if (err == '거래완료된 채팅방입니다') {
                        // 거래 완료된경우
                    }
                });
        }

        if (Channel) {
            Channel.sendUserMessage(params, (error, message) => {
                // setChatList(prev => [...prev, message]);

                console.log('보낸 메시지', message);
                if (error) {
                    console.log('보낸 메시지 에러', error);
                }
                scrollToEnd(false);
                // setChatList(prev => [...prev, message]);
            });
        }
        setLoading(prev => ({...prev, messageSend: false}));
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
        await sendChatApi({
            chat_type: 'file',
            chat_file: {
                path: cropImage.path,
                mime: cropImage.mime,
            },
        })
            .then(apiResult)
            .then(res => {
                getChattingListApi(1);
            })
            .catch(err => {
                if (err == '거래완료된 채팅방입니다') {
                    // 거래 완료된경우
                }
            });

        Channel?.sendFileMessage(params, (error, message) => {
            if (error) {
                console.log('Error Send File', error);
            }
            console.log('message File Send', message);
            // setChatList(prev => [...prev, message]);
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

    const findRoom = useCallback(
        async (data: ChattingRoomInformationApi['T']) => {
            if (!data) {
                throw 'not Data';
            }
            const {my_uid, sendbird_chat_url} = data;
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

            await sb.connect(my_uid, 'c9b9d16dac03ca5a4c85df8a5599fca785d35091', (err, user) => {});
            const listQuery = sb.GroupChannel.createMyGroupChannelListQuery(); // 그룹 채널 찾기
            let find = false; // 그룹 채널 있을경우 true
            listQuery.includeEmpty = true; // 빈곳도 찾기
            listQuery.channelUrlsFilter = [sendbird_chat_url];

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
                            if (channel.url === sendbird_chat_url) {
                                setChannel(channel); //  (3) 채팅방 정보 기반으로 채널 찾은뒤 state에 넣어주기
                                find = true;
                            }
                        });
                });
            }
            if (find) {
                setRoomInfo(data);
            } else {
                throw 'not Find Room';
            }
        },
        [user],
    );

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
    useEffect(() => {
        if (Channel) {
            setQuery(Channel.createPreviousMessageListQuery()); // (4) 해당 채널에서 query 적용 해주기
        }
    }, [Channel]);

    useEffect(() => {
        if (query) {
            console.log(query, 'query 셋팅완료'); // (5) 쿼리 셋팅 완료
        }
    }, [query]);
    useEffect(() => {
        if (!isFirst) {
            scrollToEnd();

            setIsOn(false);
        }
    }, [chatList]);

    // useEffect(() => {
    //     // 키보드 높이 에 따라 화면 이동 되도록
    //     // Keyboard.addListener('keyboardDidShow', e => {
    //     //     scrollPosition.current.keyboardHeight = e.endCoordinates.height;
    //     //     flatListRef.current?.scrollToOffset({
    //     //         offset: scrollPosition.current.position,
    //     //         animated: false,
    //     //     });
    //     // });
    //     // Keyboard.addListener('keyboardDidHide', e => {
    //     //     flatListRef.current?.scrollToOffset({
    //     //         offset: scrollPosition.current.position,
    //     //         animated: false,
    //     //     });
    //     // });
    //     return () => {
    //         Keyboard.removeAllListeners('keyboardDidShow');
    //         Keyboard.removeAllListeners('keyboardDidHide');
    //     };
    // }, []);
    useLayoutEffect(() => {
        if (isFocused && params?.region) {
            const {
                region: {latitude, longitude},
                location,
                locationDetail,
            } = params;

            messageSend('location', {latitude, location, locationDetail, longitude});
        }
    }, [params?.region]);

    useLayoutEffect(() => {
        if (!isFocused) {
            offIsSetting();
        }
    }, [isFocused]);
    useLayoutEffect(() => {
        chattingRoomInApi() // (1) 채팅방 접속 정보 받아오기
            .then(apiResult)
            .then(res => {
                findRoom(res.data); // (2) 채팅방 접속 정보를 기반으로 샌드버드 채널 찾아오기
            });
        return () => {
            sb.disconnect();
        };
    }, []);
    useLayoutEffect(() => {
        if (roomInfo) {
            getChattingListApi(1); // (2-1) 채팅방 접속 정보를 기반으로 채팅리스트 받아오기
        }
    }, [roomInfo]);

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
                        <TouchableOpacity onPress={onPressSearch} hitSlop={getHitSlop(5)} style={styles.marginRight}>
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
                        <Image source={roomInfo ? {uri: roomInfo.product_file} : require('@assets/image/dummy.png')} style={styles.productHeaderImage} />
                    </View>
                    <View>
                        <Text bold style={{width: getPixel(250)}} medium numberOfLines={2}>
                            {roomInfo?.product_name}
                        </Text>
                        <DarkBlueText>{brPrice('120', {isPadding: true})}</DarkBlueText>
                        {/* 고정값 수정필요 */}
                    </View>
                </View>
            </View>
            <View style={styles.productHeaderRelative} />
            {/* 차단 당할경우  */}
            {isBlock && (
                <TouchableOpacity style={styles.blockView} onPress={() => setIsBlock(false)}>
                    <WhiteText
                        style={{
                            width: getPixel(328),
                        }}
                        fontSize={`${14 * fontSize}`}>
                        대화 상대에게 수신이 거부되어 메시지를 보낼수 없습니다.
                    </WhiteText>
                </TouchableOpacity>
            )}
            <View
                style={{
                    flex: 1,
                }}>
                <FlatList
                    ref={flatListRef}
                    data={chattingList?.list}
                    keyExtractor={(item, index) => item?.msg_idx ?? index.toString()}
                    // onEndReached={() => {
                    //     getSendBirdMessage();
                    // }}
                    onScroll={e => {
                        scrollPosition.current.position = e.nativeEvent.contentOffset.y;
                    }}
                    renderItem={({item, index}) => {
                        if (item?.msg_type) {
                            // 유저타입 분별용
                            const _item = item as userChat;
                            const isMy = _item.userIdx === user.mt_idx;
                            if (_item.msg_type === 'location') {
                                return (
                                    <LocationChatting
                                        profileImage={_item.userProfile}
                                        region={{
                                            latitude: _item.lat,
                                            longitude: _item.lng,
                                        }}
                                        date={_item.msg_date}
                                        content={_item.location}
                                        isMy={isMy}
                                        isCheck={_item.msg_show === 'Y' ? 2 : 1}
                                    />
                                );
                            } else if (_item.msg_type === 'file') {
                                return (
                                    <View style={{alignSelf: isMy ? 'flex-end' : 'flex-start', marginVertical: getHeightPixel(20)}}>
                                        <Image
                                            source={{
                                                uri: _item.img,
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

                            return (
                                <>
                                    {isMy === false && <OtherChatting profileImage={_item.userProfile} date={_item.msg_date} content={_item.content} />}
                                    {isMy === true && <MyChatting date={_item.msg_date} isCheck={_item.msg_show === 'Y' ? 2 : 1} content={_item.content} />}
                                </>
                            );
                        } else {
                            const _item = item as dateChat;
                            return <ChatDate content={_item.content} />;
                        }
                    }}
                    initialNumToRender={15}
                    maxToRenderPerBatch={10}
                    windowSize={21}
                    ListHeaderComponent={<View style={{height: getHeightPixel(isOn ? 170 : 20)}}></View>}
                    inverted // 뒤집기
                    onEndReached={() => {
                        getChattingListApi();
                    }}
                    onEndReachedThreshold={1}
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
                    <TouchableOpacity onPress={() => messageSend('text')}>
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
            {isSetting && (
                <ModalChattingSetting
                    onClose={offIsSetting}
                    chatInfo={{
                        chat_idx: roomInfo?.chat_idx ?? '',
                        pt_idx: roomInfo?.pt_idx ?? '',
                    }}
                />
            )}
            {isAlbum && <ModalPhoto onClose={() => setIsAlbum(false)} returnFn={fileSend} />}
        </View>
    );
}

const styles = StyleSheet.create({
    blockView: {
        width: getPixel(360),
        height: getHeightPixel(75),
        position: 'absolute',
        top: getHeightPixel(145),
        left: 0,
        backgroundColor: '#000',
        zIndex: 100,
        paddingTop: getHeightPixel(18),
        paddingLeft: getPixel(16),
    },
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
        paddingVertical: getHeightPixel(5),
        minHeight: getHeightPixel(40),

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

function dummyMessageAdd(params: {message: any}, user: {mt_idx: any}) {
    return (prev: any) => {
        if (prev?.list) {
            return {
                list: [
                    ...prev.list,
                    {
                        msg_idx: '임시',
                        content: params.message,
                        msg_show: 'N',
                        userIdx: user.mt_idx,
                        msg_type: 'text',
                        userProfile: '',
                        msg_date: '',
                    },
                ],
                total: prev.total,
            };
        } else {
            return {
                list: [
                    {
                        msg_idx: '임시',
                        content: params.message,
                        msg_show: 'N',
                        userIdx: user.mt_idx,
                        msg_type: 'text',
                        userProfile: '',
                        msg_date: '',
                    },
                ],
                total: 1,
            };
        }
    };
    // 기믹을 부려보자
}

function dummyMessageChange(res: {data: {msg_idx: any}}) {
    return (prev: any) => {
        if (prev) {
            const result = {
                list: prev.list.map((v: {msg_idx: string}) => {
                    if (v.msg_idx === '임시') {
                        return {
                            ...v,
                            msg_idx: `${res.data.msg_idx}`,
                        };
                    } else {
                        return v;
                    }
                }),
                total: prev.list.length,
            };

            return result;
        } else {
            return null;
        }
    };
}

function getChattingListState(prev: any, res: any, setIsChatLast: any) {
    const map = new Map();
    if (prev?.list && res.data?.data?.data?.list && Array.isArray(prev?.list) && Array.isArray(res.data?.data?.data?.list)) {
        let count = 0;
        console.log(new Date.now(), 'start');
        for (const v of res.data.data.data.list) {
            if (v?.msg_idx) {
                map.set(v.msg_idx, v);
                count = +v.msg_idx;
            } else {
                map.set(`${count + 0.5}`, v);
            }
        }
        count = 0;
        for (const v of prev.list) {
            if (v?.msg_idx && !map.has(v.msg_idx)) {
                map.set(v.msg_idx, v);
                count = +v.msg_idx;
            } else if (v.msg_idx == null) {
                map.set(`${count + 0.5}`, v);
            }
        }
        let resultArray = [];
        for (const [key, value] of map) {
            resultArray.push(
                value?.msg_idx
                    ? value
                    : {
                          ...value,
                          msg_idx: key,
                      },
            );
        }
        console.log(new Date.now(), 'end');
        resultArray.sort((a, b) => a?.msg_idx - b?.msg_idx);
        resultArray.reverse();
        return {
            total: map.size,
            list: resultArray,
        };
    } else if (Array.isArray(res.data?.data?.data?.list)) {
        return res.data.data.data;
    } else {
        setIsChatLast(true);
        return prev;
    }
}
