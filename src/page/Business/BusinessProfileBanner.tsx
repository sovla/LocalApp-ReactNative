import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {GrayText, Text} from '@/Components/Global/text';
import Line from '@/Components/Global/Line';
import CameraGrayIcon from '@assets/image/camera_gray.png';
import AutoHeightImage from 'react-native-auto-height-image';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';
import {BusinessProfileBannerProps} from '@/Types/Screen/Screen';
import {usePostSend} from '@/Hooks/useApi';
import ModalPhoto from '@/Components/Business/ModalPhoto';
import DeleteBlackIcon from '@assets/image/delete_black.png';
import {AlertButton} from '@/Util/Util';

export default function BusinessProfileBanner({
  navigation,
}: BusinessProfileBannerProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);
  const [deleteImage, setDeleteImage] = useState<number[]>([]);
  const [imageArray, setImageArray] = useState<
    {
      path: string;
      mime: string;
    }[]
  >([]);
  const [isModalPhoto, setIsModalPhoto] = useState(false);

  const {PostAPI} = usePostSend('member_busi_banner_reg.php', {
    mt_idx: user.mt_idx as string,
    busi_banner_del: deleteImage,
    busi_banner: imageArray,
    imageField: 'busi_banner',
  });

  const onPressSave = useCallback(() => {
    PostAPI().then(res => {
      if (res?.result === 'false' && res.msg) {
        AlertButton(res.msg);
      } else {
        navigation.goBack();
      }
    });
  }, []);
  const imageReturnFn = useCallback(image => {
    setImageArray(image);
    setIsModalPhoto(false);
  }, []);

  const onPressDelete = useCallback(item => {
    if (item?.idx) {
      setDeleteImage(item.idx); // 추후에 idx 있을경우 추가 필요
    } else {
      setImageArray(prev => prev.filter(v => v.path !== item.path));
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header title={t('businessProfileBannerTitle')} />
      <View style={styles.bannerView}>
        <Text
          fontSize={`${20 * fontSize}`}
          medium
          style={{
            marginTop: getHeightPixel(34),
            marginBottom: getHeightPixel(14),
          }}>
          {t('businessProfileBannerSubTitle')}
        </Text>
        <Text fontSize={`${14 * fontSize}`}>
          {t('businessProfileBannerGuideText1')}
        </Text>
        <GrayText fontSize={`${14 * fontSize}`}>
          {t('businessProfileBannerGuideText2')}
        </GrayText>
        <Line
          isGray
          style={{
            marginVertical: getHeightPixel(20),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {imageArray.map(v => {
            return (
              <View>
                <View style={styles.imageView}>
                  <Image source={{uri: v.path}} style={styles.image} />
                </View>
                <TouchableOpacity
                  onPress={() => onPressDelete(v)}
                  style={styles.imageTouch}>
                  <AutoHeightImage
                    source={DeleteBlackIcon}
                    width={getPixel(18)}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              setIsModalPhoto(true);
            }}
            style={styles.cameraImageTouch}>
            <AutoHeightImage source={CameraGrayIcon} width={getPixel(20)} />
            <GrayText fontSize={`${14 * fontSize}`}>
              {imageArray.length}/3
            </GrayText>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        style={{
          position: 'absolute',
          bottom: getHeightPixel(30),
          left: getPixel(16),
        }}
        onPress={onPressSave}
        width="328px"
        content={t('save')}
      />
      {isModalPhoto && (
        <ModalPhoto
          count={3}
          returnFn={imageReturnFn}
          onClose={() => setIsModalPhoto(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageTouch: {
    position: 'absolute',
    right: getPixel(15),
    top: -3,
  },
  image: {
    width: getPixel(64),
    height: getPixel(64),
  },
  imageView: {
    width: getPixel(64),
    height: getPixel(64),
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: getPixel(20),
  },
  bannerView: {
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  cameraImageTouch: {
    width: getPixel(64),
    height: getPixel(64),
    borderRadius: getPixel(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.color.gray,
  },
});
