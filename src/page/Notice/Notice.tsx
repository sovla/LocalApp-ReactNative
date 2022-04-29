import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector, useCallbackNavigation} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import NewIcon from '@assets/image/new.png';
import Header from '@/Components/LoginSignUp/Header';
import {NoticeApi, NoticeProps} from '@/Types/Components/NoticeTypes';
import useApi from '@/Hooks/useApi';
import Loading from '@Components/Global/Loading';
import {dateFormat} from '@/Util/Util';
import {NoticeProps as ScreenNoticeProps} from '@/Types/Screen/Screen';

export default function Notice({navigation}: ScreenNoticeProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);

  const {data, isLoading, isError, errorMessage} = useApi<
    NoticeApi['T'],
    NoticeApi['D']
  >(null, 'notice_list.php', {
    mt_idx: user?.mt_idx ?? '',
  });

  const onPressNotice = useCallback(idx => {
    navigation.navigate('NoticeDetail', {nt_idx: idx});
  }, []);

  const _renderItem = useCallback(({item, index}) => {
    const onPress = () => onPressNotice(item.nt_idx);
    return (
      <View style={styles.noticeView}>
        <TouchableOpacity onPress={onPress}>
          <GrayText fontSize={`${12 * fontSize}`}>{item.date}</GrayText>
          <View style={styles.contentView}>
            <Text fontSize={`${16 * fontSize}`}>{item.title}</Text>
            {item?.isNew && (
              <AutoHeightImage
                source={NewIcon}
                width={getPixel(16)}
                style={{marginLeft: getPixel(6)}}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }, []);

  if (isLoading || data === null) {
    return <Loading />;
  }
  const list: NoticeProps[] | [] = Array.isArray(data)
    ? data.map(item => {
        return {
          date: dateFormat(item.nt_wdate),
          title: item.nt_title,
          isNew: item.new_check === 'Y',
          nt_idx: item.nt_idx,
        };
      })
    : [];

  return (
    <View style={{flex: 1}}>
      <Header title={t('noticeTitle')} />
      <FlatList
        contentContainerStyle={{flex: 0.9}}
        data={list}
        renderItem={_renderItem}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <GrayText medium fontSize={`${14 * fontSize}`}>
              공지사항이 없습니다
            </GrayText>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noticeView: {
    width: getPixel(328),
    height: getHeightPixel(70),
    marginHorizontal: getPixel(16),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
    justifyContent: 'center',
  },
  contentView: {flexDirection: 'row', alignItems: 'center'},
});
