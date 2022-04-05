import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import MapMarkerIcon from '@assets/image/map-marker_indigo.png';
import {BoldText, GrayText, MediumText, Text} from '@/Components/Global/text';
import Theme from '@/assets/global/Theme';
import * as Progress from 'react-native-progress';

export default function LocationChange(): JSX.Element {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const location = 'Bom retiro';
  const selectArea = '20km';
  const [selectRange, setSelectRange] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {
          toValue: {x: 100, y: 0},
          useNativeDriver: false,
        }, // Back to zero
      ).start();
    },
  });
  return (
    <View>
      <Header title={t('locationChangeTitle')} />
      <View
        style={{
          width: getPixel(360),
          height: getHeightPixel(338),
          backgroundColor: '#0008',
        }}></View>
      <View style={styles.markerView}>
        <Image source={MapMarkerIcon} style={styles.markerImage} />
        <View
          style={{
            marginLeft: getPixel(5),
          }}>
          <Text fontSize={`${16 * fontSize}`}>
            Rua Três Rios , Bom Retiro, São Paulo
          </Text>
          <GrayText fontSize={`${12 * fontSize}`}>
            São Paulo - SP, Brasil
          </GrayText>
        </View>
      </View>
      <View style={styles.locationAreaView}>
        <BoldText fontSize={`${14 * fontSize}`}>
          {t('locationAreaSelect')}
        </BoldText>
        <View style={styles.locationTextView}>
          <Text fontSize={`${14 * fontSize}`}>
            {location}
            {t('at')}
          </Text>
          <BoldText fontSize={`${14 * fontSize}`}>
            {selectArea + t('range')}
          </BoldText>

          <Text fontSize={`${14 * fontSize}`}>{t('by')}</Text>
        </View>
        <View
          style={{
            width: getPixel(328),
            height: getHeightPixel(10),
            backgroundColor: Theme.color.whiteGray_EE,
            borderRadius: getPixel(8),
          }}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[pan.getLayout(), styles.progressIcon]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressIcon: {
    width: getPixel(20),
    height: getPixel(20),
    backgroundColor: Theme.color.white,
    borderWidth: 3,
    borderColor: Theme.color.blue,
    borderRadius: 100,
  },
  locationTextView: {
    flexDirection: 'row',
    marginTop: getHeightPixel(10),
    marginBottom: getHeightPixel(20),
  },
  locationAreaView: {
    marginTop: getHeightPixel(27),
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  markerImage: {
    width: getPixel(14),
    height: getPixel(18),
    marginTop: getHeightPixel(5),
  },
  markerView: {
    flexDirection: 'row',
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(26),
    paddingBottom: getHeightPixel(20),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
});
