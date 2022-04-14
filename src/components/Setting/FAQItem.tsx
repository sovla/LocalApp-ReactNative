import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import Line from '@/Components/Global/Line';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';

const FAQItem: React.FC<FAQItemProps> = ({
  title,
  isSelect,
  answer,
  setSelect,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <Fragment>
      <TouchableOpacity onPress={setSelect} style={styles.container}>
        <View style={styles.rowCenter}>
          <Image source={QuetionIcon} style={styles.questionImage} />
          <Text fontSize={`${16 * fontSize}`}>{title}</Text>
        </View>
        <AutoHeightImage
          source={!isSelect ? ArrowDownGrayIcon : ArrowUpGrayIcon}
          width={getPixel(8)}
        />
      </TouchableOpacity>
      {isSelect && (
        <View style={styles.answerView}>
          <Image source={AnswerIcon} style={styles.questionImage} />
          <Text
            style={styles.answerText}
            color={Theme.color.darkGray_78}
            fontSize={`${14 * fontSize}`}>
            {answer}
          </Text>
        </View>
      )}
      <Line isGray width={getPixel(328)} style={styles.line} />
    </Fragment>
  );
};

export default React.memo(FAQItem);

const styles = StyleSheet.create({
  answerView: {
    minHeight: getHeightPixel(50),
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    flexDirection: 'row',
    marginTop: getHeightPixel(5),
    marginBottom: getHeightPixel(15),
  },
  answerText: {width: getPixel(280)},
  questionImage: {
    width: getPixel(24),
    height: getPixel(24),
    marginRight: getPixel(10),
    marginTop: getHeightPixel(3),
  },
  line: {
    marginLeft: getPixel(16),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
