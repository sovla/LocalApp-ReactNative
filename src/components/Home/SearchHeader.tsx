import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import BackGroundImage from '@assets/image/BG.png';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import BackWhiteIcon from '@assets/image/back_white.png';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Theme from '@/assets/global/Theme';
import SearchBlackIcon from '@assets/image/search_black.png';
import CloseGrayIcon from '@assets/image/close_gray.png';

const SearchHeader = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
      <TouchableOpacity>
        <Image source={BackWhiteIcon} style={styles.backWhiteImage} />
      </TouchableOpacity>
      <View>
        <TextInput
          style={[
            styles.textInput,
            {
              fontSize: fontSize * 16,
            },
          ]}
          placeholderTextColor={Theme.color.gray}
          placeholder={t('searchPlaceholder')}
        />

        <Image source={SearchBlackIcon} style={styles.searchBlackImage} />
        <TouchableOpacity style={styles.closeGrayTouch}>
          <Image source={CloseGrayIcon} style={styles.closeGrayImage} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  closeGrayImage: {
    width: getPixel(15.75),
    height: getPixel(15.75),
  },
  closeGrayTouch: {
    position: 'absolute',
    top: getHeightPixel(12.5),
    right: getPixel(10.8),
  },
  searchBlackImage: {
    position: 'absolute',
    top: getHeightPixel(11),
    left: getPixel(13),
    width: getPixel(18),
    height: getPixel(18),
  },
  backWhiteImage: {
    width: getPixel(30),
    height: getPixel(30),
  },
  textInput: {
    width: getPixel(288),
    height: getHeightPixel(40),
    backgroundColor: Theme.color.white,
    color: Theme.color.black,
    paddingLeft: getPixel(41),
    paddingRight: getPixel(26),
    paddingTop: getHeightPixel(10),
    paddingBottom: getHeightPixel(8),
    borderRadius: getPixel(20),
  },
  headerContainer: {
    height: getHeightPixel(60),
    width: getPixel(360),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getPixel(16),
  },
});
