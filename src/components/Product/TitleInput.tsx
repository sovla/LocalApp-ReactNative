import {TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';

import Line from '@/Components/Global/Line';

import ArrowUpDownGrayIcon from '@assets/image/arrow_updown_gray.png';

const TitleInput: React.FC<{
  title?: string;
  placeHolder?: string;
  isSelect?: boolean;
  width?: number;
  onPress?: () => void;
  unitText?: string;
}> = ({
  isSelect,
  title,
  onPress,
  unitText,
  placeHolder,
  width = getPixel(328),
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={{marginBottom: getHeightPixel(25)}}>
      <Text fontSize={`${12 * fontSize}`} medium>
        {title}
      </Text>
      <TouchableOpacity
        disabled={!isSelect}
        style={{
          width: width,
          height: getHeightPixel(35),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <GrayText fontSize={`${16 * fontSize}`}>{placeHolder}</GrayText>
        {isSelect && (
          <AutoHeightImage source={ArrowUpDownGrayIcon} width={getPixel(8)} />
        )}
        {unitText && unitText.length > 0 && (
          <Text fontSize={`${16 * fontSize}`}>{unitText}</Text>
        )}
      </TouchableOpacity>
      <Line isGray width={width} />
    </View>
  );
};

export default TitleInput;
