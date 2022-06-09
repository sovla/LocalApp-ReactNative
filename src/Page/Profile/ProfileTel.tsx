import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {ProfileTelProps} from '@/Types/Screen/Screen';
import {TextInput} from 'react-native-gesture-handler';

import CountryPicker from '@/Components/Profile/CountryPicker';

export default function ProfileTel({navigation}: ProfileTelProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [tel, setTel] = useState('+55 11 96484-5016');
  const [selectNum, setSelectNum] = useState('+55');

  const onPressNext = useCallback(() => {
    navigation.navigate('ProfileAuth');
  }, []);

  return (
    <View style={styles.container}>
      <Header title={t('profileTelTitle')} />
      <KeyboardAwareScrollView>
        <View style={styles.view}>
          <Text style={styles.titleText} fontSize={`${16 * fontSize}`}>
            {t('profileTelGuide1')}
          </Text>
          <Text style={styles.telText} medium fontSize={`${20 * fontSize}`}>
            {tel}
          </Text>

          <Text fontSize={`${14 * fontSize}`}>{t('signUpTelGuide2')}</Text>
          <Text
            color={Theme.color.blue_3D}
            fontSize={`${14 * fontSize}`}
            style={{
              marginBottom: getHeightPixel(20),
            }}>
            {t('profileTelGuide2')}
          </Text>
          <CountryPicker setSelectNum={setSelectNum} selectNum={selectNum} />

          <Line isGray width={getPixel(288)} />
          <View style={styles.touch}>
            <View style={styles.telLeftView}>
              <GrayText fontSize={`${16 * fontSize}`}>{selectNum[0]}</GrayText>
              <Text fontSize={`${16 * fontSize}`}>
                {' ' + selectNum.substring(1)}
              </Text>
            </View>
            <TextInput
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
  telText: {
    marginBottom: getHeightPixel(40),
  },
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
    marginTop: getHeightPixel(40),
    marginBottom: getHeightPixel(10),
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
