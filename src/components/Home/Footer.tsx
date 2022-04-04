import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {Text} from '../Global/text';
import HomeOnIcon from '@/assets/image/home_color.png';
import HomeOffIcon from '@/assets/image/home.png';
import FavoriteOnIcon from '@/assets/image/favorite_color.png';
import FavoriteOffIcon from '@/assets/image/favorite_gray.png';
import ChatOnIcon from '@/assets/image/chat_color.png';
import ChatOffIcon from '@/assets/image/chat_gray.png';
import ProfileOnIcon from '@/assets/image/profile_color.png';
import ProfileOffIcon from '@/assets/image/profile_gray.png';
import {MenuBoxProps} from '@/Types/Components/HomeTypes';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';

const Footer = () => {
  const [selectMenu, setSelectMenu] = useState('home');
  return (
    <View style={styles.footerContainer}>
      <MenuBox
        OffImage={HomeOffIcon}
        onImage={HomeOnIcon}
        name="home"
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
      <MenuBox
        OffImage={FavoriteOffIcon}
        onImage={FavoriteOnIcon}
        name="favorite"
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
      <MenuBox
        OffImage={ChatOffIcon}
        onImage={ChatOnIcon}
        name="chat"
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
      <MenuBox
        OffImage={ProfileOffIcon}
        onImage={ProfileOnIcon}
        name="profile"
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
    </View>
  );
};

const MenuBox: React.FC<MenuBoxProps> = ({
  onImage,
  OffImage,
  selectMenu,
  setSelectMenu,
  name,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const onPress = () => {
    setSelectMenu(name);
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.viewCenter}>
      <Image
        source={selectMenu === name ? onImage : OffImage}
        style={styles.image}
      />
      <Text
        bold={selectMenu === name}
        color={selectMenu === name ? Theme.color.blue : Theme.color.gray}
        fontSize={`${12 * fontSize}`}>
        {t(name)}
      </Text>
    </TouchableOpacity>
  );
};

export default Footer;

const styles = StyleSheet.create({
  image: {
    width: getPixel(20),
    height: getPixel(20),
  },
  viewCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    width: getPixel(360),
    height: getHeightPixel(54),
    paddingHorizontal: getPixel(16),
    backgroundColor: Theme.color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
