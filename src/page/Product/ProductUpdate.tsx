import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector, useCallbackNavigation} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import CloseGrayIcon from '@assets/image/close_gray.png';
import ArrowRightGrayIcon from '@assets/image/arrow_right_gray.png';
import Header from '@/Components/LoginSignUp/Header';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {categoryMenu, productDummy} from '@/assets/global/dummy';
import CameraImage from '@/Components/Product/CameraImage';
import {AlertButton, findCategory, findTier, getHitSlop} from '@/Util/Util';
import {ProductTypes} from '@/Types/Components/global';
import {ProductUpdateProps} from '@/Types/Screen/Screen';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TitleInput from '@/Components/Product/TitleInput';
import {usePostSend} from '@/Hooks/useApi';

export default function ProductUpdate({route: {params}}: ProductUpdateProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);
  const isFocused = useIsFocused();
  const navigation = useAppNavigation();

  const [product, setProduct] = useState<ProductTypes>(productDummy);
  const [carDetailOptions, setCarDetailOptions] = useState([
    '에어백',
    '도난감지 센서',
    '에어컨',
    '오토 윈도',
    '크루즈 컨트롤',
    '후방감지 센서',
    'ABS브레이크',
    '가죽시트',
    '선루프',
    '멀티미디어 대쉬보드',
    '전동사이드미러',
    '방탄설비',
  ]);
  const [carHistoryInformation, setCarHistoryInformation] = useState(['IPVA 완납', '할부 차량', '차량 등록세', '보증 기간 유효', '공식 대리점에서 보수 및 정비 완료']);

  const [selectDetail, setSelectDetail] = useState<string[]>([]);
  const [selectHistory, setSelectHistory] = useState<string[]>([]);

  const {PostAPI: registerProduct} = usePostSend('product_add.php', {
    pt_file: product.imageFile,
    imageField: 'pt_file',
    mt_idx: user.mt_idx,
    pt_title: product.title,
    pt_cate: findCategory(product.categoryMenu),
    pt_tag: product.tag?.split(' ').join(','),
    pt_grade: findTier(product.tier),
    pt_price: product.price,
    pt_price_check: product.isNego ? 'Y' : 'N',
    pt_location: product.location,
    pt_location_detail: product.pt_location_detail,
    pt_lat: product.pt_lat,
    pt_lng: product.pt_lng,
    pt_detail: product.content,
  });

  useEffect(() => {
    if (params) {
      console.log({...params}, 'params');
      setProduct(prev => ({
        ...prev,
        ...params,
      }));
    }

    return () => {};
  }, [isFocused]);

  const isNotCar = product.categoryMenu !== 'car';
  const isNotMotor = product.categoryMenu !== 'motorcycle';

  const onChangeProduct = (key: keyof ProductTypes, value: any) => {
    if (typeof product[key] === typeof value) {
      setProduct(prev => ({...prev, [key]: value}));
    }
  };

  const onPressConfirm = () => {
    registerProduct().then(res => {
      if ('result' in res && res.result === 'false') {
        return AlertButton(res?.msg ?? '');
      } else {
        navigation.navigate('ProductComplete');
      }
    });
  };
  const onPressCamera = useCallback(() => {
    navigation.navigate('ProductPhoto', product.imageFile);
  }, [product.imageFile]);
  return (
    <View style={{flex: 1}}>
      <Header title={t(params?.isEdit ? 'productUpdateTitle' : 'productRegTitle')} />
      <KeyboardAwareScrollView>
        <View style={styles.viewMainContainer}>
          <ScrollView horizontal>
            <View style={{width: getPixel(16)}} />
            {/* 이미지 등록 */}
            <CameraImage imageArray={product.imageFile} maxNum={10} onPress={onPressCamera} />
            {product.imageFile.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.imageView}>
                    <Image
                      source={
                        item?.path
                          ? {
                              uri: item.path,
                            }
                          : require('@assets/image/dummy.png')
                      }
                      style={styles.image}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      onChangeProduct(
                        'imageFile',
                        product.imageFile.filter(v => v.path !== item.path),
                      );
                    }}
                    style={styles.closeTouch}
                    hitSlop={getHitSlop(10)}>
                    <Image source={CloseGrayIcon} style={{width: getPixel(18), height: getPixel(18)}} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.contentContainer}>
            <TextInput
              style={{
                ...styles.titleTextInput,
                fontSize: fontSize * 14,
              }}
              placeholderTextColor={Theme.color.gray}
              placeholder={t('title')}
            />
            <Line isGray />

            {/* 카테고리 */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductCategory');
              }}
              style={styles.boxTouch}>
              <View style={styles.row}>
                {product?.categoryMenu !== null ? (
                  <>
                    <AutoHeightImage source={categoryMenu.find(v => v.name === product.categoryMenu)?.image} width={getPixel(24)} />
                    <Text medium fontSize={`${14 * fontSize}`} style={styles.textMarginLeft}>
                      {t(product.categoryMenu)}
                    </Text>
                  </>
                ) : (
                  <Text medium fontSize={`${14 * fontSize}`}>
                    {t('categorySelect')}
                  </Text>
                )}
              </View>
              <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
            </TouchableOpacity>
            <Line isGray />

            {/* 태그 */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductTag', {
                  tag: product.tag,
                });
              }}
              style={styles.boxTouch}>
              <View style={styles.row}>
                <Text fontSize={`${14 * fontSize}`} medium>
                  {product?.tag ?? t('tagUpdate')}
                </Text>
              </View>
              <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
            </TouchableOpacity>
            <Line isGray />

            {/* 등급 */}
            {isNotCar && isNotMotor && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductTier');
                  }}
                  style={styles.boxTouch}>
                  <View style={styles.row}>
                    <Text fontSize={`${14 * fontSize}`} medium>
                      {typeof product.tier === 'string' ? t(product.tier) : t('searchModalProductState')}
                    </Text>
                  </View>
                  <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
                </TouchableOpacity>
                <Line isGray />
              </>
            )}

            {/* 가격 */}
            <View style={styles.boxTouch}>
              <View style={styles.row}>
                <TextInput
                  style={{
                    fontFamily: Theme.fontWeight.medium,
                    fontSize: 14 * fontSize,
                    color: Theme.color.black,
                    height: getHeightPixel(50),
                    width: isNotCar && isNotMotor ? getPixel(170) : getPixel(328),
                  }}
                  placeholder={t('pricePh')}
                  placeholderTextColor={Theme.color.gray}
                  keyboardType="numeric"
                  onChangeText={text => {
                    onChangeProduct('price', text);
                  }}
                />
              </View>
              {isNotCar && isNotMotor && (
                <TouchableOpacity
                  style={styles.negoView}
                  onPress={() => {
                    onChangeProduct('isNego', !product.isNego);
                  }}>
                  <AutoHeightImage source={product.isNego ? require('@assets/image/check_on.png') : require('@assets/image/check_off.png')} width={getPixel(22)} />
                  <Text fontSize={`${14 * fontSize}`} medium>
                    {t('noPriceOffer')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Line isGray />

            {/* 거래지역 */}
            {isNotCar && isNotMotor && (
              <>
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
                    <Text fontSize={`${14 * fontSize}`} medium style={{marginRight: getPixel(10)}}>
                      {product.location}
                    </Text>
                    <AutoHeightImage source={ArrowRightGrayIcon} width={getPixel(6)} />
                  </View>
                </TouchableOpacity>
                <Line isGray />
              </>
            )}

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
          </View>

          {(!isNotCar || !isNotMotor) && (
            <>
              <Line height={getHeightPixel(10)} />
              <View
                style={{
                  marginHorizontal: getPixel(16),
                  marginTop: getHeightPixel(30),
                }}>
                {/* 거래 지역 */}
                <TitleInput title={t('tradeArea')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                {/* 자동차 모델 */}
                <TitleInput title={t(!isNotCar ? 'carBrand' : 'bikeBrand')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                {/* 모델 */}
                <TitleInput title={t('model')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                {/* 상세모델 */}
                <TitleInput title={t('detailModel')} placeHolder={t('noInput')} onPress={() => {}} />
                {/* 색상 */}
                <TitleInput title={t('color')} placeHolder={t('noInput')} onPress={() => {}} />
                {/* 연식 */}
                <TitleInput title={t('year')} placeHolder={t('unSelected')} onPress={() => {}} />

                {/* 주행거리 및 배기량(bike) */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TitleInput title={t('distanceDriven')} placeHolder={t('noInput')} onPress={() => {}} width={getPixel(150)} unitText="km" />
                  <TitleInput title={t('distanceDriven')} placeHolder={t('noInput')} onPress={() => {}} width={getPixel(150)} unitText="CC" />
                </View>

                {/* 배기량 */}
                <TitleInput title={t('displacement')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                {/* 연료 */}
                <TitleInput title={t('fuel')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                {/* 변속기 */}
                <TitleInput title={t('gearbox')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                {/* 도어 갯수 */}
                {!isNotCar && (
                  <View style={styles.marginBottom25}>
                    <Text fontSize={`${12 * fontSize}`} medium>
                      {t('doors')}
                    </Text>
                    <View style={styles.betweenView}>
                      <TouchableOpacity style={styles.doorTouch}>
                        <GrayText fontSize={`${16 * fontSize}`}>{t('door2')}</GrayText>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.doorTouch}>
                        <GrayText fontSize={`${16 * fontSize}`}>{t('door4')}</GrayText>
                      </TouchableOpacity>
                    </View>
                    <Line isGray />
                  </View>
                )}

                {/* 차량 번호 끝자리 */}
                <TitleInput title={t('carEndNumber')} placeHolder={t('unSelected')} isSelect onPress={() => {}} />
                <Text fontSize={`${12 * fontSize}`} medium>
                  {t('selectDetailOption')}
                </Text>
                {carDetailOptions.map(item => {
                  const findItem = typeof selectDetail.find(v => v === item) === 'string';
                  return (
                    <TouchableOpacity
                      style={styles.checkBoxTouch}
                      onPress={() => {
                        if (findItem) {
                          setSelectDetail(prev => prev.filter(v => v !== item));
                        } else {
                          setSelectDetail(prev => [...prev, item]);
                        }
                      }}>
                      <CheckBoxImage isBox isOn={findItem} />
                      <Text style={styles.marginLeft15} fontSize={`${14 * fontSize}`}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <Line isGray style={styles.marginVertical35} />

                <Text fontSize={`${12 * fontSize}`} medium>
                  {t('carHistoryInformation')}
                </Text>
                {carHistoryInformation.map(item => {
                  const findItem = typeof selectHistory.find(v => v === item) === 'string';
                  return (
                    <TouchableOpacity
                      style={styles.checkBoxTouch}
                      onPress={() => {
                        if (findItem) {
                          setSelectHistory(prev => prev.filter(v => v !== item));
                        } else {
                          setSelectHistory(prev => [...prev, item]);
                        }
                      }}>
                      <CheckBoxImage isBox isOn={findItem} />
                      <Text style={styles.marginLeft15} fontSize={`${14 * fontSize}`}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <Line isGray style={styles.marginVertical35} />

                {/* 도어 갯수 */}
                <View style={styles.marginBottom25}>
                  <Text fontSize={`${12 * fontSize}`} medium>
                    {t('ownerChangeHistory')}
                  </Text>
                  <View style={styles.betweenView}>
                    <TouchableOpacity style={styles.doorTouch}>
                      <GrayText fontSize={`${12 * fontSize}`}>{t('yes')}</GrayText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.doorTouch}>
                      <GrayText fontSize={`${12 * fontSize}`}>{t('no')}</GrayText>
                    </TouchableOpacity>
                  </View>
                  <Line isGray />
                </View>
              </View>
            </>
          )}

          <Button
            content={t('complete')}
            width="328px"
            style={{
              marginHorizontal: getPixel(16),

              marginVertical: getHeightPixel(30),
            }}
            onPress={onPressConfirm}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  marginVertical35: {
    marginVertical: getHeightPixel(35),
  },
  marginLeft15: {
    marginLeft: getPixel(15),
  },
  checkBoxTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: getPixel(15),
    marginTop: getHeightPixel(20),
  },
  betweenView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeightPixel(30),
  },
  doorTouch: {
    width: getPixel(156),
    height: getHeightPixel(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: Theme.color.gray,
    borderRadius: 4,
  },
  marginBottom25: {marginBottom: getHeightPixel(25)},
  titleTextInput: {
    width: getPixel(328),
    height: getHeightPixel(50),
    fontFamily: Theme.fontWeight.medium,
    color: Theme.color.black,
  },
  contentContainer: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
  },
  viewMainContainer: {
    width: getPixel(360),
    marginTop: getHeightPixel(36),
  },
  textAreaInput: {
    marginBottom: getHeightPixel(30),
    width: getPixel(328),
    height: getHeightPixel(140),
    borderRadius: 4,
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
    borderRadius: 15,
    marginLeft: getPixel(22),
  },
});
