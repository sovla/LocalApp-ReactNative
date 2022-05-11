import {Image, ImageBackground, Keyboard, StyleSheet, TouchableOpacity, View, TextInput} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

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
import Date from '@/Components/Chatting/Date';
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

export default function ChattingDetail({navigation}: ChattingDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {
        global: {
            data: {token},
        },
        user,
    } = useAppSelector(state => state);
    const {value: isSetting, on: onIsSetting, off: offIsSetting} = useBoolean(false);
    const [isOn, setIsOn] = useState<boolean>(false);

    const [chatting, setChatting] = useState<string>('');

    const [Channel, setChannel] = useState<SendBird.OpenChannel | undefined>();
    const [UserList, setUserList] = useState([]);
    const [UserChannelList, setUserChannelList] = useState([]);
    const sb = new SendBird({appId: 'AA15B76B-F3DD-4FF8-9FCB-F53751AC169A'});
    const channelHandler = new sb.ChannelHandler();
    channelHandler.onMessageReceived = (targetChannel, message) => {
        console.log('onMessageReceived', targetChannel, message);
    };

    const name = 'Designplus';
    const viewRef = useRef<View>(null);
    const _onButtonPress = () => {};

    const onPressLocation = useCallback(() => {
        navigation.navigate('ChattingLocation');
    }, []);

    const onPressShopIcon = useCallback(() => {
        navigation.navigate('ProfileHome');
    }, []);

    async function StartChat() {
        console.log('채팅의 아이디를 확인 합니다--------------');
        console.log('채팅 유저의 아이디      :   ' + chatting);
        console.log('채팅하는 대상자의 아이디  :   ' + name);
        console.log('----------------------------------');
        //이미 방이 다시 방을 만들지 않으므로
        let UserIds = [];
        UserIds.push(name);
        UserIds.push(chatting);
        const params = new sb.UserMessageParams();

        params.message = chatting;

        if (Channel) {
            Channel.sendUserMessage(params);
        }
    }
    useEffect(() => {
        (async () => {
            sb.registerGCMPushTokenForCurrentUser(token);
            await sb.connect(user.mt_uid as string, (err, user) => {
                console.log(err);
            });
            const params = new sb.OpenChannelParams();
            const channel = await sb.OpenChannel.createChannel(params, (openChannel, error) => {
                console.log(openChannel, error);
            });
            setChannel(channel);
        })();
    }, []);
    useEffect(() => {
        if (Channel) {
            Channel.enter();
        }
    }, [Channel]);

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
                        <WhiteText bold fontSize={`${16 * fontSize}`} style={styles.marginLeft}>
                            {name}
                        </WhiteText>
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
            <View>
                <KeyboardAwareFlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 8]}
                    contentContainerStyle={{
                        paddingBottom: getHeightPixel(200),
                    }}
                    renderItem={({v, index}) => {
                        return (
                            <>
                                {index === 0 && <Date />}
                                {index === 1 && <OtherChatting date="11:20" content="Neque porro quisquam est." />}
                                {index === 2 && <MyChatting date="11:20" isCheck={2} content="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque." />}
                                {index === 3 && <OtherChatting date="11:30" content="Error sit?" />}
                                {index === 4 && <MyChatting date="11:20" isCheck={2} content="Error sit?" />}
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
                                {index === 7 && <MyChatting date="11:20" isCheck={2} content="Unde omnis iste natus.." />}
                                {index > 8 && <ProductChatting isMyProduct={index % 2 === 1} content={''} date={''} />}
                            </>
                        );
                    }}
                    initialNumToRender={10}
                />
            </View>
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
                        <TouchableOpacity style={[styles.footerImageTouch, styles.footerMarginRight]}>
                            <Image source={GalleryPurpleIcon} style={styles.footerOnImage} />
                            <Text fontSize={`${14 * fontSize}`}>{t('album')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.footerImageTouch, styles.footerMarginRight]}>
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
