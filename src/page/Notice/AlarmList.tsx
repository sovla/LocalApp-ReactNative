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
import {AlarmListApi, AlarmType, KeywordAlarmListApi, KeywordAlarmType} from '@/Types/API/NoticeTypes';
import {apiResult, brPrice, productTimeSetting, viewCountCheck} from '@/Util/Util';
import AlertModal from '@/Components/Home/AlertModal';
import {ModalAlertView, ModalAlertViewNoneTitle} from '@/Components/Chatting/ModalChattingSetting';
import {API} from '@/API/API';
import {GrayText} from '@/Components/Global/text';
import AlarmProduct from './AlarmProduct';

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

    const {data: keywordList, setData: setKeywordList} = useApi<KeywordAlarmListApi['T'], KeywordAlarmListApi['D']>(null, 'keyword_alarm_list.php', {
        mt_idx: user.mt_idx as string,
    });
    const {data: alarmList, setData: setAlarmList} = useApi<AlarmListApi['T'], AlarmListApi['D']>(null, 'member_alarm_list.php', {
        mt_idx: user.mt_idx as string,
    });

    const {PostAPI: alarmDeleteApi} = usePostSend('alarm_list_del.php', {
        mt_idx: user.mt_idx as string,
        al_idx: deleteList.join(','),
    });
    const {PostAPI: keywordAlarmDeleteApi} = usePostSend('keyword_alarm_list_del.php', {
        mt_idx: user.mt_idx as string,
        keyword_idx: deleteList.join(','),
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
        if (selectMenu === 'keywordAlarm') {
            await keywordAlarmDeleteApi()
                .then(apiResult)
                .then(res => {
                    setKeywordList(prev => {
                        if (prev) {
                            return {
                                list: prev?.list.filter(v => {
                                    if (deleteList.find(fv => fv === v.pt_idx)) {
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
                });
            setDeleteList([]);
        } else {
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
        }
    }, [user.mt_idx, deleteList, selectMenu]);
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

    const onPressItem = useCallback((idx: string, cate: string) => {
        navigation.navigate('ProductDetail', {
            pt_cate: cate,
            pt_idx: idx,
        });
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
                        const _item = item as KeywordAlarmType;
                        return (
                            <AlarmProduct
                                isList
                                // isLike={item.my_like === 'Y'}
                                image={
                                    _item?.pt_file
                                        ? {
                                              uri: _item.pt_file,
                                          }
                                        : require('@assets/image/none_image_m.png')
                                }
                                status={_item.fin_status === 'Y' ? '판매완료' : _item.fin_status === 'R' ? '예약중' : ''}
                                viewCount={viewCountCheck(_item?.view_count)}
                                likeCount={viewCountCheck(_item?.like_count)}
                                price={brPrice(_item?.pt_price)}
                                time={` .  ${productTimeSetting(_item?.pt_time, _item?.pt_time_type ?? 'now')}`}
                                location={`${_item?.pt_location} ${_item?.pt_location_detail}  .  ${_item.dist?.toFixed(0)}${t('withinDistance')}`}
                                title={_item?.pt_title ?? ''}
                                idx={_item?.pt_idx}
                                cate={_item?.pt_cate}
                                isDelete={isDelete}
                                isDeleteOn={deleteList.find(v => v === _item.pt_idx) ? true : false}
                                onPress={isDelete ? () => onPressDeleteItem(_item.pt_idx) : onPressItem}
                            />
                        );
                    } else {
                        const _item = item as AlarmType;
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
                ListEmptyComponent={
                    <View
                        style={{
                            height: getHeightPixel(500),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <GrayText fontSize={`${14 * fontSize}`} medium>
                            {t(selectMenu === 'keywordAlarm' ? 'noneKeywordAlarm' : 'noneAlarm')}
                        </GrayText>
                    </View>
                }
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
