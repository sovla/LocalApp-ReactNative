import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextStyle,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Header from '@/Components/Profile/Header';
import {ProfileBackground} from './ProfileHome';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import EditIcon from '@assets/image/edit_ver.png';
import {getHitSlop} from '@/Util/Util';
import {GrayText, Text, WhiteText} from '@/Components/Global/text';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import CopyIcon from '@assets/image/copy.png';
import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {Toggle} from '@/Components/Global/button';
import {ProfileDetailProps, ProfileUpdateProps} from '@/Types/Screen/Screen';
import AutoHeightImage from 'react-native-auto-height-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ProfileUpdate({navigation}: ProfileUpdateProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isOn, setIsOn] = useState(false);

  const onPressSave = useCallback(() => {
    navigation.navigate('ProfileDetail');
  }, []);

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <ProfileBackground height={getHeightPixel(200)} style={styles.bgView} />
        <View style={styles.mainContainer}>
          <Header isBack title={t('profileDetailTitle')}>
            <TouchableOpacity onPress={onPressSave} hitSlop={getHitSlop(5)}>
              <WhiteText fontSize={`${16 * fontSize}`}>저장</WhiteText>
            </TouchableOpacity>
          </Header>
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.profileView}>
                <Image
                  source={require('@assets/image/dummy.png')}
                  style={styles.profileImage}
                />
              </View>
              <Image source={CameraWhiteIcon} style={styles.cameraWhiteImage} />
            </View>
            <View>
              <WhiteText fontSize={`${16 * fontSize}`} medium>
                Leandro
              </WhiteText>
              <GrayText fontSize={`${12 * fontSize}`}>
                Love what you have.
              </GrayText>
              <View style={styles.uidView}>
                <WhiteText fontSize={`${14 * fontSize}`}>
                  NC : 0000abcd
                </WhiteText>
                <TouchableOpacity
                  style={styles.marginLeft10}
                  hitSlop={getHitSlop(5)}>
                  <AutoHeightImage source={CopyIcon} width={getPixel(16)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mainViewStyle}>
          <BetweenTextInput
            leftText={t('profileDetailName')}
            rightText={'Leandro'}
          />
          <View>
            <Text style={styles.marginView} fontSize={`${16 * fontSize}`}>
              {t('profileDetailState')}
            </Text>
            <TextInput
              placeholder={'asldjask djajsdkasjdkjas'}
              placeholderTextColor={Theme.color.gray}
              onChangeText={() => {
                //    추가필요
              }}
              style={{
                ...styles.statusTextInput,
                fontSize: fontSize * 12,
                fontFamily: Theme.fontWeight.default,
              }}
            />
          </View>
          <Line
            backgroundColor={Theme.color.gray}
            height={0.6}
            width={getPixel(320)}
          />
          <BetweenTextInput
            leftText={t('profileDetailTel')}
            rightText={'+55 11 964845016'}
            isLine={false}
          />
          <View style={styles.betweenTextView}>
            <Text fontSize={`${16 * fontSize}`}>
              {t('profileDetailTelOpen')}
            </Text>
            <Toggle isOn={isOn} setIsOn={setIsOn} />
          </View>
          <Line
            backgroundColor={Theme.color.gray}
            height={0.6}
            width={getPixel(320)}
          />
          <BetweenTextInput
            leftText={t('profileDetailEmail')}
            rightText={'onestore@gmail.com'}
          />
          <BetweenTextInput
            leftText={t('profileDetailSex')}
            rightText={'남성'}
          />
          <BetweenTextInput
            leftText={t('profileDetailDate')}
            rightText={'2000. 12. 12'}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export const BetweenTextInput: React.FC<{
  leftText: string;
  rightText?: string;
  isLine?: boolean;
  rightTextStyle?: TextStyle;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  leftText,
  rightText,
  isLine = true,
  rightTextStyle = {
    color: Theme.color.black,
    height: getHeightPixel(50),
    width: getPixel(230),
    textAlign: 'right',
  },
  onChangeText,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <>
      <View style={styles.betweenTextView}>
        <Text
          fontSize={`${16 * fontSize}`}
          style={{
            width: getPixel(100),
          }}>
          {leftText}
        </Text>
        <TextInput
          placeholder={rightText}
          placeholderTextColor={Theme.color.gray}
          onChangeText={onChangeText}
          style={{...rightTextStyle, fontSize: fontSize * 16}}
        />
      </View>
      {isLine && (
        <Line
          backgroundColor={Theme.color.gray}
          height={0.4}
          width={getPixel(320)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: getHeightPixel(200),
    marginBottom: getHeightPixel(20),
  },
  statusTextInput: {
    width: getPixel(328),
    height: getHeightPixel(40),
    letterSpacing: -0.84,
    color: Theme.color.black,
    marginBottom: getHeightPixel(10),
  },
  uidView: {
    marginTop: getHeightPixel(18),
    flexDirection: 'row',
  },
  marginLeft10: {marginLeft: getPixel(10)},
  marginBottom16: {marginBottom: getHeightPixel(16)},
  marginView: {
    marginTop: getHeightPixel(16),
    marginBottom: getHeightPixel(6),
  },
  mainViewStyle: {
    marginHorizontal: getPixel(16),
  },
  betweenTextView: {
    width: getPixel(328),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraWhiteImage: {
    width: getPixel(22),
    height: getPixel(22),
    position: 'absolute',
    right: getPixel(10),
    bottom: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: getHeightPixel(30),
    marginLeft: getPixel(16),
  },
  profileView: {
    width: getPixel(80),
    height: getPixel(80),
    overflow: 'hidden',
    borderRadius: getPixel(25),
    marginRight: getPixel(10),
  },
  profileImage: {
    width: getPixel(80),
    height: getPixel(80),
  },
  editImage: {width: getPixel(25), height: getPixel(25)},
  bgView: {
    borderBottomLeftRadius: getPixel(15),
    borderBottomRightRadius: getPixel(15),
  },
});
