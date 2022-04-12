import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {Text} from '../Global/text';
import HomeOnIcon from '@/assets/image/home_color.png';
import HomeOffIcon from '@/assets/image/home_gray.png';
import FavoriteOnIcon from '@/assets/image/favorite_color.png';
import FavoriteOffIcon from '@/assets/image/favorite_gray.png';
import ChatOnIcon from '@/assets/image/chat_color.png';
import ChatOffIcon from '@/assets/image/chat_gray.png';
import ProfileOnIcon from '@/assets/image/profile_color.png';
import ProfileOffIcon from '@/assets/image/profile_gray.png';
import {FooterProps, MenuBoxProps} from '@/Types/Components/HomeTypes';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {Shadow} from 'react-native-shadow-2';

const Footer: React.FC<FooterProps> = ({menu}) => {
  return (
    <Shadow distance={4}>
      <View style={styles.footerContainer}>
        <MenuBox
          OffImage={HomeOffIcon}
          onImage={HomeOnIcon}
          name="home"
          selectMenu={menu}
        />
        <MenuBox
          OffImage={FavoriteOffIcon}
          onImage={FavoriteOnIcon}
          name="favorite"
          selectMenu={menu}
        />
        <MenuBox
          OffImage={ChatOffIcon}
          onImage={ChatOnIcon}
          name="chat"
          selectMenu={menu}
        />
        <MenuBox
          OffImage={ProfileOffIcon}
          onImage={ProfileOnIcon}
          name="profile"
          selectMenu={menu}
        />
      </View>
    </Shadow>
  );
};

const MenuBox: React.FC<MenuBoxProps> = ({
  onImage,
  OffImage,
  selectMenu,
  name,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const onPress = () => {
    switch (name) {
      case 'chat':
        navigation.navigate('ChattingHome');
        break;
      case 'favorite':
        navigation.navigate('LikeList');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'profile':
        navigation.navigate('ProfileHome');
        break;

      default:
        break;
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.viewCenter}>
      <Image
        source={selectMenu === name ? onImage : OffImage}
        style={styles.image}
      />
      <Text
        bold={selectMenu === name}
        color={selectMenu === name ? Theme.color.blue_3D : Theme.color.gray}
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
