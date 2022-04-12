import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import {AlarmContentProps} from '@/Types/Components/NoticeTypes';
import {CheckBox, CheckBoxImage} from '../Global/button';

const AlarmContent: React.FC<AlarmContentProps> = ({
  title,
  date,
  isDelete,
  onPress,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity onPress={onPress} style={[styles.contentTouch]}>
        {isDelete && (
          <View>
            <CheckBox isOn={false} isBox disabled />
          </View>
        )}
        <View style={styles.imageView}>
          <Image
            source={require('@assets/image/dummy.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textView}>
          <Text fontSize={`${14 * fontSize}`} style={styles.titleText}>
            {title}
          </Text>
          <GrayText fontSize={`${12 * fontSize}`}>{date}</GrayText>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AlarmContent;

const styles = StyleSheet.create({
  titleText: {marginBottom: getHeightPixel(8)},
  textView: {
    width: getPixel(265),
  },
  image: {
    width: getPixel(48),
    height: getPixel(48),
  },
  imageView: {
    width: getPixel(48),
    height: getPixel(48),
    borderRadius: getPixel(18),
    overflow: 'hidden',
    marginRight: getPixel(12),
  },
  contentTouch: {
    flexDirection: 'row',
  },
  conatiner: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    minHeight: getHeightPixel(90),
    paddingTop: getHeightPixel(14),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
});
