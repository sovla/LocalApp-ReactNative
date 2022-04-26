import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Header from '@/Components/Profile/Header';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, RedText, Text, WhiteText} from '@/Components/Global/text';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import {ProfileBackground} from '../Profile/ProfileHome';

import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {StackScreenProps} from '@react-navigation/stack';
import Screen from 'Types/Screen/Screen';
import Input from '@/Components/Global/Input';
import {BetweenText} from '../Profile/ProfileDetail';
import {Button, Toggle} from '@/Components/Global/button';

import HomeIcon from '@assets/image/home.png';
import PhoneBlueIcon from '@assets/image/phone_blue.png';
import MobileBlueIcon from '@assets/image/mobile_blue.png';
import ClockIcon from '@assets/image/clock.png';
import WebIcon from '@assets/image/web.png';
import FacebookBlueIcon from '@assets/image/facebook_blue.png';
import InstagramBlueIcon from '@assets/image/instagram_blue.png';
import WhatsappBlueIcon from '@assets/image/whatsapp_blue.png';
import AutoHeightImage from 'react-native-auto-height-image';
import CopyIcon from '@assets/image/copy.png';
import {getHitSlop} from '@/Util/Util';

export default function BusinessProfileSetting({
  navigation,
  route,
}: StackScreenProps<Screen>) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isOn, setIsOn] = useState<boolean>(false);
  const onPressSave = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <ProfileBackground
          height={getHeightPixel(200)}
          style={styles.imageBackground}
        />
        <Header isBack title={t('BusinessProfileMenuTitle')} />
        <View style={styles.headerView}>
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

        <View
          style={{
            width: getPixel(328),
            marginHorizontal: getPixel(16),
          }}>
          <View style={{flexDirection: 'row'}}>
            <RedDotText content={t('businessProfileSettingShopName')} />
            <TextInput
              placeholder={t('businessProfileSettingShopNamePh')}
              placeholderTextColor={Theme.color.gray}
              style={[
                styles.shopNameInput,
                {
                  fontSize: 14 * fontSize,
                },
              ]}
            />
          </View>
          <Line
            style={{marginVertical: getHeightPixel(10), width: getPixel(328)}}
            isGray
          />

          <View>
            <RedDotText content={t('businessProfileSettingShopIntroduction')} />
            <Input
              value=""
              width={getPixel(328)}
              height={getHeightPixel(45)}
              PlaceHolderComponent={() => (
                <GrayText>
                  {t('businessProfileSettingShopIntroductionPh')}
                </GrayText>
              )}
            />
          </View>
          <BetweenText
            leftText={t('businessProfileSettingShopTel')}
            rightText="+55 11 964845016"
            rightTextStyle={{
              color: Theme.color.gray,
              fontSize: 14 * fontSize,
            }}
            isLine={false}
          />
          <View style={styles.betweenTextView}>
            <Text fontSize={`${16 * fontSize}`}>
              {t('businessProfileSettingShopTelOpen')}
            </Text>
            <Toggle isOn={isOn} setIsOn={setIsOn} />
          </View>
          <Line
            style={{marginVertical: getHeightPixel(10), width: getPixel(328)}}
            isGray
          />
          <BetweenText
            leftText={t('businessProfileSettingShopEmail')}
            rightText="onestore@gmail.com"
            rightTextStyle={{
              fontSize: 14 * fontSize,
            }}
          />
          <ImageInput
            image={HomeIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <RedDotText
                content={t('businessProfileSettingShopAddress')}
                color={Theme.color.gray}
                isView={false}
              />
            )}
          />
          <ImageInput
            image={PhoneBlueIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <RedDotText
                content={t('businessProfileSettingShopHp')}
                color={Theme.color.gray}
                isView={false}
              />
            )}
          />
          <ImageInput
            image={MobileBlueIcon}
            imageWidth={getPixel(13.31)}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <RedDotText
                content={t('businessProfileSettingShopTelPh')}
                color={Theme.color.gray}
                isView={false}
              />
            )}
          />
          <ImageInput
            image={ClockIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <RedDotText
                content={t('businessProfileSettingShopOpeningTime')}
                color={Theme.color.gray}
                isView={false}
              />
            )}
          />
          <ImageInput
            image={WebIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <GrayText fontSize={`${14 * fontSize}`}>
                {t('businessProfileSettingShopWebSite')}
              </GrayText>
            )}
          />
          <ImageInput
            image={FacebookBlueIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <GrayText fontSize={`${14 * fontSize}`}>
                {t('businessProfileSettingShopFacebook')}
              </GrayText>
            )}
          />

          <ImageInput
            image={InstagramBlueIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <GrayText fontSize={`${14 * fontSize}`}>
                {t('businessProfileSettingShopInstagram')}
              </GrayText>
            )}
          />
          <ImageInput
            image={WhatsappBlueIcon}
            value=""
            onChange={() => {}}
            PlaceHolder={() => (
              <GrayText fontSize={`${14 * fontSize}`}>
                {t('businessProfileSettingShopWhatsApp')}
              </GrayText>
            )}
          />
        </View>
        <View
          style={{
            marginHorizontal: getPixel(16),
            marginTop: getHeightPixel(100),
            marginBottom: getHeightPixel(34),
          }}>
          <Button onPress={onPressSave} content={t('save')} width="328px" />
        </View>
      </ScrollView>
    </View>
  );
}

const RedDotText: React.FC<{
  fontSize?: number;
  content: string;
  color?: string;
  isView?: boolean;
}> = ({fontSize, content, color = Theme.color.black, isView = true}) => {
  const fontSizeState = useAppSelector(state => state.fontSize.value);
  const applyFontSize = fontSize ?? fontSizeState * 16;

  return isView ? (
    <View style={styles.redDotView}>
      <Text color={color} fontSize={`${applyFontSize}`}>
        {content}
      </Text>
      <RedText style={{marginLeft: getPixel(5)}} fontSize={`${applyFontSize}`}>
        *
      </RedText>
    </View>
  ) : (
    <>
      <Text color={color} fontSize={`${applyFontSize}`}>
        {content}
      </Text>
      <RedText fontSize={`${applyFontSize}`}>{`  *`}</RedText>
    </>
  );
};

const ImageInput: React.FC<{
  value: string;
  onChange: any;
  PlaceHolder: React.FC;
  image: any;
  imageWidth?: number;
}> = ({value, onChange, PlaceHolder, image, imageWidth = getPixel(20)}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.imageInputView}>
      <View style={styles.imageInputImageView}>
        <AutoHeightImage source={image} width={imageWidth} />
      </View>
      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={[
          styles.imageInput,
          {
            fontSize: fontSize * 14,
          },
        ]}>
        {!isFocus && !value?.length && PlaceHolder !== undefined && (
          <PlaceHolder />
        )}
      </TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  uidView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeightPixel(15),
  },
  marginLeft10: {
    marginLeft: getPixel(10),
  },
  imageInputView: {
    width: getPixel(328),
    height: getHeightPixel(50),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageInputImageView: {
    marginRight: getPixel(15),
    width: getPixel(30),
    height: getPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInput: {
    width: getPixel(270),
    height: getHeightPixel(50),
    includeFontPadding: false,
    color: Theme.color.black,
  },
  betweenTextView: {
    width: getPixel(328),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopNameInput: {
    width: getPixel(250),
    marginLeft: getPixel(22),
    height: getHeightPixel(40),
    includeFontPadding: false,
    color: Theme.color.black,
  },
  redDotView: {flexDirection: 'row', alignItems: 'center'},
  headerView: {height: getHeightPixel(150), marginBottom: getHeightPixel(10)},
  menuArrowImage: {marginRight: getPixel(10)},
  menuText: {marginLeft: getPixel(12)},
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuContainer: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(50),
    justifyContent: 'center',
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
  imageBackground: {
    borderBottomLeftRadius: getPixel(15),
    borderBottomRightRadius: getPixel(15),
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
    alignItems: 'center',
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
