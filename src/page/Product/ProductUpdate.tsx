import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {
  useAppNavigation,
  useAppSelector,
  useCallbackNavigation,
} from '@/Hooks/CustomHook';
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
import {
  AlertButton,
  brPrice,
  findCategory,
  findTier,
  getHitSlop,
  reverseFindCategory,
  reverseFindTier,
} from '@/Util/Util';
import {categoryMenuTypes, ProductTypes} from '@/Types/Components/global';
import {ProductUpdateProps} from '@/Types/Screen/Screen';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TitleInput from '@/Components/Product/TitleInput';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {CarFuelApi} from '@/Types/API/CarTypes';
import {ProductInfoApi} from '@/Types/API/ProductTypes';
import Product from '@/Components/Home/Product';
import Loading from '@/Components/Global/Loading';

export default function ProductUpdate({route: {params}}: ProductUpdateProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);
  const isFocused = useIsFocused();
  const navigation = useAppNavigation();

  const [product, setProduct] = useState<ProductTypes>(productDummy);

  const [selectDetail, setSelectDetail] = useState<string[]>([]);
  const [selectHistory, setSelectHistory] = useState<string[]>([]);

  const {data: ProductInfo, getData} = useApi<
    ProductInfoApi['T'],
    ProductInfoApi['D']
  >(
    null,
    'product_modify_info.php',
    {
      mt_idx: user.mt_idx as string,
      pt_idx: params?.pt_idx, // params.pt_idx
    },
    {
      isFirst: false,
    },
  );

  const {PostAPI: registerProduct} = usePostSend(
    productApiSelector(params?.isEdit ?? false, product.categoryMenu),
    {
      imageField: 'pt_file',
      mt_idx: user.mt_idx,
      ...productSendData(product),
    },
  );

  const {data: carDetailOptions, getData: getDataCarDetail} = useApi<
    CarFuelApi['T'],
    CarFuelApi['D']
  >(
    {
      cnt: 0,
      list: [],
    },
    product.categoryMenu === 'car' ? 'car_option.php' : 'auto_option.php',
    null,
    {
      isFirst: false,
    },
  );
  const {data: carHistoryInformation, getData: getDataCarHistory} = useApi<
    CarFuelApi['T'],
    CarFuelApi['D']
  >(
    {
      cnt: 0,
      list: [],
    },
    product.categoryMenu === 'car' ? 'car_history.php' : 'auto_history.php',
    null,
    {
      isFirst: false,
    },
  );

  const isNotCar = product.categoryMenu !== 'car';
  const isNotMotor = product.categoryMenu !== 'motorcycle';

  const onChangeProduct = <K extends keyof ProductTypes>(
    key: K,
    value: ProductTypes[K],
  ) => {
    if (typeof product[key] === typeof value || !product[key]) {
      setProduct(prev => ({...prev, [key]: value}));
    } else {
      console.log(typeof product[key], typeof value);
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

  const _Button = useCallback(({isOn, setIsOn, text}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.doorTouch,
          backgroundColor: isOn ? Theme.color.blue_3D : Theme.color.white,
        }}
        onPress={() => setIsOn()}>
        <Text
          color={isOn ? Theme.color.white : Theme.color.gray}
          fontSize={`${12 * fontSize}`}
          medium>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  useEffect(() => {
    if (params) {
      setProduct(prev => ({
        ...prev,
        ...params,
      }));
    }
    if (params?.isEdit) {
      getData(); // 물품 불러오기
    }

    return () => {};
  }, [isFocused]);
  useEffect(() => {
    if (
      product.categoryMenu === 'car' ||
      product.categoryMenu === 'motorcycle'
    ) {
      getDataCarDetail(); // 히스토리 값
      getDataCarHistory(); // 상세 옵션
    }
    setProduct;
  }, [product.categoryMenu]);
  useEffect(() => {
    onChangeProduct('pt_detail_option', selectDetail.join(','));
  }, [selectDetail]);
  useEffect(() => {
    onChangeProduct('pt_history', selectHistory.join(','));
  }, [selectHistory]);

  // 물품 불러오기 API
  useEffect(() => {
    if (ProductInfo) {
      setProduct({
        categoryMenu: reverseFindCategory(ProductInfo.pt_cate),
        content: ProductInfo.pt_detail,
        imageFile: ProductInfo.pt_file.map(v => ({
          path: v,
          mime: '',
          isLocal: false,
        })),
        isNego: ProductInfo.pt_price_check === 'Y',
        location: ProductInfo.pt_location,
        price: ProductInfo.pt_price,
        pt_brand: ProductInfo.pt_brand,
        pt_color: ProductInfo.pt_color,
        pt_detail_option: ProductInfo.pt_detail_option.join(','),
        pt_disp: ProductInfo.pt_disp,
        pt_door: ProductInfo.pt_door,
        pt_fuel: ProductInfo.pt_fuel,
        pt_gear: ProductInfo.pt_gear,
        pt_history: ProductInfo.pt_history.join(','),
        pt_kilo: ProductInfo.pt_kilo,
        pt_lat: +ProductInfo.pt_lat,
        pt_lng: +ProductInfo.pt_lng,
        pt_location_detail: ProductInfo.pt_location_detail,
        pt_model: ProductInfo.pt_model,
        pt_model_datail: ProductInfo.pt_model_detail,
        pt_number: ProductInfo.pt_number,
        pt_owner: ProductInfo.pt_owner,
        pt_year: ProductInfo.pt_year,
        tag: ProductInfo.pt_tag.join(' '),
        tier: reverseFindTier(ProductInfo.pt_grade),
        title: ProductInfo.pt_title,

        //         carLocation:{
        //           lc_idx:,
        // lc_lat:,
        // lc_lng:,
        // lc_title:,
        //         }
      });
      setSelectDetail(ProductInfo.pt_detail_option);
      setSelectHistory(ProductInfo.pt_history);
    }
  }, [ProductInfo]);

  if (params?.isEdit && !ProductInfo) {
    return <Loading />;
  }
  return (
    <View style={{flex: 1}}>
      <Header
        title={t(params?.isEdit ? 'productUpdateTitle' : 'productRegTitle')}
      />
      <KeyboardAwareScrollView>
        <View style={styles.viewMainContainer}>
          <ScrollView horizontal>
            <View style={{width: getPixel(16)}} />
            {/* 이미지 등록 */}
            <CameraImage
              imageArray={product.imageFile}
              maxNum={10}
              onPress={onPressCamera}
            />
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
                    <Image
                      source={CloseGrayIcon}
                      style={{width: getPixel(18), height: getPixel(18)}}
                    />
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
              value={product.title}
              onChangeText={text => onChangeProduct('title', text)}
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
                    <AutoHeightImage
                      source={
                        categoryMenu.find(v => v.name === product.categoryMenu)
                          ?.image
                      }
                      width={getPixel(24)}
                    />
                    <Text
                      medium
                      fontSize={`${14 * fontSize}`}
                      style={styles.textMarginLeft}>
                      {t(product.categoryMenu)}
                    </Text>
                  </>
                ) : (
                  <Text medium fontSize={`${14 * fontSize}`}>
                    {t('categorySelect')}
                  </Text>
                )}
              </View>
              <AutoHeightImage
                source={ArrowRightGrayIcon}
                width={getPixel(6)}
              />
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
              <AutoHeightImage
                source={ArrowRightGrayIcon}
                width={getPixel(6)}
              />
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
                      {typeof product.tier === 'string'
                        ? t(product.tier)
                        : t('searchModalProductState')}
                    </Text>
                  </View>
                  <AutoHeightImage
                    source={ArrowRightGrayIcon}
                    width={getPixel(6)}
                  />
                </TouchableOpacity>
                <Line isGray />
              </>
            )}

            {/* 가격 */}
            <View style={{...styles.boxTouch}}>
              <View
                style={{
                  ...styles.row,
                  width: !(isNotCar && isNotMotor)
                    ? getPixel(328)
                    : getPixel(170),
                }}>
                {product.price?.length > 0 && (
                  <Text
                    style={{marginBottom: getHeightPixel(3)}}
                    fontSize={`${14 * fontSize}`}>
                    R$
                  </Text>
                )}
                <TextInput
                  style={{
                    fontFamily: Theme.fontWeight.medium,
                    fontSize: 14 * fontSize,
                    color: Theme.color.black,
                    minHeight: getHeightPixel(50),
                    flex: 1,
                  }}
                  placeholder={t('pricePh')}
                  placeholderTextColor={Theme.color.gray}
                  keyboardType="numeric"
                  onChangeText={text => {
                    onChangeProduct('price', text);
                  }}
                  value={product.price}
                />
              </View>
              {isNotCar && isNotMotor && (
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

            <TextInput
              multiline
              style={styles.textAreaInput}
              value={product.content}
              onChangeText={text => onChangeProduct('content', text)}
            />
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
                <TitleInput
                  title={t('tradeArea')}
                  placeHolder={t('unSelected')}
                  isSelect
                  value={product.carLocation?.lc_title}
                  onPress={() =>
                    navigation.navigate('CarLocation', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                />
                {/* 자동차 모델 */}
                <TitleInput
                  title={t(!isNotCar ? 'carBrand' : 'bikeBrand')}
                  placeHolder={t('unSelected')}
                  isSelect
                  value={product.pt_brand}
                  onPress={() =>
                    navigation.navigate('CarBrand', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                />
                {/* 모델 */}
                <TitleInput
                  title={t('model')}
                  placeHolder={t('unSelected')}
                  isSelect
                  value={product.pt_model}
                  onPress={() =>
                    navigation.navigate('CarModel', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                />
                {/* 상세모델 */}
                {!isNotCar && (
                  <TitleInput
                    title={t('detailModel')}
                    placeHolder={t('noInput')}
                    value={product.pt_model_datail}
                    onChangeText={(text: string) =>
                      onChangeProduct('pt_model_datail', text)
                    }
                  />
                )}

                {/* 색상 */}
                <TitleInput
                  title={t('color')}
                  placeHolder={t('noInput')}
                  value={product.pt_color}
                  onChangeText={(text: string) =>
                    onChangeProduct('pt_color', text)
                  }
                />
                {/* 연식 */}
                <TitleInput
                  title={t('year')}
                  placeHolder={t('unSelected')}
                  isSelect
                  value={product.pt_year}
                  onPress={() =>
                    navigation.navigate('CarYear', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                />

                {/* 주행거리 및 배기량(bike) */}
                <View style={styles.betweenRowDistance}>
                  <TitleInput
                    title={t('distanceDriven')}
                    placeHolder={t('noInput')}
                    width={getPixel(150)}
                    unitText="km"
                    keyboardType="phone-pad"
                    value={product.pt_kilo}
                    onChangeText={(text: string) => {
                      onChangeProduct('pt_kilo', text);
                    }}
                  />
                  {!isNotMotor && (
                    <TitleInput
                      title={t('displacement')}
                      placeHolder={t('noInput')}
                      width={getPixel(150)}
                      unitText="CC"
                      keyboardType="phone-pad"
                      value={product.pt_kilo}
                      onChangeText={(text: string) => {
                        onChangeProduct('pt_disp', text);
                      }}
                    />
                  )}
                </View>

                {/* 배기량 차량에서만 나옴 */}
                {!isNotCar && (
                  <TitleInput
                    title={t('displacement')}
                    placeHolder={t('unSelected')}
                    isSelect
                    value={product.pt_disp}
                    onPress={() => navigation.navigate('CarDisplacement')}
                  />
                )}
                {/* 연료 */}
                <TitleInput
                  title={t('fuel')}
                  placeHolder={t('unSelected')}
                  isSelect
                  onPress={() =>
                    navigation.navigate('CarFuel', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                  value={product.pt_fuel}
                />
                {/* 변속기 */}
                <TitleInput
                  title={t('gearbox')}
                  placeHolder={t('unSelected')}
                  isSelect
                  onPress={() =>
                    navigation.navigate('CarGear', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                  value={product.pt_gear}
                />
                {/* 도어 갯수 */}
                {!isNotCar && (
                  <View style={styles.marginBottom25}>
                    <Text
                      fontSize={`${12 * fontSize}`}
                      medium
                      style={{marginBottom: getHeightPixel(5)}}>
                      {t('doors')}
                    </Text>
                    <View style={styles.betweenView}>
                      <_Button
                        isOn={product.pt_door === '2'}
                        setIsOn={() => onChangeProduct('pt_door', '2')}
                        text={t('door2')}
                      />
                      <_Button
                        isOn={product.pt_door === '4'}
                        setIsOn={() => onChangeProduct('pt_door', '4')}
                        text={t('door4')}
                      />
                    </View>
                    <Line isGray />
                  </View>
                )}

                {/* 차량 번호 끝자리 */}
                <TitleInput
                  title={t(
                    product.categoryMenu === 'car'
                      ? 'carEndNumber'
                      : 'motorEndNumber',
                  )}
                  placeHolder={t('unSelected')}
                  isSelect
                  onPress={() =>
                    navigation.navigate('CarEndNumber', {
                      isMotor: product.categoryMenu === 'motorcycle',
                    })
                  }
                  value={product.pt_number}
                />
                <Text fontSize={`${12 * fontSize}`} medium>
                  {t('selectDetailOption')}
                </Text>
                {carDetailOptions.list.map(item => {
                  const _Item =
                    'cc_title' in item
                      ? {
                          idx: item.cc_idx,
                          title: item.cc_title,
                        }
                      : {
                          idx: item.ac_idx,
                          title: item.ac_title,
                        };
                  const findItem =
                    typeof selectDetail.find(v => v === _Item.idx) === 'string';
                  return (
                    <TouchableOpacity
                      key={_Item.idx}
                      style={styles.checkBoxTouch}
                      onPress={() => {
                        if (findItem) {
                          setSelectDetail(prev =>
                            prev.filter(v => v !== _Item.idx),
                          );
                        } else {
                          setSelectDetail(prev => [...prev, _Item.idx]);
                        }
                      }}>
                      <CheckBoxImage isBox isOn={findItem} />
                      <Text
                        style={styles.marginLeft15}
                        fontSize={`${14 * fontSize}`}>
                        {`${_Item.title}`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <Line isGray style={styles.marginVertical35} />

                <Text fontSize={`${12 * fontSize}`} medium>
                  {t('carHistoryInformation')}
                </Text>
                {carHistoryInformation.list.map(item => {
                  const _Item =
                    'cc_title' in item
                      ? {
                          idx: item.cc_idx,
                          title: item.cc_title,
                        }
                      : {
                          idx: item.ac_idx,
                          title: item.ac_title,
                        };
                  const findItem =
                    typeof selectHistory.find(v => v === _Item.idx) ===
                    'string';
                  return (
                    <TouchableOpacity
                      style={styles.checkBoxTouch}
                      key={_Item.idx}
                      onPress={() => {
                        if (findItem) {
                          setSelectHistory(prev =>
                            prev.filter(v => v !== _Item.idx),
                          );
                        } else {
                          setSelectHistory(prev => [...prev, _Item.idx]);
                        }
                      }}>
                      <CheckBoxImage isBox isOn={findItem} />
                      <Text
                        style={styles.marginLeft15}
                        fontSize={`${14 * fontSize}`}>
                        {`${_Item.title}`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <Line isGray style={styles.marginVertical35} />

                {/* 도어 갯수 */}
                <View style={styles.marginBottom25}>
                  <Text
                    fontSize={`${12 * fontSize}`}
                    medium
                    style={{marginBottom: getHeightPixel(5)}}>
                    {t('ownerChangeHistory')}
                  </Text>
                  <View style={styles.betweenView}>
                    <_Button
                      isOn={product.pt_owner === 'Y'}
                      setIsOn={() => onChangeProduct('pt_owner', 'Y')}
                      text={t('yes')}
                    />
                    <_Button
                      isOn={product.pt_owner === 'N'}
                      setIsOn={() => onChangeProduct('pt_owner', 'N')}
                      text={t('no')}
                    />
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
  betweenRowDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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

function productSendData(product: ProductTypes): any {
  //  흑흑 필요한 값만 보내고
  if (product.categoryMenu === 'car') {
    return {
      pt_title: product.title,
      pt_file: product.imageFile,
      pt_cate: findCategory(product.categoryMenu),
      pt_tag: product.tag?.split(' ').join(','),
      pt_grade: findTier(product.tier),
      pt_price: product.price,
      pt_price_check: product.isNego ? 'Y' : 'N',
      pt_location: product.carLocation?.lc_title,
      pt_lat: product.carLocation?.lc_lat,
      pt_lng: product.carLocation?.lc_lng,
      pt_detail: product.content,
      pt_brand: product.pt_brand,
      pt_model: product.pt_model,
      pt_model_detail: product.pt_model_datail,
      pt_color: product.pt_color,
      pt_year: product.pt_year,
      pt_kilo: product.pt_kilo,
      pt_disp: product.pt_disp,
      pt_fuel: product.pt_fuel,
      pt_gear: product.pt_gear,
      pt_door: product.pt_door,
      pt_number: product.pt_number,
      pt_detail_option: product.pt_detail_option,
      pt_history: product.pt_history,
      pt_owner: product.pt_owner,
    };
  } else if (product.categoryMenu === 'motorcycle') {
    return {
      pt_title: product.title,
      pt_file: product.imageFile,
      pt_cate: findCategory(product.categoryMenu),
      pt_tag: product.tag?.split(' ').join(','),
      pt_grade: findTier(product.tier),
      pt_price: product.price,
      pt_price_check: product.isNego ? 'Y' : 'N',
      pt_location: product.carLocation?.lc_title,
      pt_lat: product.carLocation?.lc_lat,
      pt_lng: product.carLocation?.lc_lng,
      pt_detail: product.content,
      pt_number: product.pt_number,
      pt_detail_option: product.pt_detail_option,
      pt_history: product.pt_history,
      pt_owner: product.pt_owner,
      pt_brand: product.pt_brand,
      pt_model: product.pt_model,
      pt_color: product.pt_color,
      pt_year: product.pt_year,
      pt_kilo: product.pt_kilo,
      pt_disp: product.pt_disp,
      pt_fuel: product.pt_fuel,
    };
  } else {
    return {
      pt_title: product.title,
      pt_file: product.imageFile,
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
    };
  }
}

function productApiSelector(
  isEdit: boolean,
  categoryMenuName: categoryMenuTypes['menu'] | null,
) {
  let result = '';
  if (categoryMenuName === 'car') {
    result = 'product_car_';
  } else if (categoryMenuName === 'motorcycle') {
    result = 'product_auto_';
  } else {
    result = 'product_';
  }
  if (isEdit) {
    result += 'modify.php';
  } else {
    result += 'add.php';
  }
  return result;
}
