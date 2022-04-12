import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import NewIcon from '@assets/image/new.png';
import Header from '@/Components/LoginSignUp/Header';
import {NoticeProps} from '@/Types/Components/NoticeTypes';

export default function Notice() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [list, setList] = useState<Array<NoticeProps>>([
    {
      date: '2021. 7. 12',
      title: '매장 교환 방문 시간 안내',
      isNew: true,
    },
    {
      date: '2021. 7. 12',
      title: '매장 교환 방문 시간 안내',
      isNew: true,
    },
    {
      date: '2021. 7. 12',
      title: '매장 교환 방문 시간 안내',
      isNew: false,
    },
    {
      date: '2021. 7. 12',
      title: '매장 교환 방문 시간 안내',
    },
  ]);
  return (
    <View>
      <Header title={t('noticeTitle')} />
      <FlatList
        data={list}
        renderItem={({item, index}) => {
          return (
            <View style={styles.noticeView}>
              <TouchableOpacity>
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
        }}
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
