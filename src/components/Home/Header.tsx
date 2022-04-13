import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

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
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps} from '@/Types/Components/HomeTypes';
import Location from '../Modal/Location';
import useBoolean from '@/Hooks/useBoolean';
import ModalFilter from './ModalFilter';
import ModalMyPage from './ModalMyPage';

const Header: React.FC<HeaderProps> = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {
    value: isModal,
    on: onIsModal,
    off: offIsModal,
    toggle: toggleIsModal,
  } = useBoolean(false);
  const {
    value: isMenu,
    on: onIsMenu,
    off: offIsMenu,
    toggle: toggleIsMenu,
  } = useBoolean(false);

  return (
    <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
      <RowBox>
        <Box style={styles.firstIcon}>
          <Image style={[styles.icon]} source={LocationWhiteIcon} />

          <View style={styles.locationCheck}>
            <Image source={TrianglePinkIcon} style={styles.locationCheckIcon} />
            <WhiteText fontSize={`${12 * fontSize}px`}>
              {t('locationCheck')}
            </WhiteText>
          </View>
        </Box>
        <TouchableOpacity onPress={toggleIsModal} style={styles.locationTouch}>
          <WhiteText fontSize={`${18 * fontSize}`}>Bom Retiro</WhiteText>
        </TouchableOpacity>
      </RowBox>
      <RowBox>
        <TouchableOpacity>
          <Image style={styles.icon} source={SearchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIsMenu}>
          <Image style={styles.icon} source={MenuIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={AlarmIcon} />
        </TouchableOpacity>
      </RowBox>
      {isModal && (
        <Modal
          animationType="slide"
          transparent
          style={{flex: 1, backgroundColor: '#0006'}}
          onRequestClose={offIsModal}>
          <Location offIsModal={offIsModal} />
        </Modal>
      )}
      {isMenu && (
        <Modal visible={isMenu} transparent onRequestClose={offIsMenu}>
          {isMenu && <ModalMyPage onClose={offIsMenu} />}
        </Modal>
      )}
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
