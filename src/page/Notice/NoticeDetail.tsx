import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';
import Line from '@/Components/Global/Line';

import Header from '@/Components/Profile/Header';
import TrashBlackIcon from '@assets/image/trash_black.png';
import {NoticeDetailProps} from '@/Types/Screen/Screen';
import {NoticeDetailApi} from '@/Types/Components/NoticeTypes';
import useApi from '@/Hooks/useApi';
import RenderHTML from 'react-native-render-html';
import Loading from '@/Components/Global/Loading';

export default function NoticeDetail({route: {params}}: NoticeDetailProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);

  const {data, isLoading, isError, errorMessage} = useApi<
    NoticeDetailApi['T'],
    NoticeDetailApi['D']
  >(null, 'notice_info.php', {
    mt_idx: user?.mt_idx ?? '',
    nt_idx: params.nt_idx,
  });

  const date = data?.nt_wdate;
  const title = data?.nt_title;

  const content = `${data?.nt_content}`;
  if (isLoading || !data) {
    return <Loading />;
  }
  return (
    <View style={{flex: 1}}>
      <Header isBlack title={t('noticeListTitle')} isBack />
      <View style={styles.contentView}>
        <GrayText fontSize={`${12 * fontSize}`}>{date}</GrayText>
        <Text fontSize={`${22 * fontSize}`}>{title}</Text>
        <Line style={styles.line} isGray />
        <RenderHTML
          contentWidth={0}
          source={{
            html: content,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  contentView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    paddingTop: getHeightPixel(35),
  },
  line: {
    marginTop: getHeightPixel(15),
    marginBottom: getHeightPixel(30),
  },
});
