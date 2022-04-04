import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {BoldText, Text} from '../Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {RowBox, TouchBox} from '../Global/container';
import MenuListOnIcon from '@assets/image/menu_list_ver.png';
import MenuListOffIcon from '@assets/image/menu_list_ver1.png';
import MenuOffIcon from '@assets/image/menu_ver.png';
import MenuOnIcon from '@assets/image/menu_ver1.png';

const HomeList: React.FC<{
  location: string;
  isList: boolean;
  setIsList: any;
}> = ({location = 'Bom Retiro', isList, setIsList}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.mainContainer}>
      <Text fontSize={`${14 * fontSize}px`}>{location + t('HomeTitle')}</Text>
      <View style={styles.titleBetween}>
        <BoldText fontSize={`${20 * fontSize}px`}>{t('HomeTitle1')}</BoldText>
        <RowBox>
          <TouchBox
            onPress={() => {
              setIsList(true);
            }}>
            <Image
              source={isList ? MenuListOnIcon : MenuListOffIcon}
              style={styles.menuImage}
            />
          </TouchBox>
          <TouchBox
            onPress={() => {
              setIsList(false);
            }}>
            <Image
              source={isList ? MenuOffIcon : MenuOnIcon}
              style={[styles.menuImage, styles.menuImageMarginLeft]}
            />
          </TouchBox>
        </RowBox>
      </View>
    </View>
  );
};

export default HomeList;

const styles = StyleSheet.create({
  menuImageMarginLeft: {
    flex: 1,
    marginLeft: getPixel(10),
  },
  menuImage: {width: getPixel(24), height: getPixel(24)},
  mainContainer: {
    marginHorizontal: getPixel(16),
    marginVertical: getHeightPixel(20),
  },
  titleBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
