import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import {OnBoardingProps} from '@/Types/Screen/Screen';

import Logo2Image from '@assets/image/logo2.png';
import CityImage from '@assets/image/city.png';
import HandshakeImage from '@assets/image/handshake.png';
import MapImage from '@assets/image/map.png';
import {onScrollSlide} from '@/Util/Util';
import KeywordAlarmImage from '@assets/image/keyword_alarm.png';
import ShoppingImage from '@assets/image/shopping.png';
import CommissionImage from '@assets/image/commission.png';

export default function OnBoarding({navigation}: OnBoardingProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [page, setPage] = useState(0);

  const color = ['#F3D3DE', '#F5C634', '#716EF3', '#88D9E0'];
  const onPressNext = () => {
    // 처음이면?

    navigation.navigate('AppPermission');
  };
  return (
    <View style={styles.container}>
      <View style={styles.betweenView}>
        <TouchableOpacity onPress={onPressNext} style={styles.skipButton}>
          <Text fontSize={`${16 * fontSize}`} color={color[page]}>
            {t('Skip')}
          </Text>
        </TouchableOpacity>
        <View style={styles.dotView}>
          {[1, 2, 3, 4].map((v, i) => {
            return (
              <View key={i} style={page === i ? styles.onDot : styles.offDot} />
            );
          })}
        </View>
      </View>
      <FlatList
        data={[1, 2, 3, 4]}
        style={{
          width: '100%',
        }}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={e => {
          onScrollSlide(e, setPage, getPixel(360));
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              disabled={index !== 3}
              onPress={onPressNext}
              activeOpacity={0.75}
              style={{
                width: getPixel(360),
                height: getHeightPixel(720),
                backgroundColor: color[index],
              }}>
              <Image source={Logo2Image} style={styles.logoImage} />
              <Image source={CityImage} style={styles.cityImage} />

              {index === 0 && (
                <>
                  <Image
                    source={HandshakeImage}
                    style={styles.handshakeImage}
                  />
                  <Image source={MapImage} style={styles.mapImage} />
                </>
              )}
              {index === 1 && (
                <Image
                  source={KeywordAlarmImage}
                  style={styles.keywordAlarmImage}
                />
              )}
              {index === 2 && (
                <Image source={ShoppingImage} style={styles.shoppingImage} />
              )}
              {index === 3 && (
                <Image
                  source={CommissionImage}
                  style={styles.commissionImage}
                />
              )}
              <View style={styles.contentView}>
                <WhiteText bold fontSize={`${28 * fontSize}`}>
                  {t(`onBoardingGuide${index * 2 + 1}`)}
                </WhiteText>
                <WhiteText fontSize={`${16 * fontSize}`}>
                  {t(`onBoardingGuide${index * 2 + 2}`)}
                </WhiteText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
  },
  shoppingImage: {
    width: getPixel(238),
    height: getPixel(238),
    position: 'absolute',
    top: getHeightPixel(115),
    left: getPixel(72),
    zIndex: 105,
  },
  commissionImage: {
    width: getPixel(288),
    height: getPixel(288),
    position: 'absolute',
    top: getHeightPixel(110),
    left: getPixel(36),
    zIndex: 105,
  },
  keywordAlarmImage: {
    width: getPixel(268),
    height: getPixel(268),
    position: 'absolute',
    top: getHeightPixel(100),
    left: getPixel(46),
    zIndex: 105,
  },
  contentView: {
    position: 'absolute',
    left: getPixel(36),
    top: getHeightPixel(412),
    zIndex: 100,
  },
  dotView: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  offDot: {
    width: getPixel(8),
    height: getPixel(8),
    borderRadius: 100,
    backgroundColor: Theme.color.white + '40',
    marginLeft: getPixel(5),
    zIndex: 100,
  },
  onDot: {
    width: getPixel(13),
    height: getPixel(13),
    borderRadius: 100,
    backgroundColor: Theme.color.white,
    marginLeft: getPixel(5),
    zIndex: 100,
  },
  betweenView: {
    position: 'absolute',
    top: getHeightPixel(600),
    left: getPixel(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getPixel(360 - 32 - 32),
    zIndex: 100,
  },
  skipButton: {
    width: getPixel(91),
    height: getHeightPixel(30),
    backgroundColor: Theme.color.white,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 100,
  },
  mapImage: {
    width: getPixel(182),
    height: getPixel(182),
    position: 'absolute',
    top: getHeightPixel(260),
    left: getPixel(180),
    zIndex: 105,
  },
  handshakeImage: {
    width: getPixel(448),
    height: getHeightPixel(152),
    position: 'absolute',
    top: getHeightPixel(105),
    left: -getPixel(50),
    zIndex: 100,
  },
  cityImage: {
    width: getPixel(360),
    height: getHeightPixel(123),
    position: 'absolute',
    left: 0,
    top: getHeightPixel(260),
    zIndex: 100,
  },
  logoImage: {
    width: getPixel(120),
    height: getPixel(26.46),
    position: 'absolute',
    top: getHeightPixel(36),
    left: getPixel(36),
    zIndex: 100,
  },
});
