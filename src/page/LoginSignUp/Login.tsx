import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import ProfileBackGroundImage from '@assets/image/profile_bg.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {LoginProps} from '@/Types/Screen/Screen';

import Input from '@/Components/Global/Input';
import {AlertButton, getHitSlop} from '@/Util/Util';
import CountryPicker from '@/Components/Profile/CountryPicker';
import {API} from '@/API/API';
import ModalAuth from '@/Components/LoginSignUp/ModalAuth';

export default function Login({navigation}: LoginProps) {
  const {t, i18n} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const [selectNum, setSelectNum] = useState('+55');
  const [tel, setTel] = useState('');
  const titleFontsize = fontSize * 36;

  const onPressAutoLogin = useCallback(() => {
    setAutoLogin(prev => !prev);
  }, []);

  const onPressSignUp = useCallback(() => {
    navigation.navigate('SignUpTOS');
  }, []);

  const onPressLogin = useCallback(async () => {
    return navigation.navigate('LoginComplete');
    if (tel === '') {
      return AlertButton(t('telRequireAlert'));
    }
    const result = await API.post('member_login_certi.php', {
      jct_country: selectNum.split('+')[1],
      jct_hp: tel,
      lang: i18n.language,
    });
    if (result.data.result === 'true') {
      AlertButton(result.data.data.data);
      setIsAuthModal(true);
    } else {
      AlertButton(result.data?.msg);
    }

    //
  }, [selectNum, tel, i18n]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={ProfileBackGroundImage}
          style={styles.backGroundImage}
        />
        <Image
          source={require('@assets/image/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Image
          source={require('@assets/image/location.png')}
          style={styles.locationImage}
          resizeMode="contain"
        />
        <Image
          source={require('@assets/image/location_deal.png')}
          style={styles.locationDeal}
          resizeMode="contain"
        />
        <Image
          source={require('@assets/image/people.png')}
          style={styles.peopleImage}
          resizeMode="contain"
        />
        <View style={styles.titleView}>
          <View style={[styles.rowCenter1]}>
            <Text
              color={Theme.color.aqua_00}
              bold
              fontSize={`${getPixel(titleFontsize)}`}>
              {t('localApp')}
            </Text>
            <Text
              color={Theme.color.white}
              bold
              fontSize={`${getPixel(titleFontsize)}`}>
              {t('loginGuide1')}
            </Text>
          </View>
          <View style={[styles.rowCenter1]}>
            <Text
              color={Theme.color.white}
              bold
              fontSize={`${getPixel(42 * fontSize)}`}>
              {t('loginGuide2')}
            </Text>
            <Text
              color={Theme.color.white}
              style={styles.loginGuide3Text}
              bold
              fontSize={`${getPixel(titleFontsize)}`}>
              {t('loginGuide3')}
            </Text>
            <Text
              color={Theme.color.aqua_00}
              bold
              fontSize={`${getPixel(titleFontsize)}`}
              style={{
                marginTop: getHeightPixel(5),
              }}>
              {t('loginGuide4')}
            </Text>
          </View>
        </View>
        <View style={styles.whiteView}>
          <CountryPicker
            width={getPixel(270)}
            setSelectNum={setSelectNum}
            selectNum={selectNum}
            isLabelNumber
            pickerFontSize={14}
            height={getHeightPixel(45)}
          />
          <Line
            isGray
            width={getPixel(270)}
            style={{
              marginBottom: getHeightPixel(5),
            }}
          />
          <Input
            keyboardType="numeric"
            width={getPixel(270)}
            height={getHeightPixel(45)}
            value={tel}
            onChange={setTel}
            inputFontSize={14}
            PlaceHolderComponent={() => (
              <GrayText fontSize={`${14 * fontSize}`}>{t('telPh')}</GrayText>
            )}
          />
          <View style={styles.w270}>
            <GrayText fontSize={`${10 * fontSize}`}>
              {t('loginGuide5')}
            </GrayText>
          </View>
          <View style={styles.w270}>
            <TouchableOpacity
              onPress={onPressAutoLogin}
              style={styles.rowCenter}>
              <CheckBoxImage isOn={autoLogin} isBlue />
              <Text
                fontSize={`${12 * fontSize}`}
                style={{marginLeft: getPixel(10)}}>
                {t('autoLogin')}
              </Text>
            </TouchableOpacity>
          </View>
          <Button content={t('login')} onPress={onPressLogin} width="270px" />
          <View
            style={{
              ...styles.rowCenter,
              width: 'auto',
              marginTop: getHeightPixel(25),
            }}>
            <Text
              color={Theme.color.whiteBlack_53}
              fontSize={`${12 * fontSize}`}
              letterSpacing={'0px'}>
              {t('businessSignUpGuide3')}
            </Text>
            <TouchableOpacity
              onPress={onPressSignUp}
              hitSlop={getHitSlop(5)}
              style={styles.marginLeft}>
              <Text fontSize={`${12 * fontSize}`} color={Theme.color.blue_3D}>
                {t('signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {isAuthModal && (
        <ModalAuth
          onPressRetry={onPressLogin}
          tel={tel}
          selectNum={selectNum}
          onClose={() => setIsAuthModal(false)}></ModalAuth>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  w270: {
    width: getPixel(270),
  },
  titleView: {
    width: getPixel(265),
    height: getHeightPixel(96),
    position: 'absolute',
    left: getPixel(36),
    top: getHeightPixel(77.5),
    justifyContent: 'space-around',
    transform: [{rotate: '-5deg'}],
  },
  loginGuide3Text: {marginLeft: getPixel(3), marginTop: getHeightPixel(5)},
  rowCenter1: {flexDirection: 'row', alignItems: 'flex-end'},
  peopleImage: {
    width: getPixel(204),
    height: getHeightPixel(227),
    position: 'absolute',
    left: getPixel(87),
    top: getHeightPixel(158),
    zIndex: 100,
  },
  locationDeal: {
    width: getPixel(125),
    height: getHeightPixel(83),
    position: 'absolute',
    left: getPixel(235),
    top: getHeightPixel(36),
    zIndex: 100,
  },
  locationImage: {
    width: getPixel(154),
    height: getPixel(154),
    position: 'absolute',
    left: getPixel(-53),
    top: getHeightPixel(191),
    zIndex: 100,
  },
  logoImage: {
    width: getPixel(120),
    height: getHeightPixel(25.2),
    position: 'absolute',
    left: getPixel(36),
    top: getHeightPixel(43),
    zIndex: 100,
  },
  marginLeft: {
    marginLeft: getPixel(5),
  },
  viewImageTouch: {
    position: 'absolute',
    right: 0,
    top: getHeightPixel(5),
  },
  rowCenter: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getHeightPixel(19),
  },
  container: {
    backgroundColor: Theme.color.blue_3D,
    flex: 1,
  },
  backGroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: getPixel(360),
    height: getHeightPixel(300),
  },
  communicationImage: {
    position: 'absolute',
    top: -getHeightPixel(127.3),
    left: -getPixel(53),
    width: getPixel(534.58),
    height: getHeightPixel(512.3),
    zIndex: 105,
  },

  title: {
    width: getPixel(177),
  },
  subTitle: {
    marginTop: getHeightPixel(15),
    width: getPixel(165),
  },
  whiteView: {
    width: getPixel(328),
    height: getHeightPixel(348),
    backgroundColor: Theme.color.white,
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(354),
    borderRadius: getPixel(20),

    alignItems: 'center',
    paddingTop: getHeightPixel(40),
  },
});
