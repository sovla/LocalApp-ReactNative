import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import {AlertButton, brPrice, getHitSlop, viewCountCheck} from '@/Util/Util';
import Screen, {ProductDetailProps} from '@/Types/Screen/Screen';
import useBoolean from '@/Hooks/useBoolean';
import useApi from '@/Hooks/useApi';
import {ProduetDetailApiType} from '@/Types/Components/HomeTypes';
import Loading from '@/Components/Global/Loading';

export default function ProductDetail({
  navigation,
  route: {params},
}: ProductDetailProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);

  const {data, isLoading, isError, errorMessage} = useApi<
    ProduetDetailApiType['T'],
    ProduetDetailApiType['D']
  >(null, 'product_detail.php', {
    mt_idx: user.mt_idx,
    pt_idx: params.pt_idx,
  });
  const [imageArray, setImageArray] = useState<Array<any>>([
    require('@assets/image/dummy_i.png'),
    require('@assets/image/dummy_i.png'),
    require('@assets/image/dummy_i.png'),
    require('@assets/image/dummy_i.png'),
    require('@assets/image/dummy_i.png'),
    require('@assets/image/dummy_i.png'),
    require('@assets/image/dummy_i.png'),
  ]);

  const {value: isChange, on: onIsChange, off: offIsChange} = useBoolean(false);

  const onPressTierGuide = useCallbackNavigation('ProductTierGuide');
  const onPressReport = useCallbackNavigation<Screen['ReportDetail']>(
    'ReportDetail',
    {
      reportType: 'prohibited',
    },
  );
  const onPressShop = useCallbackNavigation('BusinessProfile');
  const onPressChattingTrade = useCallbackNavigation('ChattingDetail');
  const onPressSearch = useCallbackNavigation('Search');
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
                  source={require('@assets/image/dummy_i.png')}
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
    return (
      <View style={styles.swiperView}>
        <ImageSwiper
          imageArray={data?.file && Array.isArray(data.file) ? data.file : []}
          setImageArray={setImageArray}
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
  if (isError) {
    AlertButton(errorMessage);
    navigation.goBack();
    return null;
  }

  if (isLoading || data === null) {
    return <Loading />;
  } else {
    const title = data.pt_title;
    const location = `${data.pt_location_detail} ${data.pt_location} / - ${data.dist}km`;
    const classText = 'Classe A / há 3 dias';
    const viewCount = viewCountCheck(data?.view_count ?? 0);
    const likeCount = viewCountCheck(data?.like_count ?? 0);
    const content = data.pt_detail;

    const price = brPrice(data?.pt_price ?? '');

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
                <Text fontSize={`${12 * fontSize}`}>{classText}</Text>
                <ViewLikeCount likeCount={likeCount} viewCount={viewCount} />
              </View>
            </View>
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
              onPress={onPressReport}
              style={styles.tierGuideView}>
              <MediumText fontSize={`${14 * fontSize}`}>
                {t('ReportPost')}
              </MediumText>
              <Image source={RightBlackIcon} style={styles.rightImage} />
            </TouchableOpacity>
          </View>
          <Line height={getHeightPixel(9)} />
          <ShopSellProduct shopName="Americans" />
        </ScrollView>
        <Shadow distance={5}>
          <View style={styles.footerView}>
            <View style={styles.footerLeftView}>
              <TouchableOpacity style={styles.pressLikeView}>
                <Image source={pressLikeIcon} style={styles.pressLikeImage} />
              </TouchableOpacity>
              <View style={styles.footerContentView} />
              <View>
                <BoldText
                  fontSize={`${16 * fontSize}`}
                  color={Theme.color.darkBlue}>
                  {price}
                </BoldText>
                <Text color={Theme.color.aqua_00} fontSize={`${12 * fontSize}`}>
                  {t('nego')}
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
    marginBottom: getHeightPixel(15),
  },
  swiperView: {
    width: getPixel(360),
    height: getHeightPixel(250),
  },
});
