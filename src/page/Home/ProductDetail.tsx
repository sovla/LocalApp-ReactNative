import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BoldText,
  GrayText,
  MediumText,
  Text,
  WhiteText,
} from '@/Components/Global/text';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
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
import SearchWhiteIcon from '@assets/image/search_white.png';
import ShareWhiteIcon from '@assets/image/share_white.png';
import {getHitSlop} from '@/Util/Util';

export default function ProductDetail() {
  const title =
    '아이맥 imac retina 4k 21.5인치 2017 i7 / 램 16gb / 500gb SSD / 판매합니다.';
  const location = 'Bom Retiro, São Paulo / - 1km';
  const classText = 'Classe A / há 3 dias';
  const viewCount = '999+';
  const likeCount = '999+';
  const content =
    '안녕하세요. 새로운 맥 구매로 기존에 사용하던 맥을 처분합니다. 포토샵, 일러스트, 프리미어프로, 파이널컷용으로 적합.​33.78cm(13.3인치) / 애플(ARM) / 실리콘 M1 / 파이어스톰 / APL1102 / 옥타코어 / 운영체제(OS): macOS Big Sur / 2560x1600(WQXGA) / DCI-P3: 지원 / 400nit / IPS(Retina) / 트루톤 / 8GB / SSD / 256GB / 내장그래픽 / M1 7 core / 802.11ax(Wi-Fi 6) / 웹캠(HD) / 썬더볼트3: 2개 / USB 3.1 Type-C / 지문 인식 / Apple T2 / USB-PD / ㅗ형 방향키 / 배터리: 49.9Wh / 충전단자: 타입C';
  const price = 'R$6500.00';
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [imageArray, setImageArray] = useState<Array<any>>([1, 2, 3, 4]);

  const onPressTierGuide = () => {};
  const onPressReport = () => {};
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View style={styles.swiperView}>
          <ImageSwiper
            imageArray={imageArray}
            setImageArray={setImageArray}
            width={getPixel(360)}
            height={getHeightPixel(250)}
          />
          <TouchableOpacity
            style={styles.backWhiteTouch}
            hitSlop={getHitSlop(5)}>
            <Image source={BackWhiteIcon} style={styles.backWhiteImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchWhiteTouch}
            hitSlop={getHitSlop(5)}>
            <Image source={SearchWhiteIcon} style={styles.searchWhiteImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareWhiteTouch}
            hitSlop={getHitSlop(5)}>
            <Image source={ShareWhiteIcon} style={styles.shareWhiteImage} />
          </TouchableOpacity>
        </View>
        <ProductDetailShop
          shopName="Americanas"
          shopSubTitle="Toys, Hobby & Diy"
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
          <TouchableOpacity style={styles.footerRightTouch}>
            <WhiteText fontSize={`${14 * fontSize}`}>
              {t('tradeInChat')}
            </WhiteText>
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
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
