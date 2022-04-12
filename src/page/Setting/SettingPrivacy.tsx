import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';

export default function SettingPrivacy() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useAppNavigation();
  const onPressDeleteAccount = () => {
    navigation.navigate('SettingDeleteAccount');
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header title={t('settingPrivacyTitle')} />
      <View style={styles.sidePadding}>
        <GrayText
          style={{
            marginTop: getHeightPixel(30),
          }}
          fontSize={`${12 * fontSize}`}>
          {t('settingPrivacySubTitle')}
        </GrayText>
        <View style={styles.betweenBox}>
          <Text fontSize={`${16 * fontSize}`}>
            {t('businessProfileSettingShopTelOpen')}
          </Text>
          <Toggle isOn={isOpen} setIsOn={setIsOpen} />
        </View>
        <Line isGray />
        <View style={styles.betweenBox}>
          <Text fontSize={`${16 * fontSize}`}>
            {t('businessProfileSettingShopTelOpen')}
          </Text>
          <TouchableOpacity>
            <Text fontSize={`${16 * fontSize}`} color={Theme.color.blue_3D}>
              010-9999-9999
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Line height={getHeightPixel(10)} />
      <View style={styles.sidePadding}>
        <GrayText
          style={{
            marginTop: getHeightPixel(30),
          }}
          fontSize={`${12 * fontSize}`}>
          {t('settingPrivacySubTitle2')}
        </GrayText>
        <TouchableOpacity
          onPress={onPressDeleteAccount}
          style={styles.betweenBox}>
          <Text fontSize={`${16 * fontSize}`}>{t('settingPrivacyExit')}</Text>
        </TouchableOpacity>
        <Line isGray />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidePadding: {
    marginHorizontal: getPixel(16),
  },
  betweenBox: {
    width: getPixel(328),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: getHeightPixel(50),
    alignItems: 'center',
  },
});
