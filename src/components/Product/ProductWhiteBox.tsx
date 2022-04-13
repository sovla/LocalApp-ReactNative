import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {DarkBlueText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import MoreIcon from '@assets/image/more.png';
import {ProductWhiteBoxProps} from '@/Types/Components/ProductTypes';

const ProductWhiteBox: React.FC<ProductWhiteBoxProps> = ({
  title = '나이키 운동화 슬립온 240 여성상의/여름블라우스/펀칭...',
  price = '$24.00',
  onIsEditProduct,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('@assets/image/dummy.png')}
          style={styles.image}
        />
        <View style={styles.contentView}>
          <Text numberOfLines={2} fontSize={`${14 * fontSize}`}>
            {title}
          </Text>
          <DarkBlueText bold fontSize={`${16 * fontSize}`}>
            {price}
          </DarkBlueText>
        </View>
        <TouchableOpacity onPress={onIsEditProduct}>
          <AutoHeightImage source={MoreIcon} width={getPixel(19.2)} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuView}>
        <TouchableOpacity style={styles.menuLeftTouch}>
          <Text fontSize={`${12 * fontSize}`}>{t('MyProductMenu1')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuRightTouch}>
          <Text fontSize={`${12 * fontSize}`}>{t('MyProductMenu2')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductWhiteBox;

const styles = StyleSheet.create({
  container: {
    width: getPixel(328),
    height: getHeightPixel(132),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(10),
    marginBottom: getHeightPixel(8),
    marginHorizontal: getPixel(16),
    paddingTop: getHeightPixel(13),
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: getPixel(10),
    paddingBottom: getHeightPixel(18.5),
    borderBottomColor: Theme.color.whiteGray_EE,
    borderBottomWidth: 1,
  },
  image: {
    width: getPixel(64),
    height: getPixel(64),
  },
  contentView: {
    width: getPixel(190),
    marginLeft: getPixel(16),
    marginRight: getPixel(16),
  },
  menuView: {
    height: getHeightPixel(36.5),
    flexDirection: 'row',
  },
  menuLeftTouch: {
    width: '50%',
    borderRightColor: Theme.color.whiteGray_EE,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRightTouch: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
