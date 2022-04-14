import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import TrashWhiteIcon from '@assets/image/trash_white.png';
import BackWhiteIcon from '@assets/image/back_white.png';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';

const MyProduct = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [selectMenu, setSelectMenu] = useState<string>(t('ProfileSellProduct'));

  return (
    <View
      style={{
        backgroundColor: Theme.color.whiteGray_F3,
        flex: 1,
      }}>
      <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
        <View style={styles.rowCenter}>
          <TouchableOpacity>
            <AutoHeightImage source={BackWhiteIcon} width={getPixel(30)} />
          </TouchableOpacity>
          <WhiteText medium fontSize={`${20 * fontSize}`}>
            {t('modalMyPageProduct')}
          </WhiteText>
        </View>
        <TouchableOpacity>
          <AutoHeightImage source={TrashWhiteIcon} width={getPixel(30)} />
        </TouchableOpacity>
      </ImageBackground>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={{height: getHeightPixel(10)}} />
            <Menu
              menuList={[
                t('ProfileSellProduct'),
                t('ProfileSellProductComplete'),
              ]}
              selectMenu={selectMenu}
              setSelectMenu={setSelectMenu}
            />
            <View style={{height: getHeightPixel(20)}} />
          </>
        }
        renderItem={({item, index}) => {
          return (
            <ProductWhiteBox
              selectMenu={selectMenu}
              isComplete={selectMenu === t('ProfileSellProductComplete')}
            />
          );
        }}
        data={[1, 2, 3, 4, 5, 6]}
      />
    </View>
  );
};

export default MyProduct;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: getPixel(360),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    paddingHorizontal: getPixel(16),
  },
});
