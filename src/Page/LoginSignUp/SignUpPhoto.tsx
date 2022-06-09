import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {SignUpPhotoProps} from '@/Types/Screen/Screen';

import CameraRoll from '@react-native-community/cameraroll';
import Photo from '@Components/LoginSignUp/Photo';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export default function SignUpPhoto({navigation}: SignUpPhotoProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [firstImage, setFirstImage] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [imageArray, setImageArray] = useState<any>([1]);
  const [number, setNumber] = useState<number>(10000);
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: number,
    }).then(value => {
      setImageArray(value.edges);
      setNumber((prev: number) => {
        if (value.page_info.has_next_page) {
          return prev + 10000;
        } else {
          return prev;
        }
      });
    });
  };

  const onPressComplete = () => {
    navigation.navigate('SignUpForm', {
      image:
        selectNumber === 1
          ? firstImage
          : {
              mime: imageArray[selectNumber - 1]?.node?.type,
              path: imageArray[selectNumber - 1]?.node?.image?.uri,
            },
    });
  };

  const _renderItem = useCallback(
    ({item, index}) => {
      const select = index + 1 === selectNumber;
      if (index === 0) {
        return (
          <TouchableOpacity
            onPress={() => setSelectNumber(index + 1)}
            style={styles.firstTouchImage}>
            <Photo
              returnFn={image => {
                setFirstImage(image);
                setSelectNumber(1);
              }}
              width={getPixel(106)}
              height={getHeightPixel(112)}
              selectImage={firstImage}
            />
            {firstImage && (
              <View style={select ? styles.selectDot : styles.noneSelectDot}>
                <WhiteText fontSize={`${12 * fontSize}`}>1</WhiteText>
              </View>
            )}
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={() => setSelectNumber(index + 1)}
          key={index}
          style={{
            ...styles.touchImage,
            marginRight: (index + 1) % 3 !== 0 ? getPixel(4) : 0,
          }}>
          <View style={select ? styles.selectDot : styles.noneSelectDot}>
            <WhiteText fontSize={`${12 * fontSize}`}>1</WhiteText>
          </View>
          <Image
            style={styles.imageBox}
            source={{
              uri: item.node.image.uri,
            }}
          />
        </TouchableOpacity>
      );
    },
    [selectNumber],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  useLayoutEffect(() => {
    getPhotos();
    return () => {};
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header title={t('allPhoto')}>
        <TouchableOpacity onPress={onPressComplete}>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>
      <FlatList
        data={imageArray}
        numColumns={3}
        keyExtractor={keyExtractor}
        style={{
          paddingTop: getHeightPixel(20),
          marginHorizontal: getPixel(16),
          paddingBottom: getHeightPixel(40),
        }}
        getItemLayout={(data, index) => ({
          length: getPixel(110),
          offset: getHeightPixel(112) * index,
          index,
        })}
        onEndReached={() => {
          getPhotos();
        }}
        onEndReachedThreshold={0.3}
        renderItem={_renderItem}
        maxToRenderPerBatch={25}
        initialNumToRender={25}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  firstTouchImage: {
    width: getPixel(106),
    height: getHeightPixel(112),
    marginRight: getPixel(4),
    marginBottom: getHeightPixel(4),
    borderRadius: 22,
    overflow: 'hidden',
  },
  imageBox: {
    width: getPixel(106),
    height: getHeightPixel(112),
  },
  touchImage: {
    width: getPixel(106),
    height: getHeightPixel(112),
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: getHeightPixel(4),
  },
  noneSelectDot: {
    width: getPixel(18),
    height: getPixel(18),
    backgroundColor: Theme.color.white,
    borderWidth: 1,
    borderColor: Theme.color.gray,
    position: 'absolute',
    top: getHeightPixel(6),
    right: getHeightPixel(6),
    zIndex: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectDot: {
    width: getPixel(18),
    height: getPixel(18),
    backgroundColor: Theme.color.aqua_00,
    position: 'absolute',
    top: getHeightPixel(6),
    right: getHeightPixel(6),
    zIndex: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
