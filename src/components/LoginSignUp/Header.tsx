import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AutoHeightImage from 'react-native-auto-height-image';
import backArrowBlackIcon from '@assets/image/back_black.png';
import {TouchBox} from '../Global/container';
import {useNavigation} from '@react-navigation/native';

const Header: React.FC = props => {
  const navigation = useNavigation();
  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.headerView}>
      <TouchableOpacity style={styles.touch} onPress={onPressBack}>
        <AutoHeightImage
          source={backArrowBlackIcon}
          width={getPixel(30)}
          maxHeight={getPixel(30)}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: getPixel(30),
    justifyContent: 'flex-end',
    height: getPixel(30),
    marginLeft: getPixel(10),
  },
  headerView: {
    height: getHeightPixel(40),
    width: '100%',
    justifyContent: 'flex-end',
  },
  image: {},
});

export default Header;
