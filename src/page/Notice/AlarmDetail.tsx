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
export default function AlarmDetail() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const date = '2021. 7. 12 5시간 전';
  const title = 'LocalApp에 판매글 올리기 팁';

  const content = `1. 판매글을 올릴때 내가 팔려는 물건이 이미 거래된 시세가 있는지 미리 검색해본다.

2. 자잘한 상품은 지역을 좁게 설정한다

3. 직거래를 기본으로 하고 내가 시간이 자유롭지 않은 경우 미리 가능한 시간을 써둔다.

4. 판매시 판매자가 원하는 곳에서 보통 거래한다.

5. 구매시 판매자가 원하는 곳에서 보통 거래한다.
  `;

  return (
    <View style={{flex: 1}}>
      <Header isBlack title={t('AlarmListTitle')} isBack>
        <View style={styles.row}>
          <TouchableOpacity>
            <AutoHeightImage source={TrashBlackIcon} width={getPixel(18)} />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={styles.contentView}>
        <GrayText fontSize={`${12 * fontSize}`}>{date}</GrayText>
        <Text fontSize={`${22 * fontSize}`}>{title}</Text>
        <Line style={styles.line} isGray />
        <Text fontSize={`${14 * fontSize}`}>{content}</Text>
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
