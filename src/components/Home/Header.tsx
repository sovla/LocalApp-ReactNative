import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import RedBoxImage from '@assets/image/box_red.png';
import {Box, RowBox} from '../Global/container';
import {Text, WhiteText} from '../Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

const Header: React.FC = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: getHeightPixel(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      source={BackGroundImage}>
      <RowBox>
        <Box style={styles.firstIcon}>
          <Image style={[styles.icon]} source={LocationWhiteIcon} />
          <View
            style={{
              position: 'absolute',
              zIndex: 200,
              backgroundColor: Theme.color.pinkRed,
              width: getPixel(120),
              height: getHeightPixel(32),
              bottom: -getHeightPixel(40),
              borderRadius: getPixel(4),
              right: 0,
            }}>
            <WhiteText fontSize={`${12 * fontSize}px`}>{t('locationCheck')}</WhiteText>
          </View>
        </Box>
        <TouchableOpacity style={styles.locationTouch}>
          <WhiteText fontSize={`${18 * fontSize}`}>Bom Retiro</WhiteText>
        </TouchableOpacity>
      </RowBox>
      <RowBox>
        <TouchableOpacity>
          <Image style={styles.icon} source={SearchIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={MenuIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={AlarmIcon} />
        </TouchableOpacity>
      </RowBox>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  locationTouch: {flexDirection: 'row', alignItems: 'center'},
  icon: {
    width: getPixel(24),
    height: getPixel(24),
    marginRight: getPixel(10),
  },
  firstIcon: {
    marginLeft: getPixel(16),
  },
});
