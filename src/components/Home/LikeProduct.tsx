import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {LikeProductProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {DarkBlueText, Text} from '../Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import dummy from '@assets/image/dummy.png';
import {CheckBoxImage} from '../Global/button';

const LikeProduct: React.FC<LikeProductProps> = ({title, price, image, isOn, onPressItem, isEdit, isSelectEdit, onPress, idx, categoryNum}) => {
  const fontSize = useAppSelector(state => state.fontSize.value);

  return (
    <TouchableOpacity
      onPress={!isEdit ? onPress : onPressItem}
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
          <CheckBoxImage isOn={isOn} isBox />
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

          <DarkBlueText style={{marginTop: getHeightPixel(4)}} fontSize={`${16 * fontSize}`} medium>
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
