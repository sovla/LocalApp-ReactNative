import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {ProductPhotoProps} from '@/Types/Screen/Screen';

import CameraRoll from '@react-native-community/cameraroll';
import Photo from '@Components/LoginSignUp/Photo';

export default function ProductPhoto({
  navigation,
  route: {params},
}: ProductPhotoProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [imageArray, setImageArray] = useState<any>([]);
  const [number, setNumber] = useState<number>(1000);
  const [selectNumber, setSelectNumber] = useState<number[]>([]);
  const [isDone, setIsDone] = useState(false);
  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: number, // 1000 여개 사진을 가져온다
    }).then(value => {
      setImageArray(value.edges);
      // 이미지 배열에 넣고

      setNumber((prev: number) => {
        // 다음 페이지가 있으면 1000 페이지더
        if (value.page_info.has_next_page) {
          return prev + 1000;
        } else {
          return prev; // 없으면 그대로
        }
      });
      if (
        params &&
        Array.isArray(params) &&
        !isDone &&
        Array.isArray(value.edges)
      ) {
        // 파라미터로 넘어온 이미지가 해당 배열안에 있으면 체크
        let _image: string[] = [];
        let _number: number[] = [];

        value.edges.forEach((v: {node: {image: {uri: string}}}, i: number) => {
          const result = params.find(fv => fv.path === v?.node?.image?.uri);
          if (result) {
            _number.push(i + 2);
          }
        });
        params.forEach(v => {
          if (v.isLocal) {
            _image.push(v.path);
          }
        });
        setSelectNumber(_number);
        setIsDone(true);
        setImageArray((prev: any) => [
          ..._image.map(v => ({
            path: v,
          })),
          ...value.edges,
        ]);
      }
    });
  };

  const onPressComplete = () => {
    navigation.navigate('ProductUpdate', {
      imageFile: selectNumber.map(v => ({
        path: imageArray[v - 2]?.path ?? imageArray[v - 2]?.node?.image?.uri,
        mime: imageArray[v - 2]?.path
          ? imageArray[v - 2].mime
          : imageArray[v - 2].node?.type,
        isLocal: imageArray[v - 2]?.path ? true : false,
      })),
    });
  };

  const _renderItem = useCallback(
    ({item, index}) => {
      const select = selectNumber.findIndex(v => {
        if (v > index + 1 || v < index + 1) {
          return null;
        } else {
          return v;
        }
      });

      const onPress =
        select === -1
          ? () => setSelectNumber(prev => [...prev, index + 1])
          : () => setSelectNumber(prev => prev.filter(v => v !== index + 1));

      if (index === 0) {
        // 첫번째 이미지
        return (
          <TouchableOpacity onPress={onPress} style={styles.firstTouchImage}>
            <Photo
              returnFn={image => {
                if (image) {
                  setImageArray((prev: any) => [image, ...prev]);
                  setSelectNumber(prev => prev.map(v => v + 1));
                }
              }}
              width={getPixel(106)}
              height={getHeightPixel(112)}
            />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={onPress}
          key={index}
          style={{
            ...styles.touchImage,
            marginRight: (index + 1) % 3 !== 0 ? getPixel(4) : 0,
          }}>
          <View style={select !== -1 ? styles.selectDot : styles.noneSelectDot}>
            <WhiteText fontSize={`${12 * fontSize}`}>
              {select !== -1 ? select + 1 : ''}
            </WhiteText>
          </View>
          <Image
            style={styles.imageBox}
            source={{
              uri: item?.node?.image?.uri ?? item?.path,
            }}
          />
        </TouchableOpacity>
      );
    },
    [selectNumber, imageArray],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  useLayoutEffect(() => {
    getPhotos();
  }, []);
  useEffect(() => {
    if (selectNumber.length > 10) {
      setSelectNumber(prev =>
        prev.filter((v, i) => {
          if (i !== 0) {
            return true;
          }
        }),
      );
    }
  }, [selectNumber]);

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
        data={[1, ...imageArray]}
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
