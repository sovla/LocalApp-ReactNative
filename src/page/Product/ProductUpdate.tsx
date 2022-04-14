import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import CloseGrayIcon from '@assets/image/close_gray.png';
import ArrowRightGrayIcon from '@assets/image/arrow_right_gray.png';
import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {categoryMenu, productDummy} from '@/assets/global/dummy';
import CameraImage from '@/Components/Product/CameraImage';
import {getHitSlop} from '@/Util/Util';
import {ProductTypes} from '@/Types/Components/global';

export default function ProductUpdate() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const [imageArray, setImageArray] = useState<Array<any>>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  ]);

  const [product, setProduct] = useState<ProductTypes>(productDummy);

  const onChangeProduct = (key: keyof ProductTypes, value: any) => {
    if (typeof product[key] === typeof value) {
      setProduct(prev => ({...prev, [key]: value}));
    }
  };
  return (
    <View>
      <Header title={t('productUpdateTitle')} />
      <View
        style={{
          width: getPixel(360),
          marginTop: getHeightPixel(36),
        }}>
        <ScrollView horizontal>
          <View style={{width: getPixel(16)}} />
          <CameraImage />
          {imageArray.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.imageView}>
                  <Image
                    source={require('@assets/image/dummy.png')}
                    style={styles.image}
                  />
                </View>
                <TouchableOpacity
                  style={styles.closeTouch}
                  hitSlop={getHitSlop(10)}>
                  <Image
                    source={CloseGrayIcon}
                    style={{width: getPixel(18), height: getPixel(18)}}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            width: getPixel(328),
            marginHorizontal: getPixel(16),
          }}>
          <TextInput />
          <Line isGray />

          {/* 카테고리 */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductCategory');
            }}
            style={styles.boxTouch}>
            <View style={styles.row}>
              <AutoHeightImage
                source={
                  categoryMenu.find(v => v.name === product.categoryMenu)?.image
                }
                width={getPixel(24)}
              />
              <Text
                medium
                fontSize={`${14 * fontSize}`}
                style={styles.textMarginLeft}>
                {t(product.categoryMenu)}
              </Text>
            </View>
            <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
          </TouchableOpacity>
          <Line isGray />

          {/* 태그 */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductTag');
            }}
            style={styles.boxTouch}>
            <View style={styles.row}>
              <Text fontSize={`${14 * fontSize}`} medium>
                {product.tag}
              </Text>
            </View>
            <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
          </TouchableOpacity>
          <Line isGray />

          {/* 등급 */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductTier');
            }}
            style={styles.boxTouch}>
            <View style={styles.row}>
              <Text fontSize={`${14 * fontSize}`} medium>
                {typeof product.tier === 'string' && t(product.tier)}
              </Text>
            </View>
            <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
          </TouchableOpacity>
          <Line isGray />

          {/* 가격 */}
          <View style={styles.boxTouch}>
            <View style={styles.row}>
              <TextInput />
            </View>
            <TouchableOpacity
              style={styles.negoView}
              onPress={() => {
                onChangeProduct('isNego', !product.isNego);
              }}>
              <AutoHeightImage
                source={
                  product.isNego
                    ? require('@assets/image/check_on.png')
                    : require('@assets/image/check_off.png')
                }
                width={getPixel(22)}
              />
              <Text fontSize={`${14 * fontSize}`} medium>
                {t('noPriceOffer')}
              </Text>
            </TouchableOpacity>
          </View>
          <Line isGray />

          {/* 거래지역 */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductLocation');
            }}
            style={styles.boxTouch}>
            <View style={styles.row}>
              <Text fontSize={`${14 * fontSize}`} medium>
                {t('tradeLocaition')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text
                fontSize={`${14 * fontSize}`}
                medium
                style={{marginRight: getPixel(10)}}>
                {product.location}
              </Text>
              <AutoHeightImage
                source={ArrowRightGrayIcon}
                width={getPixel(6)}
              />
            </View>
          </TouchableOpacity>
          <Line isGray />

          {/* 상세 설명 */}
          <Text
            fontSize={`${14 * fontSize}`}
            medium
            style={{
              marginTop: getHeightPixel(15),
              marginBottom: getHeightPixel(8),
            }}>
            {t('detailDescription')}
          </Text>
          <TextInput multiline style={styles.textAreaInput} />
          <Button content={t('complete')} width="328px" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textAreaInput: {
    marginBottom: getHeightPixel(30),
    width: getPixel(328),
    height: getHeightPixel(140),
    borderRadius: getPixel(4),
    borderWidth: 1,
    borderColor: Theme.color.whiteGray_EE,
  },
  negoView: {
    width: getPixel(105),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMarginLeft: {
    marginLeft: getPixel(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: getHeightPixel(50),
    width: getPixel(328),
  },
  closeTouch: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    width: getPixel(60),
    height: getPixel(60),
  },
  imageView: {
    width: getPixel(60),
    height: getPixel(60),
    overflow: 'hidden',
    borderRadius: getPixel(15),
    marginLeft: getPixel(22),
  },
});
