import {View, FlatList, Touchable, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/Chatting/Header';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import dummy from '@assets/image/dummy.png';
import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {ChattingProps} from '@/Types/Components/ChattingTypes';
import Chatting from '@/Components/Chatting/Chatting';
import Footer from '@/Components/Home/Footer';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Menu from '@/Components/Profile/Menu';
import {GrayText} from '@/Components/Global/text';
import useApi from '@/Hooks/useApi';
import {ChattingRoomListApi} from '@/Types/API/ChattingTypes';
import Loading from '@/Components/Global/Loading';

export default function ChattingHome() {
    const navigation = useAppNavigation();
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const [selectMenu, setSelectMenu] = useState<'chatMenu1' | 'chatMenu2'>('chatMenu1');

    const {data: tradingRoomData, isLoading: isLoadingRoomList} = useApi<ChattingRoomListApi['T'], ChattingRoomListApi['D']>(
        null,
        'chat_room_list.php',
        {
            mt_idx: user.mt_idx as string,
            type: 0,
        },
        {
            focusRetry: true,
        },
    );
    const {data: transactionCompletedRoomData, isLoading: isLoadingRoomList1} = useApi<ChattingRoomListApi['T'], ChattingRoomListApi['D']>(
        null,
        'chat_room_list.php',
        {
            mt_idx: user.mt_idx as string,
            type: 1,
        },
        {
            focusRetry: true,
        },
    );

    const list = selectMenu === 'chatMenu1' ? tradingRoomData?.list : transactionCompletedRoomData?.list;
    return (
        <View style={{flex: 1}}>
            <Header />
            <View style={{height: getHeightPixel(20)}} />
            <Menu menuList={['chatMenu1', 'chatMenu2']} selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
            {((isLoadingRoomList && !tradingRoomData) || (isLoadingRoomList1 && !transactionCompletedRoomData)) && <Loading isAbsolute backgroundColor="#0003" />}
            <FlatList
                data={list}
                renderItem={({item, index}) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ChattingDetail', {
                                        chat_idx: item.chat_idx,
                                    });
                                }}>
                                <Chatting
                                    userName={item.mt_name}
                                    isBuy={item.chat_sign === 'buy'}
                                    image={{
                                        uri: item.product_file,
                                    }}
                                    title={item.product_title}
                                    content={item.last_msg}
                                    date={item.chat_time}
                                    isBusiness={item.busi_check === 'Y'}
                                />
                            </TouchableOpacity>
                            <Line
                                backgroundColor={Theme.color.gray}
                                style={{
                                    marginTop: getHeightPixel(20),
                                }}
                            />
                        </>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.emptyView}>
                        <GrayText medium fontSize={`${14 * fontSize}`}>
                            {t('noneChatHistory')}
                        </GrayText>
                    </View>
                }
                style={{
                    marginTop: getHeightPixel(5),
                    marginHorizontal: getPixel(16),
                }}
                ListFooterComponent={
                    <View
                        style={{
                            height: getHeightPixel(100),
                        }}></View>
                }
                showsVerticalScrollIndicator={false}
            />
            <Footer menu="chat" />
        </View>
    );
}

const styles = StyleSheet.create({
    emptyView: {flex: 1, paddingTop: getHeightPixel(220), alignItems: 'center'},
});
