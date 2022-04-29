import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useState} from 'react';
import {ImageSwiperProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {onScrollSlide} from '@/Util/Util';
import Theme from '@/assets/global/Theme';

export default function ImageSwiper({
  imageArray,
  setImageArray,
  width,
  height,
}: ImageSwiperProps): JSX.Element {
  const [dotNumber, setDotNumber] = useState(0);

  const dotArray = new Array(imageArray?.length).fill(1);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        onMomentumScrollEnd={e => onScrollSlide(e, setDotNumber, getPixel(360))}
        style={{width: width}}
        pagingEnabled
        horizontal>
        {Array.isArray(imageArray) &&
          imageArray.map((item, index) => {
            const image = typeof item === 'string' ? {uri: item} : item;
            return (
              <Image source={image} style={{width: width, height: height}} />
            );
          })}
        {(!Array.isArray(imageArray) || imageArray?.length < 1) && (
          <Image
            source={require('@assets/image/none_image_l.png')}
            style={{width, height}}
          />
        )}
      </ScrollView>
      <View style={styles.dotView}>
        {dotArray.map((item, index) => {
          return (
            <View
              style={{
                width: getPixel(7),
                height: getPixel(7),
                borderRadius: 100,
                backgroundColor:
                  index === dotNumber ? Theme.color.white : '#fff5',
                marginRight: index + 1 !== dotArray.length ? getPixel(6) : 0,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotView: {
    position: 'absolute',
    bottom: getHeightPixel(12),
    left: 0,
    justifyContent: 'center',
    width: getPixel(360),
    flexDirection: 'row',
  },
  mainContainer: {flex: 1},
});
