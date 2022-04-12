import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Header from '@/Components/Profile/Header';
import {ProfileBackground} from './ProfileHome';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import EditIcon from '@assets/image/edit_ver.png';
import {getHitSlop} from '@/Util/Util';
import {GrayText, Text, WhiteText} from '@/Components/Global/text';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {Toggle} from '@/Components/Global/button';

export default function ProfileDetail() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isOn, setIsOn] = useState(false);
  return (
    <View style={{flex: 1}}>
      <ProfileBackground height={getHeightPixel(200)} style={styles.bgView} />
      <View style={{height: getHeightPixel(200)}}>
        <Header isBack title={t('profileDetailTitle')}>
          <TouchableOpacity hitSlop={getHitSlop(5)}>
            <Image source={EditIcon} style={styles.editImage} />
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
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        <BetweenText leftText={t('profileDetailName')} rightText={'Leandro'} />
        <View>
          <Text
            style={{
              marginTop: getHeightPixel(16),
              marginBottom: getHeightPixel(6),
            }}
            fontSize={`${16 * fontSize}`}>
            {t('profileDetailState')}
          </Text>
          <Text
            style={{marginBottom: getHeightPixel(16)}}
            fontSize={`${12 * fontSize}`}>
            asldjask djajsdkasjdkjas
          </Text>
        </View>
        <Line
          backgroundColor={Theme.color.gray}
          height={0.6}
          width={getPixel(320)}
        />
        <BetweenText
          leftText={t('profileDetailTel')}
          rightText={'+55 11 964845016'}
          isLine={false}
        />
        <View style={styles.betweenTextView}>
          <Text fontSize={`${16 * fontSize}`}>{t('profileDetailTelOpen')}</Text>
          <Toggle isOn={isOn} setIsOn={setIsOn} />
        </View>
        <Line
          backgroundColor={Theme.color.gray}
          height={0.6}
          width={getPixel(320)}
        />
        <BetweenText
          leftText={t('profileDetailEmail')}
          rightText={'onestore@gmail.com'}
        />
        <BetweenText leftText={t('profileDetailSex')} rightText={'남성'} />
        <BetweenText
          leftText={t('profileDetailDate')}
          rightText={'2000. 12. 12'}
        />
      </View>
    </View>
  );
}

export const BetweenText: React.FC<{
  leftText: string;
  rightText?: string;
  isLine?: boolean;
  rightTextStyle?: TextStyle;
}> = ({
  leftText,
  rightText,
  isLine = true,
  rightTextStyle = {
    color: Theme.color.black,
  },
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <>
      <View style={styles.betweenTextView}>
        <Text fontSize={`${16 * fontSize}`}>{leftText}</Text>
        <Text fontSize={`${16 * fontSize}`} style={rightTextStyle}>
          {rightText}
        </Text>
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
