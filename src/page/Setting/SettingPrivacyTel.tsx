import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {SignUpTelProps} from '@/Types/Screen/Screen';
import ArrowDownIcon from '@assets/image/arrow_down.png';
import {TextInput} from 'react-native-gesture-handler';
import CountryPicker from '@/Components/Profile/CountryPicker';

export default function SettingPrivacyTel({navigation}: SignUpTelProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [tel, setTel] = useState('');
  const [selectNum, setSelectNum] = useState('+55');
  const onPressNext = useCallback(() => {
    return navigation.navigate('SettingPrivacyTelAuth', tel);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.view}>
          <Text style={styles.titleText} medium fontSize={`${20 * fontSize}`}>
            {t('signUpTelGuide1')}
          </Text>

          <Text fontSize={`${14 * fontSize}`} style={styles.width220}>
            {t('signUpTelGuide2')}
            <Text color={Theme.color.blue_3D} fontSize={`${14 * fontSize}`}>
              {t('signUpTelGuide3')}
            </Text>
          </Text>
          <CountryPicker selectNum={selectNum} setSelectNum={setSelectNum} />
          <Line isGray width={getPixel(288)} />
          <View style={styles.touch}>
            <View style={styles.telLeftView}>
              <GrayText fontSize={`${16 * fontSize}`}>+</GrayText>
              <Text fontSize={`${16 * fontSize}`}> 55</Text>
            </View>
            <TextInput
              keyboardType="number-pad"
              style={{
                ...styles.textInput,
                fontSize: 15 * fontSize,
              }}
              placeholder={t('telPh')}
              placeholderTextColor={Theme.color.gray}
            />
          </View>
          <Button
            onPress={onPressNext}
            content={t('next')}
            style={styles.button}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: getPixel(222),
    height: getHeightPixel(50),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.5,
    color: Theme.color.black,
  },
  telLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.5,
    width: getPixel(54),
    height: getHeightPixel(50),
  },
  width220: {
    width: getPixel(220),
  },
  touch: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeightPixel(30),
  },
  titleText: {
    textAlign: 'center',
    marginBottom: getHeightPixel(20),
  },
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: getHeightPixel(40),
  },
  mr5: {
    marginRight: getPixel(5),
  },
  width15: {
    width: getPixel(15),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxView: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
