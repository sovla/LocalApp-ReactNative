import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {Box, RowBox} from '../Global/container';
import {WhiteText} from '../Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

const Header: React.FC = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
      <RowBox>
        <TouchableOpacity style={styles.locationTouch}>
          <WhiteText fontSize={`${18 * fontSize}`}>Bom Retiro</WhiteText>
          {/* 수정필요 이쪽에 드롭다운 넣을 예정 */}
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
  headerContainer: {
    width: '100%',
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  locationCheckIcon: {
    width: getPixel(15),
    height: getHeightPixel(15),
    position: 'absolute',
    top: -getHeightPixel(8),
    left: getPixel(23),
    zIndex: 100,
  },
  locationCheck: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: Theme.color.pinkRed,
    width: getPixel(120),
    height: getHeightPixel(23),
    bottom: -getHeightPixel(32),
    borderRadius: getPixel(4),
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
