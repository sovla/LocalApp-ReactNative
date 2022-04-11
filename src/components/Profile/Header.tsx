import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {CloseIconImage} from '../Global/image';
import {WhiteText} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHitSlop} from '@/Util/Util';
import BackWhiteIcon from '@assets/image/back_white.png';

const Header: React.FC<{
  title: string;
  isBack?: boolean;
}> = ({title, isBack, children}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => {}} hitSlop={getHitSlop(5)}>
          {isBack ? (
            <Image
              source={BackWhiteIcon}
              style={{
                width: getPixel(30),
                height: getPixel(30),
              }}
            />
          ) : (
            <CloseIconImage
              isWhite
              width={getPixel(20)}
              height={getPixel(20)}
            />
          )}
        </TouchableOpacity>
        <WhiteText
          style={{marginLeft: getPixel(16.5)}}
          medium
          fontSize={`${20 * fontSize}`}>
          {title}
        </WhiteText>
      </View>
      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: getPixel(360),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getPixel(16),
  },
});
