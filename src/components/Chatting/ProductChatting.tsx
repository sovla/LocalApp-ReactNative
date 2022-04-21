import {Image, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {DarkBlueText, Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import {OtherChattingProps} from '@/Types/Components/ChattingTypes';
import {Button} from '../Global/button';
const OtherChatting: React.FC<OtherChattingProps> = ({isMyProduct}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();

  const onPressProduct = useCallback(() => {
    navigation.navigate('ProductDetail');
  }, []);

  return isMyProduct ? (
    <View
      style={{
        ...styles.container,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          ...styles.chattingView,
          backgroundColor: Theme.color.blue_3D,
          borderBottomRightRadius: 0,
        }}>
        <View
          style={{
            ...styles.productView,
            borderColor: Theme.color.blue_3D,
          }}>
          <View style={styles.row}>
            <View style={styles.innerImageView}>
              <Image
                source={require('@assets/image/dummy.png')}
                style={styles.innerImage}
              />
            </View>
            <View style={{width: getPixel(120), marginLeft: getPixel(10)}}>
              <WhiteText
                fontSize={`${12 * fontSize}`}
                numberOfLines={2}
                style={styles.marginBottom5}>
                Smart Insulation Cup Water Bottle Led Temperature Dis...
              </WhiteText>
              <WhiteText fontSize={`${14 * fontSize}`} bold>
                R$ 160,00
              </WhiteText>
            </View>
          </View>
          <View style={styles.paddingTop14}>
            <Button
              onPress={onPressProduct}
              fontSize={13}
              content={t('moreInformation')}
              fontColor={Theme.color.white}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        justifyContent: 'flex-start',
      }}>
      <View style={styles.imageView}>
        <Image
          source={require('@assets/image/dummy.png')}
          style={styles.image}
        />
      </View>

      <View
        style={{
          ...styles.chattingView,
          backgroundColor: Theme.color.white,
          borderBottomLeftRadius: 0,
        }}>
        <View
          style={{
            ...styles.productView,
          }}>
          <View style={styles.row}>
            <View style={styles.innerImageView}>
              <Image
                source={require('@assets/image/dummy.png')}
                style={styles.innerImage}
              />
            </View>
            <View style={{width: getPixel(120), marginLeft: getPixel(10)}}>
              <Text
                fontSize={`${12 * fontSize}`}
                numberOfLines={2}
                style={styles.marginBottom5}>
                Smart Insulation Cup Water Bottle Led Temperature Dis...
              </Text>
              <DarkBlueText fontSize={`${14 * fontSize}`} bold>
                R$ 160,00
              </DarkBlueText>
            </View>
          </View>
          <View style={styles.paddingTop14}>
            <Button
              onPress={onPressProduct}
              content={t('moreInformation')}
              fontColor={Theme.color.white}
              fontSize={13}
              style={{...styles.button, backgroundColor: Theme.color.gray}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherChatting;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.color.aqua_00,
    width: getPixel(217),
    height: getHeightPixel(36),
  },
  paddingTop14: {
    paddingTop: getHeightPixel(14),
  },
  row: {
    flexDirection: 'row',
  },
  innerImageView: {
    width: getPixel(62),
    height: getPixel(62),
    borderWidth: 2,
    borderColor: Theme.color.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  innerImage: {
    width: getPixel(62),
    height: getPixel(62),
  },
  marginBottom5: {
    marginBottom: getHeightPixel(5),
  },
  productView: {
    width: getPixel(213),
    minHeight: getHeightPixel(90),
    borderRadius: 10,
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
    minHeight: getHeightPixel(120),
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
