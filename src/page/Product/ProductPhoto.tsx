import {
  Image,
  ScrollView,
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
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import {getHitSlop} from '@/Util/Util';
import useBoolean from '@/Hooks/useBoolean';
import ModalAlert from '@/Components/Product/ModalAlert';

const ProductPhoto = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const imageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const {value: isAlert, on: onIsAlert, off: offIsAlert} = useBoolean(false);
  return (
    <View>
      <Header title={t('photoUpdate')}>
        <TouchableOpacity onPress={onIsAlert} hitSlop={getHitSlop(5)}>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>

      <ScrollView style={{marginTop: getHeightPixel(36)}}>
        <View style={styles.ImageArrayWrapView}>
          <TouchableOpacity style={styles.cameraImageTouch}>
            <AutoHeightImage
              source={require('@assets/image/camera_gray.png')}
              width={getPixel(34)}
            />
          </TouchableOpacity>
          {imageArray.map((item, index) => {
            return (
              <View
                style={[
                  styles.ImageWrapView,
                  {
                    marginRight: (index + 1) % 3 === 2 ? 0 : getPixel(5),
                  },
                ]}>
                <Image
                  source={require('@assets/image/dummy.png')}
                  style={styles.productImage}
                />
                <View style={styles.positionCountView}>
                  <WhiteText fontSize={`${14 * fontSize}`}>
                    {index + 1}
                  </WhiteText>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      {isAlert && (
        <ModalAlert
          onClose={offIsAlert}
          title={t('imageWarningTitle1')}
          content={t('imageWarning1')}
        />
      )}
    </View>
  );
};

export default ProductPhoto;

const styles = StyleSheet.create({
  ImageArrayWrapView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cameraImageTouch: {
    width: getPixel(106),
    height: getPixel(106),
    borderRadius: getPixel(20),
    overflow: 'hidden',
    marginBottom: getPixel(4),
    marginRight: getPixel(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.gray_F1,
  },
  ImageWrapView: {
    width: getPixel(106),
    height: getPixel(106),
    borderRadius: getPixel(20),
    overflow: 'hidden',
    marginBottom: getPixel(5),
  },
  productImage: {
    width: getPixel(106),
    height: getPixel(106),
  },
  positionCountView: {
    position: 'absolute',
    top: getPixel(6),
    right: getPixel(6),
    width: getPixel(20),
    height: getPixel(20),
    backgroundColor: Theme.color.aqua_00,
    borderRadius: getPixel(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
