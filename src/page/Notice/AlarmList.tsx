import {FlatList, Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useAppNavigation, useAppSelector, useCallbackNavigation} from '@/Hooks/CustomHook';
import {setDefaults, useTranslation} from 'react-i18next';
import useBoolean from '@/Hooks/useBoolean';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/Profile/Header';
import EditBlackIcon from '@assets/image/edit_black.png';
import TrashBlackIcon from '@assets/image/trash_black.png';
import Menu from '@/Components/Profile/Menu';
import Product from '@/Components/Home/Product';
import AlarmContent from '@/Components/Notice/AlarmContent';
import {AlarmListProps} from '@/Types/Screen/Screen';
import {useIsFocused} from '@react-navigation/native';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {AlarmListApi, AlarmType, KeywordAlarmListApi} from '@/Types/API/NoticeTypes';
import {apiResult, brPrice, productTimeSetting, viewCountCheck} from '@/Util/Util';
import AlertModal from '@/Components/Home/AlertModal';
import {ModalAlertView, ModalAlertViewNoneTitle} from '@/Components/Chatting/ModalChattingSetting';
import {API} from '@/API/API';

export default function AlarmList({route: {params}}: AlarmListProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const navigation = useAppNavigation();
    const isFocused = useIsFocused();

    const [selectMenu, setSelectMenu] = useState<any>('keywordAlarm');
    const [isDelete, setIsDelete] = useState(false);
    const [deleteList, setDeleteList] = useState<string[]>([]);
    const [isAlert, setIsAlert] = useState(false);

    const {data: keywordList} = useApi<KeywordAlarmListApi['T'], KeywordAlarmListApi['D']>(null, 'keyword_alarm_list.php', {
        mt_idx: '15' as string,
    });
    const {data: alarmList, setData: setAlarmList} = useApi<AlarmListApi['T'], AlarmListApi['D']>(null, 'member_alarm_list.php', {
        mt_idx: '15' as string,
    });

    const {PostAPI: alarmDeleteApi} = usePostSend('alarm_list_del.php', {
        mt_idx: user.mt_idx as string,
        al_idx: deleteList.join(','),
    });

    const onPressDelete = useCallback(() => {
        if (isDelete) {
            setIsAlert(true);
        }
        setIsDelete(true);
    }, [isDelete]);
    const onPressAlarm = useCallback((al_idx: string) => {
        navigation.navigate('AlarmDetail', {al_idx});
    }, []);
    const onPressConfirm = useCallback(async () => {
        setIsAlert(false);
        setIsDelete(false);
        await alarmDeleteApi()
            .then(apiResult)
            .then(res => {
                setAlarmList(prev => {
                    if (prev) {
                        return {
                            list: prev?.list.filter(v => {
                                if (deleteList.find(fv => fv === v.al_idx)) {
                                    return null;
                                } else {
                                    return v;
                                }
                            }),
                            total_page: prev?.total_page,
                            tptal_count: prev?.tptal_count,
                        };
                    } else {
                        return null;
                    }
                });
                setDeleteList([]);
            });
    }, [user.mt_idx, deleteList]);
    const onPressDeleteItem = useCallback(
        (idx: string) => {
            const result = deleteList.find(v => v === idx);
            if (result) {
                setDeleteList(prev => prev.filter(filterValue => filterValue !== idx));
            } else {
                setDeleteList(prev => [...prev, idx]);
            }
        },
        [deleteList.length],
    );
    const onPressCancle = useCallback(() => {
        setIsAlert(false);
        setDeleteList([]);
        setIsDelete(false);
    }, []);

    useEffect(() => {
        if (params?.menu) setSelectMenu(t(params.menu));
    }, [isFocused]);

    const list = selectMenu === 'keywordAlarm' ? keywordList?.list : alarmList?.list;
    return (
        <View style={{flex: 1}}>
            <Header isBlack title={t('AlarmListTitle')} isBack>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    {selectMenu === t('keywordAlarm') && (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('KeywordAlarm');
                            }}
                            style={{marginRight: getPixel(20)}}>
                            <AutoHeightImage source={EditBlackIcon} width={getPixel(18)} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={onPressDelete}>
                        <AutoHeightImage source={TrashBlackIcon} width={getPixel(18)} />
                    </TouchableOpacity>
                </View>
            </Header>
            <Menu menuList={['keywordAlarm', 'alarm']} selectMenu={selectMenu} setSelectMenu={setSelectMenu} />

            <FlatList
                data={list as any}
                renderItem={({item, index}) => {
                    if (selectMenu === 'keywordAlarm') {
                        let status = '';
                        let likeCount = undefined;
                        let cate = '0';
                        if ('fin_status' in item) {
                            status = item.fin_status === 'Y' ? '판매완료' : item.fin_status === 'R' ? '예약중' : ''; // 수정필요 t("") 로 번역 되게끔

                            likeCount = viewCountCheck(item?.like_count);
                            cate = item?.pt_cate ?? '0';
                        }
                        return (
                            <Product
                                isList
                                // isLike={item.my_like === 'Y'}
                                image={
                                    item?.pt_file
                                        ? {
                                              uri: item.pt_file,
                                          }
                                        : require('@assets/image/none_image_m.png')
                                }
                                status={status}
                                viewCount={viewCountCheck(item?.view_count ?? 0)}
                                likeCount={likeCount}
                                price={brPrice(item?.pt_price ?? '0')}
                                time={` .  ${productTimeSetting(item?.pt_time ?? 0, item?.pt_time_type ?? 'now')}`}
                                location={`${item?.pt_location} ${item?.pt_location_detail}  .  ${item.dist?.toFixed(0)}${t('withinDistance')}`}
                                title={item?.pt_title ?? ''}
                                idx={item?.pt_idx ?? '0'}
                                cate={cate}
                            />
                        );
                    } else {
                        const _item = item as AlarmType;
                        if (_item.al_view === 'N') {
                            return null;
                        }
                        return (
                            <AlarmContent
                                title={_item.al_title}
                                date={productTimeSetting(_item.al_time, _item.al_time_type)}
                                isDelete={isDelete}
                                onPress={_item.al_type === 'info' ? () => onPressAlarm(_item.al_idx) : undefined}
                                onPressDelete={() => {
                                    onPressDeleteItem(_item.al_idx);
                                }}
                                isOn={deleteList.find(v => v === _item.al_idx) ? true : false}
                            />
                        );
                    }
                }}
            />
            {isAlert && (
                <Modal transparent>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#0007',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ModalAlertViewNoneTitle content={'선택한 항목을 삭제 하시겠습니까?'} onPressConfirm={onPressConfirm} onClose={() => setIsAlert(false)} onPressCancle={onPressCancle} />
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    editTouch: {
        position: 'absolute',
        bottom: getHeightPixel(25),
        right: getPixel(16),
        zIndex: 100,
    },
    editImage: {width: getPixel(70), height: getPixel(70)},
});
