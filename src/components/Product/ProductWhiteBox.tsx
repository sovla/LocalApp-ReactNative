import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {DarkBlueText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import MoreIcon from '@assets/image/more.png';
import {ProductWhiteBoxProps} from '@/Types/Components/ProductTypes';
import useBoolean from '@/Hooks/useBoolean';
import EditModal from './EditModal';
import ModalReviewRequest from './ModalReviewRequest';

const ProductWhiteBox: React.FC<ProductWhiteBoxProps> = ({
  title = '나이키 운동화 슬립온 240 여성상의/여름블라우스/펀칭...',
  price = '$24.00',
  isComplete,
  selectMenu,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const {
    value: isEditProduct,
    on: onIsEditProduct,
    off: offIsEditProduct,
    toggle,
  } = useBoolean(false);

  const {value: isReview, on: onIsReview, off: offIsReview} = useBoolean(false);

  return (
    <View
      style={[
        styles.container,
        {
          height: isComplete ? getHeightPixel(132) : getHeightPixel(90),
        },
      ]}>
      <View style={styles.contentContainer}>
        <Image
          source={require('@assets/image/dummy.png')}
          style={[
            styles.image,
            isComplete && {
              opacity: 0.5,
            },
          ]}
        />
        <View
          style={[
            styles.contentView,
            isComplete && {
              opacity: 0.5,
            },
          ]}>
          <Text numberOfLines={2} fontSize={`${14 * fontSize}`}>
            {title}
          </Text>
          <DarkBlueText bold fontSize={`${16 * fontSize}`}>
            {price}
          </DarkBlueText>
        </View>
        <TouchableOpacity onPress={onIsEditProduct}>
          <AutoHeightImage source={MoreIcon} width={getPixel(19.2)} />
        </TouchableOpacity>
      </View>
      {isComplete && (
        <>
          <View style={styles.menuView}>
            <TouchableOpacity style={styles.menuLeftTouch}>
              <Text fontSize={`${12 * fontSize}`}>
                {t(isComplete ? 'MyProductMenu3' : 'MyProductMenu1')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isComplete ? onIsReview : () => {}}
              style={styles.menuRightTouch}>
              <Text fontSize={`${12 * fontSize}`}>
                {t(isComplete ? 'MyProductMenu4' : 'MyProductMenu2')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isEditProduct && (
        <EditModal
          onClose={offIsEditProduct}
          isBump={selectMenu === t('ProfileSellProduct')}
        />
      )}
      {isReview && <ModalReviewRequest onClose={offIsReview} />}
    </View>
  );
};

export default ProductWhiteBox;

const styles = StyleSheet.create({
  container: {
    width: getPixel(328),
    backgroundColor: Theme.color.white,
    borderRadius: 10,
    marginBottom: getHeightPixel(8),
    marginHorizontal: getPixel(16),
    paddingTop: getHeightPixel(13),
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: getPixel(10),
    paddingBottom: getHeightPixel(10.5),
  },
  image: {
    width: getPixel(64),
    height: getPixel(64),
  },
  contentView: {
    width: getPixel(190),
    marginLeft: getPixel(16),
    marginRight: getPixel(16),
  },
  menuView: {
    height: getHeightPixel(36.5),
    flexDirection: 'row',
    borderTopColor: Theme.color.whiteGray_EE,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  menuLeftTouch: {
    width: '50%',
    height: '100%',
    borderRightColor: Theme.color.whiteGray_EE,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRightTouch: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
