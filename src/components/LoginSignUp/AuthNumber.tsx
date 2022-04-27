import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import {TextInput} from 'react-native-gesture-handler';

import {timer} from '@/Util/Util';

export default function AuthNumber({
  count,
  tel,
  authNum,
  setAuthNum,
  onPressNext,
  isChange = true,
  onPressRetry,
}: {
  count: number;
  tel: string;
  authNum: string;
  setAuthNum: React.Dispatch<React.SetStateAction<string>>;
  onPressNext: () => void;
  isChange?: boolean;
  onPressRetry: () => void;
}) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.view}>
          <Text style={styles.titleText} medium fontSize={`${20 * fontSize}`}>
            {tel} {t('signUpAuthGuide1')}
          </Text>

          <Text
            textAlign="center"
            fontSize={`${14 * fontSize}`}
            style={styles.width175}>
            <Text
              textAlign="center"
              color={Theme.color.blue_3D}
              fontSize={`${14 * fontSize}`}>
              {tel}
            </Text>
            {t('signUpAuthGuide2')}
          </Text>
          <View style={styles.authNumView}>
            <TextInput
              caretHidden
              style={styles.textInput}
              onChangeText={setAuthNum}
              maxLength={6}
              keyboardType="number-pad"
            />
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[0]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[1]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[2]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[3]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[4]}</Text>
            </View>
            <View style={{...styles.boxView, marginRight: 0}}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[5]}</Text>
            </View>
          </View>
          <View style={styles.authRetryView}>
            <TouchableOpacity onPress={onPressRetry}>
              <GrayText fontSize={`${12 * fontSize}`}>
                {t('authRetry')}
              </GrayText>
            </TouchableOpacity>
            <GrayText fontSize={`${12 * fontSize}`}>{timer(count)}</GrayText>
          </View>
          <Button onPress={onPressNext} content={t('confirm')} />
          {isChange && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                textAlign="center"
                color={Theme.color.blue_3D}
                fontSize={`${14 * fontSize}`}
                style={{
                  marginTop: getHeightPixel(20),
                }}>
                {t('signUpAuthGuide3')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  authRetryView: {
    width: getPixel(288),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeightPixel(20),
    marginBottom: getHeightPixel(40),
  },
  authNumView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeightPixel(40),
  },
  textInput: {
    position: 'absolute',
    backgroundColor: '#0000',
    width: getPixel(288),
    height: getHeightPixel(40),
    zIndex: 100,
    color: '#0000',
  },
  boxView: {
    width: getPixel(39),
    height: getPixel(39),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.blue_F5,
    borderRadius: 4,
    marginRight: getPixel(10),
  },
  telLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.5,
    width: getPixel(54),
    height: getHeightPixel(50),
  },
  width175: {
    width: getPixel(175),
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
