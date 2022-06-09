import {
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {Text} from '@/Components/Global/text';
import {TextInput} from 'react-native-gesture-handler';
import Line from '@/Components/Global/Line';
import AutoHeightImage from 'react-native-auto-height-image';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {getHitSlop} from '@/Util/Util';
import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';

export default function ReviewWrite() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [star, setStar] = useState(0);
  const startLocalArray = new Array(5).fill(0);
  return (
    <View style={{flex: 1}}>
      <Header title={t('reviewWriteTitle')} />
      <View style={styles.subTitleView}>
        <Text fontSize={`${14 * fontSize}`} medium style={styles.subTitleText}>
          {t('reviewWriteSubTitle')}
        </Text>
        <Line
          width={getPixel(328)}
          backgroundColor={Theme.color.gray}
          height={0.6}
        />
        <View
          style={styles.starContainer}
          hitSlop={getHitSlop(10)}
          onStartShouldSetResponder={() => true}
          onResponderMove={e => {
            const num = +(
              (+e.nativeEvent.pageX.toFixed() - getPixel(70)) /
              42
            ).toFixed();
            if (num !== star) setStar(num < 1 ? 1 : num);
          }}>
          {startLocalArray.map((item, index) => {
            return (
              <View hitSlop={getHitSlop(5)}>
                <Image
                  source={
                    index < star
                      ? require('@assets/image/star.png')
                      : require('@assets/image/star_empty.png')
                  }
                  style={styles.starImage}
                />
              </View>
            );
          })}
        </View>
        <Text fontSize={`${14 * fontSize}`} medium>
          {t('reviewWriteContent')}
        </Text>
        <TextInput
          placeholder={t('reviewWritePlaceHolder')}
          placeholderTextColor={Theme.color.gray}
          style={[styles.textInput, {fontSize: fontSize * 14}]}
        />
      </View>
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        <Button width={`${328}px`} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitleView: {
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getHeightPixel(375),
  },
  subTitleText: {
    marginTop: getHeightPixel(40),
    marginBottom: getHeightPixel(20),
  },
  starContainer: {
    flexDirection: 'row',
    width: getPixel(210),
    justifyContent: 'space-between',
    marginTop: getHeightPixel(25),
    marginBottom: getHeightPixel(20),
  },
  starImage: {
    width: getPixel(22),
    height: getPixel(22),
  },
  textInput: {
    width: getPixel(288),
    height: getHeightPixel(34),
    borderWidth: 0.4,
    borderColor: Theme.color.gray,
    borderRadius: getPixel(2),

    color: Theme.color.black,
    paddingHorizontal: getPixel(10),
    paddingVertical: getHeightPixel(5),
    includeFontPadding: false,
    marginTop: getHeightPixel(30),
  },
});
