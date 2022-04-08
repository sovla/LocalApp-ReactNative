import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {LikeProductProps, ProductProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {
  DarkBlueText,
  GrayText,
  MediumText,
  Text,
  WhiteText,
} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import LocationIcon from '@assets/image/map-marker.png';
import ViewIcon from '@assets/image/view.png';
import LikeIcon from '@assets/image/heart.png';
import LikeEmptyIcon from '@assets/image/unlike.png';
import LikeFillIcon from '@assets/image/love_pink.png';
import dummy from '@assets/image/dummy.png';
import {getHitSlop} from '@/Util/Util';
import {CheckBox, CheckBoxImage} from '../Global/button';

const LikeProduct: React.FC<LikeProductProps> = ({
  title,
  price,
  image,
  isEdit,
  isSelectEdit,
}) => {
  const fontSize = useAppSelector(state => state.fontSize.value);

  return (
    <TouchableOpacity
      disabled={!isEdit}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: getPixel(360),
      }}>
      {isEdit && (
        <View
          style={{
            marginLeft: getPixel(16),
          }}>
          <CheckBoxImage isOn={isSelectEdit} isBox />
        </View>
      )}
      <View
        style={[
          stylesNoneList.productContainer,
          isEdit && {
            width: getPixel(306),
            marginLeft: getPixel(8.8),
            marginRight: getPixel(16),
          },
        ]}>
        <View style={stylesNoneList.centerView}>
          <Image source={image} style={[stylesNoneList.productImage]} />
        </View>

        <View
          style={[
            stylesNoneList.productContentView,
            isEdit && {
              width: getPixel(200),
            },
          ]}>
          <Text fontSize={`${14 * fontSize}`} numberOfLines={2}>
            {title}
          </Text>

          <DarkBlueText
            style={{marginTop: getHeightPixel(4)}}
            fontSize={`${16 * fontSize}`}
            medium>
            {price}
          </DarkBlueText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

LikeProduct.defaultProps = {
  image: dummy,
  status: '',
  price: 'R$ 24.00',
  title: '13,000Pa 초강력흡입력 [샤오미] 차량용 무선 핸디 청소기',
};

export default LikeProduct;

const stylesNoneList = StyleSheet.create({
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getPixel(10),
    overflow: 'hidden',
    marginRight: getPixel(16),
  },

  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeightPixel(16),
  },

  productContentView: {
    width: getPixel(225),
  },
  productImage: {
    width: getPixel(64),
    height: getPixel(64),
  },
  productContainer: {
    flexDirection: 'row',
    width: getPixel(328),
    minHeight: getHeightPixel(90),
    paddingHorizontal: getPixel(10),
    paddingVertical: getHeightPixel(13),
    marginHorizontal: getPixel(16),
    marginBottom: getHeightPixel(8),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(15),
    alignItems: 'center',
  },
});
