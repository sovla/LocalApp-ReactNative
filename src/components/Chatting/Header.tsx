import {
  Image,
  ImageBackground,
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
import {useAppSelector, useAppNavigation} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {Picker} from '@react-native-picker/picker';

const Header: React.FC = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [selectMenu, setSelectMenu] = useState('전체보기');
  const navigation = useAppNavigation();
  const chattingMenu = ['chattingMenu1', 'chattingMenu2', 'chattingMenu3'];
  return (
    <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
      <RowBox>
        <Picker
          style={{...styles.pickerStyle, fontSize: fontSize * 14}}
          selectedValue={selectMenu}
          dropdownIconColor={Theme.color.white}
          onValueChange={setSelectMenu}>
          {chattingMenu.map(v => {
            return (
              <Picker.Item
                style={{
                  ...styles.pickerItem,
                  fontSize: fontSize * 14,
                  color: Theme.color.black,
                  backgroundColor: '#0000',
                }}
                label={t(v)}
                value={t(v)}
              />
            );
          })}
        </Picker>
      </RowBox>
      <RowBox>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Image style={styles.icon} source={SearchIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AllCategory');
          }}>
          <Image style={styles.icon} source={MenuIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AlarmList');
          }}>
          <Image style={styles.icon} source={AlarmIcon} />
        </TouchableOpacity>
      </RowBox>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  pickerItem: {
    fontFamily: Theme.fontWeight.medium,
  },
  pickerStyle: {
    width: getPixel(150),
    height: getHeightPixel(50),
    color: Theme.color.white,
    fontFamily: Theme.fontWeight.medium,
  },
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
    borderRadius: 4,
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
