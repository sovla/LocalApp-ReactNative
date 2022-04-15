import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {DarkBlueText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import {OtherChattingProps} from '@/Types/Components/ChattingTypes';
const OtherChatting: React.FC<OtherChattingProps> = ({isMyProduct}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const changeStyle: any = isMyProduct
    ? {
        color: Theme.color.blue_3D,
        borderColor: Theme.color.blue_3D,
        borderRadius: {
          borderBottomRightRadius: 0,
        },
        justifyContent: 'flex-end',
      }
    : {
        color: Theme.color.white,
        borderColor: Theme.color.whiteGray_DC,
        borderRadius: {
          borderBottomLeftRadius: 0,
        },
        justifyContent: 'flex-start',
      };
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: changeStyle.justifyContent,
      }}>
      {!isMyProduct && (
        <View style={styles.imageView}>
          <Image
            source={require('@assets/image/dummy.png')}
            style={styles.image}
          />
        </View>
      )}

      <View
        style={{
          ...styles.chattingView,
          backgroundColor: changeStyle.color,
          ...changeStyle.borderRadius,
        }}>
        <View
          style={{
            ...styles.productView,
            borderColor: changeStyle.borderColor,
          }}>
          <View style={styles.row}>
            <Image
              source={require('@assets/image/dummy.png')}
              style={styles.innerImage}
            />
            <View style={{width: getPixel(120), marginLeft: getPixel(10)}}>
              <Text
                fontSize={`${12 * fontSize}`}
                numberOfLines={2}
                style={styles.marginTop}>
                Smart Insulation Cup Water Bottle Led Temperature Dis...
              </Text>
              <DarkBlueText fontSize={`${14 * fontSize}`} bold>
                R$ 160,00
              </DarkBlueText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherChatting;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  innerImage: {
    width: getPixel(62),
    height: getPixel(62),
  },
  marginTop: {
    marginTop: getHeightPixel(5),
  },
  productView: {
    width: getPixel(217),
    height: getHeightPixel(90),
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.color.white,
  },
  container: {
    marginTop: getHeightPixel(15),
    minHeight: getHeightPixel(44),
    flexDirection: 'row',
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
  },
  dateView: {
    marginLeft: getPixel(5),
    justifyContent: 'flex-end',
    marginBottom: getHeightPixel(3),
  },
  chattingView: {
    width: getPixel(245),
    height: getHeightPixel(120),
    borderRadius: getPixel(15),
    backgroundColor: Theme.color.white,
    justifyContent: 'center',
    paddingHorizontal: getPixel(14),
    paddingVertical: getHeightPixel(14),
  },
  imageView: {
    width: getHeightPixel(44),
    height: getHeightPixel(44),
    borderRadius: getPixel(16),
    overflow: 'hidden',
    marginRight: getPixel(8),
  },
  image: {width: getHeightPixel(44), height: getHeightPixel(44)},
});
