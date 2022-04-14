import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AutoHeightImage from 'react-native-auto-height-image';
import backArrowBlackIcon from '@assets/image/back_black.png';
import {TouchBox} from '../Global/container';
import {useNavigation} from '@react-navigation/native';
import {NavigationHeaderProps} from '@/Types/Components/HomeTypes';
import {MediumText} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';

const Header: React.FC<NavigationHeaderProps> = ({title, children}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useNavigation();
  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.headerView}>
      <TouchableOpacity style={styles.touch} onPress={onPressBack}>
        <Image source={backArrowBlackIcon} style={styles.image} />
      </TouchableOpacity>
      <MediumText fontSize={`${18 * fontSize}`}>{title}</MediumText>
      <View style={styles.rightView}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightView: {
    position: 'absolute',
    right: getPixel(16),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    marginLeft: getPixel(16),
    marginRight: getPixel(10),
    width: getPixel(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    height: getHeightPixel(50),
    width: '100%',
    flexDirection: 'row',

    alignContent: 'center',
  },
  image: {
    width: getPixel(20),
    height: getPixel(12.5),
  },
});

export default Header;
