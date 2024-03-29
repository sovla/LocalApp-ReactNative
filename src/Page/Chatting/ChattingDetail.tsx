import {API} from '@/API/API';
import Theme from '@/assets/global/Theme';
import ModalPhoto from '@/Components/Business/ModalPhoto';
import ChatDate from '@/Components/Chatting/ChatDate';
import LocationChatting from '@/Components/Chatting/LocationChatting';
import ModalChattingSetting from '@/Components/Chatting/ModalChattingSetting';
import MyChatting from '@/Components/Chatting/MyChatting';
import OtherChatting from '@/Components/Chatting/OtherChatting';
import Loading from '@/Components/Global/Loading';
import {useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import useBoolean from '@/Hooks/useBoolean';
import {ChattingDetailListApi, ChattingRoomInformationApi, ChattingSendApi, dateChat, userChat} from '@/Types/API/ChattingTypes';
import {ChattingDetailProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {apiResult, getHitSlop} from '@/Util/Util';
import BackWhiteIcon from '@assets/image/back_white.png';
import CameraSkyIcon from '@assets/image/camera_sky.png';
import ChattingBgImage from '@assets/image/chatting_bg.png';
import GalleryPurpleIcon from '@assets/image/gallery_purple.png';
import LocationOrangeIcon from '@assets/image/location_orange.png';
import MoreWhiteIcon from '@assets/image/more_white.png';
import PlusMenuIcon from '@assets/image/plus_menu.png';
import SearchWhiteIcon from '@assets/image/search_white.png';
import StoreWhiteIcon from '@assets/image/store_white.png';
import {DarkBlueText, Text, WhiteText} from '@Components/Global/text';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {AxiosResponse} from 'axios';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ImageBackground, Keyboard, Platform, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import SendBird from 'sendbird';

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
    const _route = useRoute();

    const {value: isSetting, on: onIsSetting, off: offIsSetting} = useBoolean(false);
    const [isOn, setIsOn] = useState<boolean>(false);

    const [chatting, setChatting] = useState<string>('');
    const [Channel, setChannel] = useState<SendBird.GroupChannel | undefined>();
    const [query, setQuery] = useState<SendBird.PreviousMessageListQuery>();
    const [chat_idx, setChat_idx] = useState('');

    const [isAlbum, setIsAlbum] = useState(false);

    const [isFirst, setIsFirst] = useState(false); // 처음 푸터 아래로
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [isBlock, setIsBlock] = useState(false); // 차단 여부
    const [isScroll, setIsScroll] = useState(false);

    const [roomInfo, setRoomInfo] = useState<ChattingRoomInformationApi['T']>(null); // 룸 정보 불러오기

    const [loading, setLoading] = useState({
        messageSend: false,
        fileSend: false,
    });

    // 채팅 내용 불러오기 API
    const [chattingList, setChattingList] = useState<ChattingDetailListApi['T']>(null);
    const [chattingPage, setChattingPage] = useState(1);
    const [isChatLast, setIsChatLast] = useState(false);
    const [isChatListFirst, setIsChatListFirst] = useState(true);

    const [isSearch, setIsSearch] = useState(false);

    const [searchList, setSearchList] = useState<any[]>([]);
    const [searchCount, setSearchCount] = useState<number>(0);

    const flatListRef = useRef<FlatList>(null);
    const scrollPosition = useRef({
        position: 0,
        keyboardHeight: 0,
    });

    const {PostAPI: sendChatApi, isLoading: IsSendChat} = usePostSend<ChattingSendApi['D'], ChattingSendApi['T']>('chat_room_chatting_send.php', {
        mt_idx: user.mt_idx as string,
        chat_idx: roomInfo?.chat_idx as string,
        imageField: 'chat_file',
    });

    const {PostAPI: chattingRoomInApi} = usePostSend<ChattingRoomInformationApi['D'], ChattingRoomInformationApi['T']>('chat_room_info.php', {
        mt_idx: user.mt_idx as string,
        chat_idx: params?.chat_idx ?? chat_idx,
    }); // 수정필요

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
                mt_idx: user.mt_idx as string,
                chat_idx: roomInfo?.chat_idx as string,
                page: _page,
            });

            if (res.data?.result === 'true') {
                setIsChatListFirst(false);
                setChattingList(prev => getChattingListState(prev, res, setIsChatLast, page as number));
                if (_page === 1) {
                    setChattingPage(2);
                } else {
                    setChattingPage(prev => prev + 1);
                }
            } else {
            }
        },
        [user.mt_idx, roomInfo?.chat_idx, chattingPage, isChatLast],
    );
    const onPressLocation = useCallback(() => {
        setIsOn(false);
        navigation.navigate('ChattingLocation');
    }, []);
    const onPressSearch = useCallback(() => {
        setIsSearch(true);
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
        setChatting('');
        setLoading(prev => ({...prev, messageSend: true}));

        const params = new sb.UserMessageParams();

        if (type === 'text') {
            // 샌드버드 셋팅
            params.message = chatting;
            params.customType = 'text';
            // 채팅인경우
            // text 인경우
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
                setLoading(prev => ({...prev, messageSend: false}));

                // setChatList(prev => [...prev, message]);
            });
        }
    };

    const fileSend = async (images: {path: string; mime: string}[]) => {
        setIsAlbum(false);
        setIsOn(false);

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

            await sb.connect(my_uid, '6af5d40414448211109d06cac3ab71e6040f87ff', (err, user) => {});
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
            } else {
                throw 'not Find Room';
            }
        },
        [user],
    );

    const onSearchHandle = (text: string) => {
        const filterText = chattingList?.list.filter(v => {
            if (v.msg_idx && v.msg_type === 'text') {
                return v.content.includes(text);
            }
        });

        if (filterText?.length) {
            try {
                setSearchList(filterText);
                flatListRef.current?.scrollToItem({
                    animated: true,
                    item: filterText[0],
                    viewPosition: 1,
                });
                setSearchCount(0);
            } catch (error) {}
        }
    };

    const onPressSearchUp = () => {
        if (searchList.length > searchCount + 1) {
            try {
                flatListRef.current?.scrollToItem({
                    animated: true,
                    item: searchList[searchCount + 1],
                    viewPosition: 1,
                });
                setSearchCount(prev => prev + 1);
            } catch (error) {}
        }
    };
    const onPressSearchDown = () => {
        if (searchCount > 0) {
            try {
                flatListRef.current?.scrollToItem({
                    animated: true,
                    item: searchList[searchCount - 1],
                    viewPosition: 1,
                });
                setSearchCount(prev => prev - 1);
            } catch (error) {}
        }
    };

    const _renderItem = useCallback(
        ({item}) => {
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
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                marginVertical: getHeightPixel(20),
                                marginHorizontal: getPixel(16),
                            }}>
                            {isMy && (
                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: getPixel(10)}}>
                                    <Image
                                        source={_item.msg_show === 'N' ? require('@assets/image/check.png') : require('@assets/image/check_double.png')}
                                        style={{
                                            width: getPixel(24),
                                            height: getPixel(24),
                                        }}
                                    />
                                    <Text color="#59636C" fontSize={`${10 * fontSize}`}>
                                        {_item.msg_date}
                                    </Text>
                                </View>
                            )}
                            <View style={{alignSelf: isMy ? 'flex-end' : 'flex-start', borderRadius: 12, overflow: 'hidden'}}>
                                <AutoHeightImage
                                    source={{
                                        uri: _item.img,
                                    }}
                                    width={getPixel(245)}
                                />
                            </View>
                        </View>
                    );
                }

                return (
                    <>
                        {isMy === false && <OtherChatting profileImage={_item.userProfile} date={_item.msg_date} content={_item.content} />}
                        {isMy === true && <MyChatting date={_item.msg_date} isCheck={_item.msg_show === 'Y' ? 2 : 1} content={_item.content} />}
                    </>
                );
            } else if (item.idx === '0' && item.userIdx === '0') {
                const _item = item as dateChat;

                return <ChatDate content={_item.content} />;
            } else {
                return null;
            }
        },
        [user],
    );

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
        if (isFocused && params && 'region' in params) {
            const {
                region: {latitude, longitude},
                location,
                locationDetail,
            } = params;

            messageSend('location', {latitude, location, locationDetail, longitude});
        }
    }, [params]);

    useLayoutEffect(() => {
        if (isFocused && params?.chat_idx != null) {
            setChat_idx(params.chat_idx); // params 으로 지역 정보 또는 chat_idx 가 들어옴
        }
        if (!isFocused) {
            offIsSetting();
        }
    }, [isFocused]);
    useLayoutEffect(() => {
        chattingRoomInApi() // (1) 채팅방 접속 정보 받아오기
            .then(apiResult)
            .then(res => {
                findRoom(res.data); // (2) 채팅방 접속 정보를 기반으로 샌드버드 채널 찾아오기
                setRoomInfo(res.data); // (2-2) 해당 데이터 룸 정보에 넣기
            });
        return () => {
            sb.disconnect();
        };
    }, []);
    useLayoutEffect(() => {
        if (roomInfo) {
            getChattingListApi(1); // (2-1) 채팅방 접속 정보를 기반으로 채팅리스트 받아오기
            setIsBlock(roomInfo.other_blind_check === 'Y'); // 상대방이 날 차단 한 경우 메세지 전송 안됌
        }
    }, [roomInfo]);
    useLayoutEffect(() => {
        setSearchList([]);
        setSearchCount(0);
    }, [isSearch]);

    const isChatDisable = !Channel || !roomInfo || roomInfo?.other_blind_check === 'Y';

    const ref = useRef<null | boolean>(null);

    const list = chattingList?.list;

    if (params?.chat_idx == null && roomInfo?.chat_idx == null && chat_idx === '' && !ref.current) {
        ref.current = true;
        console.log(params.chat_idx == null, 'back');
        navigation.goBack();
        return null;
    }

    if (!roomInfo) {
        return <Loading />;
    }
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
                    {!isSearch && (
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
                    )}
                    {isSearch && (
                        <View style={styles.rowCenter}>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    left: getPixel(7),
                                    top: getHeightPixel(5),
                                    zIndex: 100,
                                }}>
                                <AutoHeightImage width={getPixel(16)} source={require('@assets/image/search_black.png')} />
                            </TouchableOpacity>
                            <TextInput
                                style={{
                                    width: getPixel(294),
                                    minHeight: 31,
                                    height: getHeightPixel(31),
                                    backgroundColor: Theme.color.white,
                                    borderRadius: 30,
                                    paddingLeft: getPixel(25),
                                }}
                                onEndEditing={event => {
                                    onSearchHandle(event.nativeEvent.text);
                                }}
                            />
                            {searchList.length > 0 && (
                                <>
                                    <View
                                        style={{
                                            zIndex: 100,
                                            position: 'absolute',
                                            right: 25,
                                            top: 0,
                                            height: getHeightPixel(31),
                                            minHeight: 31,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Text fontSize={`${fontSize * 16}px`}>
                                            {searchCount + 1}/{searchList.length}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={onPressSearchUp}
                                            style={{
                                                marginRight: getPixel(5),
                                            }}>
                                            <Image
                                                style={{
                                                    width: getPixel(15),
                                                    height: getPixel(15),
                                                }}
                                                source={require('@assets/image/arrow_up_box.png')}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onPressSearchDown}>
                                            <Image
                                                style={{
                                                    width: getPixel(15),
                                                    height: getPixel(15),
                                                }}
                                                source={require('@assets/image/arrow_down_box.png')}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    )}
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
                        <DarkBlueText>{roomInfo.product_price}</DarkBlueText>
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
                    keyExtractor={(item, index) => index.toString()}
                    onScroll={e => {
                        scrollPosition.current.position = e.nativeEvent.contentOffset.y;
                    }}
                    renderItem={_renderItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    ListHeaderComponent={<View style={{height: getHeightPixel(isOn ? 170 : 20)}}></View>}
                    inverted
                    onEndReached={() => {
                        if (isScroll) {
                            console.log('onEndReached');
                            getChattingListApi();
                        }
                    }}
                    onEndReachedThreshold={1}
                    onScrollBeginDrag={() => {
                        setIsScroll(true);
                    }}
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
                            onFocus={() => setIsOn(false)}
                            value={chatting}
                        />
                    </View>
                    <TouchableOpacity disabled={isChatDisable} onPress={() => messageSend('text')}>
                        <Image source={isChatDisable ? require('@assets/image/send_gray.png') : require('@assets/image/send_color.png')} style={styles.footerSendGray} resizeMode="contain" />
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
                    initData={{
                        isAlarm: roomInfo.my_push_check === 'Y',
                        isBlock: roomInfo.my_blind_check === 'Y',
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
                    {
                        msg_idx: '임시',
                        content: params.message,
                        msg_show: 'N',
                        userIdx: user.mt_idx,
                        msg_type: 'text',
                        userProfile: '',
                        msg_date: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    },
                    ...prev.list,
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

function getChattingListState(prev: any, res: any, setIsChatLast: any, page: number) {
    if (prev?.list && res.data?.data?.data?.list && Array.isArray(prev?.list) && Array.isArray(res.data?.data?.data?.list)) {
        if (page === 1) {
            return res.data.data.data;
        } else {
            return {
                total: res.data.data.data.total,
                list: [...prev.list, ...res.data.data.data.list],
            };
        }
    } else if (Array.isArray(res.data?.data?.data?.list)) {
        return res.data.data.data;
    } else {
        setIsChatLast(true);
        return prev;
    }
}
