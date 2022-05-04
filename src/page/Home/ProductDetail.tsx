import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BoldText,
  DarkBlueText,
  GrayText,
  MediumText,
  Text,
  WhiteText,
} from '@/Components/Global/text';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useTranslation} from 'react-i18next';
import {useAppSelector, useCallbackNavigation} from '@/Hooks/CustomHook';
import ImageSwiper from '@/Components/Home/ImageSwiper';
import ProductDetailShop from '@/Components/Home/ProductDetailShop';
import ViewLikeCount from '@/Components/Home/ViewLikeCount';
import RightBlackIcon from '@assets/image/right_direction.png';
import Theme from '@/assets/global/Theme';
import Line from '@/Components/Global/Line';
import ShopSellProduct from '@/Components/Home/ShopSellProduct';
import pressLikeIcon from '@assets/image/dislike.png';
import {Shadow} from 'react-native-shadow-2';
import BackWhiteIcon from '@assets/image/back_white.png';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import SearchWhiteIcon from '@assets/image/search_white.png';
import SearchBlackIcon from '@assets/image/search_black.png';
import ShareWhiteIcon from '@assets/image/share_white.png';
import ShareIcon from '@assets/image/share.png';
import DocumentGrayIcon from '@assets/image/document_gray.png';
import ArrowRightNewIcon from '@assets/image/arrow_right_new.png';
import {
  AlertButton,
  brPrice,
  getHitSlop,
  productTimeSetting,
  viewCountCheck,
} from '@/Util/Util';
import Screen, {ProductDetailProps} from '@/Types/Screen/Screen';
import useBoolean from '@/Hooks/useBoolean';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {
  ProduetDetailApiType,
  ProduetDetailOtherApiType,
} from '@/Types/Components/HomeTypes';
import Loading from '@/Components/Global/Loading';
import {useIsFocused} from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import ProductDetailOptionBox from '@/Components/Home/ProductDetailOptionBox';

export default function ProductDetail({
  navigation,
  route: {params},
}: ProductDetailProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);
  const ref = useRef<any>(null);

  const isFocused = useIsFocused();
  const isCar = params?.pt_cate === '18';
  const isMotor = params?.pt_cate === '19';

  const {
    data,
    isLoading,
    isError,
    errorMessage,
    getData: detailGetData,
  } = useApi<ProduetDetailApiType['T'], ProduetDetailApiType['D']>(
    null,
    isMotor
      ? 'product_auto_detail.php'
      : isCar
      ? 'product_car_detail.php'
      : 'product_detail.php',
    {
      mt_idx: user.mt_idx,
      pt_idx: params.pt_idx,
    },
    {
      isFirst: false,
    },
  );

  const {
    data: otherData,
    isLoading: otherIsLoading,
    isError: otherIsError,
    errorMessage: otherErrorMessage,
    getData,
  } = useApi<ProduetDetailOtherApiType['T'], ProduetDetailOtherApiType['D']>(
    null,
    'product_detail_other.php',
    {
      mt_idx: user.mt_idx,
      pt_idx: params.pt_idx,
    },
    {isFirst: false},
  );

  const {PostAPI: likeApi} = usePostSend<{
    mt_idx: string;
    pt_idx: string;
  }>('product_like.php', {
    mt_idx: user?.mt_idx ?? '0',
    pt_idx: params.pt_idx,
  });

  const {value: isChange, on: onIsChange, off: offIsChange} = useBoolean(false);
  const [isLike, setisLike] = useState('N');
  const onPressTierGuide = useCallbackNavigation('ProductTierGuide');
  const onPressReport = useCallbackNavigation('ReportDetail', {
    reportType: 'prohibited',
    pt_idx: params.pt_idx,
  });
  const onPressShop = useCallback(() => {
    if (data?.sell_type === '0') {
      navigation.navigate('BusinessProfile', {
        sell_idx: data?.sell_idx as string, // 수정필요
        sell_type: data?.sell_type as '0' | '1',
      });
    } else if (data?.sell_type === '1') {
      navigation.navigate('ProfileHome', {
        sell_idx: data?.sell_idx,
      });
    }
  }, [data?.sell_type]);
  const onPressChattingTrade = useCallbackNavigation('ChattingDetail');
  const onPressSearch = useCallbackNavigation('Search');
  const onPressUserReport = useCallbackNavigation('ReportCategory', {
    pt_idx: params.pt_idx,
  });
  const onPressLike = useCallback(() => {
    likeApi().then((res: any) => {
      if (res?.result === 'false' && res?.msg) {
        return AlertButton(res.msg);
      } else {
        if (res?.data?.like === 'Y' || res?.data?.like === 'N')
          setisLike(res.data.like);
      }
    });
  }, []);
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > getHeightPixel(270)) {
        onIsChange();
      } else {
        offIsChange();
      }
    },
    [isChange],
  );

  const Header = useCallback(() => {
    if (!data) {
      return null;
    }
    return (
      <View
        style={[
          styles._headerView,
          isChange && {
            display: 'flex',
          },
        ]}>
        <Shadow>
          <>
            <View style={styles._headerBetween}>
              <View style={styles._headerRow}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  hitSlop={getHitSlop(5)}
                  style={styles.marginRight10}>
                  <Image
                    source={BackBlackBoxIcon}
                    style={styles.backWhiteImage}
                  />
                </TouchableOpacity>
                <Text medium fontSize={`${20 * fontSize}`}>
                  {t('productInformation')}
                </Text>
              </View>
              <View style={styles._headerRow}>
                <TouchableOpacity
                  style={styles.marginRight10}
                  onPress={onPressSearch}
                  hitSlop={getHitSlop(5)}>
                  <Image
                    resizeMode="contain"
                    source={SearchBlackIcon}
                    style={styles.searchWhiteImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity hitSlop={getHitSlop(5)}>
                  <Image
                    resizeMode="contain"
                    source={ShareIcon}
                    style={styles.shareWhiteImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles._headerEndView}>
              <View style={styles._headerProductImageView}>
                <Image
                  resizeMethod="resize"
                  source={
                    data?.file?.length > 0
                      ? {
                          uri: data.file[0],
                        }
                      : require('@assets/image/none_image_l.png')
                  }
                  style={styles._headerProductImage}
                />
              </View>
              <View style={styles.marginLeft15}>
                <Text
                  bold
                  fontSize={`${14 * fontSize}`}
                  numberOfLines={1}
                  style={{width: getPixel(250)}}>
                  {data?.pt_title}
                </Text>
                <DarkBlueText bold fontSize={`${14 * fontSize}`}>
                  {brPrice(data?.pt_price ?? '')}
                </DarkBlueText>
              </View>
            </View>
          </>
        </Shadow>
      </View>
    );
  }, [isChange, data]);

  const InnerHeader = useCallback(() => {
    // 이미지 스와이퍼와 그 상단 이모티콘
    if (!data) {
      return null;
    }
    return (
      <View style={styles.swiperView}>
        <ImageSwiper
          imageArray={data?.file && Array.isArray(data.file) ? data.file : []}
          setImageArray={undefined}
          width={getPixel(360)}
          height={getHeightPixel(250)}
        />
        <TouchableOpacity
          style={styles.backWhiteTouch}
          onPress={() => {
            navigation.goBack();
          }}
          hitSlop={getHitSlop(5)}>
          <Image source={BackWhiteIcon} style={styles.backWhiteImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchWhiteTouch}
          onPress={onPressSearch}
          hitSlop={getHitSlop(5)}>
          <Image
            resizeMode="contain"
            source={SearchWhiteIcon}
            style={styles.searchWhiteImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareWhiteTouch}
          hitSlop={getHitSlop(5)}>
          <Image
            resizeMode="contain"
            source={ShareWhiteIcon}
            style={styles.shareWhiteImage}
          />
        </TouchableOpacity>
      </View>
    );
  }, [data]);

  useEffect(() => {
    if (params?.pt_cate && params?.pt_idx) {
      if (isFocused) {
        getData();
        detailGetData();
      }
    } else {
      AlertButton(t('detailPageNoneParams'));
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    if (data?.my_like) {
      setisLike(data.my_like);
    }
  }, [data]);
  if (isError && !ref.current) {
    // 에러처리부분
    ref.current = true;
    AlertButton(errorMessage);
    navigation.goBack();
    return null;
  }

  if (isLoading || data === null || otherIsLoading || otherData === null) {
    return <Loading />;
  } else {
    const title = data.pt_title;
    const location = `${data.pt_location_detail} ${data.pt_location} / - ${data.dist}km`;
    const classAndTimeText = `${data.pt_grade} / ${productTimeSetting(
      data?.pt_time,
      data?.pt_time_type,
    )}`;
    const viewCount = viewCountCheck(data?.view_count ?? 0);
    const likeCount = viewCountCheck(data?.like_count ?? 0);
    const content = data.pt_detail;

    const price = brPrice(data?.pt_price);

    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header />
        <ScrollView onScroll={onScroll}>
          <InnerHeader />
          <ProductDetailShop
            shopName={data?.sell_name}
            shopSubTitle={data.sell_memo}
            onPress={onPressShop}
            image={
              data?.sell_profile
                ? {
                    uri: data.sell_profile,
                  }
                : undefined
            }
          />
          <View style={styles.contentView}>
            <MediumText fontSize={`${18 * fontSize}`}>{title}</MediumText>
            <View style={styles.subContentView}>
              <GrayText fontSize={`${12 * fontSize}`}>{location}</GrayText>
              <View style={styles.betweenView}>
                <Text fontSize={`${12 * fontSize}`}>{classAndTimeText}</Text>
                <ViewLikeCount likeCount={likeCount} viewCount={viewCount} />
              </View>
            </View>
            {/* 자동차 또는 원동기  */}
            {(isCar || isMotor) && (
              <>
                <DarkBlueText
                  style={styles.vehiclePriceText}
                  bold
                  fontSize={`${22 * fontSize}`}>
                  {brPrice(data.pt_price, {isPadding: true})}
                </DarkBlueText>

                <TouchableOpacity
                  onPress={onPressShop}
                  style={styles.sellerInfoTouch}>
                  <View style={styles.rowCenter}>
                    <AutoHeightImage
                      source={DocumentGrayIcon}
                      width={getPixel(14)}
                      style={styles.marginRight5}
                    />
                    <Text fontSize={`${12 * fontSize}`} medium>
                      {t('sellerInformation')}
                    </Text>
                  </View>

                  <AutoHeightImage
                    source={ArrowRightNewIcon}
                    width={getPixel(20)}
                  />
                </TouchableOpacity>
                <View style={styles.lineView}>
                  <Line style={styles.line} height={getHeightPixel(10)} />
                </View>
                {/* 차량기본정보 */}
                {data?.car_option && (
                  <>
                    <Text
                      fontSize={`${18 * fontSize}`}
                      medium
                      style={styles.optionTitle}>
                      {t('carBasicInformation')}
                    </Text>
                    <ProductDetailOptionBox dataArray={data.car_option} />
                  </>
                )}
                {/* 차량 이력정보 */}
                {data?.car_history && (
                  <>
                    <Text
                      fontSize={`${18 * fontSize}`}
                      medium
                      style={styles.optionTitle}>
                      {t('carHistoryInformation')}
                    </Text>
                    <ProductDetailOptionBox
                      dataArray={data.car_history}
                      fieldName="history"
                    />
                  </>
                )}
                {/* 차량 포함 옵션 */}
                {data?.car_detail &&
                  data?.car_detail?.filter(v => v.detail_type === 'Y').length >
                    0 && (
                    <>
                      <Text
                        fontSize={`${18 * fontSize}`}
                        medium
                        style={styles.optionTitle}>
                        {t('includedInformation')}
                      </Text>
                      <ProductDetailOptionBox
                        dataArray={data?.car_detail?.filter(
                          v => v.detail_type === 'Y',
                        )}
                        fieldName="detail"
                        isOption
                      />
                    </>
                  )}
                {/* 오토바이 기본정보 */}
                {data?.auto_option && (
                  <>
                    <Text
                      fontSize={`${18 * fontSize}`}
                      medium
                      style={styles.optionTitle}>
                      {t('carBasicInformation')}
                    </Text>
                    <ProductDetailOptionBox dataArray={data.auto_option} />
                  </>
                )}
                {/* 오토바이 이력정보 */}
                {data?.auto_history && (
                  <>
                    <Text
                      fontSize={`${18 * fontSize}`}
                      medium
                      style={styles.optionTitle}>
                      {t('carHistoryInformation')}
                    </Text>
                    <ProductDetailOptionBox
                      dataArray={data.auto_history}
                      fieldName="history"
                    />
                  </>
                )}
                {/* 오토바이 포함 옵션 */}
                {data?.auto_detail &&
                  data?.auto_detail?.filter(v => v.detail_type === 'Y').length >
                    0 && (
                    <>
                      <Text
                        fontSize={`${18 * fontSize}`}
                        medium
                        style={styles.optionTitle}>
                        {t('includedInformation')}
                      </Text>
                      <ProductDetailOptionBox
                        dataArray={data?.auto_detail?.filter(
                          v => v.detail_type === 'Y',
                        )}
                        fieldName="detail"
                        isOption
                      />
                    </>
                  )}
                <Text
                  fontSize={`${14 * fontSize}`}
                  medium
                  style={styles.carInfomationLastText}>
                  {t('moreInformation')}
                </Text>
              </>
            )}
            <Text fontSize={`${14 * fontSize}`}>{content}</Text>
          </View>
          <View>
            <Line height={1} />
            <TouchableOpacity
              onPress={onPressTierGuide}
              style={styles.tierGuideView}>
              <MediumText fontSize={`${14 * fontSize}`}>
                {t('tierGuide')}
              </MediumText>
              <Image source={RightBlackIcon} style={styles.rightImage} />
            </TouchableOpacity>
            <Line height={1} />
            <TouchableOpacity
              onPress={onPressUserReport}
              style={styles.tierGuideView}>
              <MediumText fontSize={`${14 * fontSize}`}>
                {t('ReportUser')}
              </MediumText>
              <Image source={RightBlackIcon} style={styles.rightImage} />
            </TouchableOpacity>
            <Line height={1} />
            <TouchableOpacity
              onPress={onPressReport}
              style={styles.tierGuideView}>
              <MediumText fontSize={`${14 * fontSize}`}>
                {t('ReportPost')}
              </MediumText>
              <Image source={RightBlackIcon} style={styles.rightImage} />
            </TouchableOpacity>
          </View>
          <Line height={getHeightPixel(9)} />
          <ShopSellProduct
            shopName={data?.sell_name}
            productList={Array.isArray(otherData) ? otherData : undefined}
          />
        </ScrollView>
        <Shadow distance={5}>
          <View style={styles.footerView}>
            <View style={styles.footerLeftView}>
              <TouchableOpacity
                onPress={onPressLike}
                style={styles.pressLikeView}>
                <Image
                  source={
                    isLike === 'Y'
                      ? require('@assets/image/love_white.png')
                      : require('@assets/image/dislike.png')
                  }
                  style={styles.pressLikeImage}
                />
              </TouchableOpacity>
              <View style={styles.footerContentView} />
              <View>
                <BoldText
                  fontSize={`${16 * fontSize}`}
                  color={Theme.color.darkBlue}>
                  {price}
                </BoldText>
                <Text
                  color={
                    data.pt_price_check === 'Y'
                      ? Theme.color.aqua_00
                      : Theme.color.red
                  }
                  fontSize={`${12 * fontSize}`}>
                  {data.pt_price_check === 'Y' ? t('nego') : t('noPriceOffer')}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onPressChattingTrade}
              style={styles.footerRightTouch}>
              <WhiteText fontSize={`${14 * fontSize}`}>
                {t('tradeInChat')}
              </WhiteText>
            </TouchableOpacity>
          </View>
        </Shadow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carInfomationLastText: {
    marginTop: getHeightPixel(30),
    marginBottom: getHeightPixel(10),
  },
  optionTitle: {
    marginVertical: getHeightPixel(20),
  },
  line: {
    position: 'absolute',
    left: -getPixel(16),
    top: 0,
  },
  lineView: {
    height: getHeightPixel(10),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerInfoTouch: {
    width: getPixel(328),
    height: getHeightPixel(36),
    borderWidth: 0.4,
    borderColor: Theme.color.gray,
    borderRadius: 4,
    flexDirection: 'row',
    marginVertical: getHeightPixel(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: getPixel(11),
  },
  marginRight5: {
    marginRight: getPixel(5),
  },
  vehiclePriceText: {
    marginTop: getHeightPixel(10),
  },
  _headerEndView: {
    flexDirection: 'row',
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
    marginBottom: getHeightPixel(20),
  },
  marginLeft15: {
    marginLeft: getPixel(15),
  },
  _headerProductImageView: {
    borderRadius: 8,
    overflow: 'hidden',
    width: getPixel(40),
    height: getPixel(40),
  },
  _headerProductImage: {
    width: getPixel(40),
    height: getPixel(40),
  },
  marginRight10: {
    marginRight: getPixel(10),
  },
  _headerRow: {flexDirection: 'row', alignItems: 'center'},
  _headerBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: getHeightPixel(50),
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
  },
  _headerView: {
    minHeight: getHeightPixel(100),
    width: getPixel(360),
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: Theme.color.white,
  },
  footerContentView: {
    backgroundColor: Theme.color.gray,
    height: getHeightPixel(38),
    width: getPixel(1),
    marginLeft: getPixel(16),
    marginRight: getPixel(12),
  },
  shareWhiteTouch: {
    position: 'absolute',
    top: getHeightPixel(13),
    right: getPixel(16),
    width: getPixel(24),
    height: getPixel(24),
  },
  searchWhiteTouch: {
    position: 'absolute',
    top: getHeightPixel(13),
    right: getPixel(50),
    width: getPixel(24),
    height: getPixel(24),
  },
  backWhiteTouch: {
    position: 'absolute',
    top: getHeightPixel(13),
    left: getPixel(16),
    width: getPixel(30),
    height: getPixel(30),
  },
  shareWhiteImage: {
    width: getPixel(24),
    height: getPixel(24),
  },
  searchWhiteImage: {
    width: getPixel(24),
    height: getPixel(24),
  },
  backWhiteImage: {
    width: getPixel(30),
    height: getPixel(30),
  },
  footerRightTouch: {
    width: getPixel(150),
    height: getHeightPixel(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getPixel(8),
    backgroundColor: Theme.color.blue_3D,
  },
  footerLeftView: {flexDirection: 'row', alignItems: 'center'},
  pressLikeImage: {
    width: getPixel(30),
    height: getPixel(30),
  },
  pressLikeView: {
    width: getPixel(30),
    height: getPixel(30),
  },
  footerView: {
    width: getPixel(360),
    height: getHeightPixel(61),
    flexDirection: 'row',
    paddingHorizontal: getPixel(16),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightImage: {
    width: getPixel(6.67),
    height: getPixel(12),
  },
  tierGuideView: {
    width: getPixel(360),
    height: getHeightPixel(58),
    paddingHorizontal: getPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betweenView: {flexDirection: 'row', justifyContent: 'space-between'},
  subContentView: {
    marginTop: getHeightPixel(12),
    marginBottom: getHeightPixel(30),
  },
  contentView: {
    marginHorizontal: getPixel(16),
    width: getPixel(328),
    marginTop: getHeightPixel(15),
    marginBottom: getHeightPixel(30),
  },
  swiperView: {
    width: getPixel(360),
    height: getHeightPixel(250),
  },
});
