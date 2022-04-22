import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';

export default function SettingAlarm() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [messageAlarm, setMessageAlarm] = useState(false);

  const [vibration, setVibration] = useState(false);
  const [isShow, setIsShow] = useState(false);
  return (
    <View>
      <Header title={t('settingMenu2')} />
      <View style={styles.container}>
        <GrayText fontSize={`${12 * fontSize}`}>{t('message')}</GrayText>
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('messageAlarm')}</Text>
          <Toggle isOn={messageAlarm} setIsOn={setMessageAlarm} />
        </View>
        <Line isGray width={getPixel(328)} />
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('alarmSoundSetting')}</Text>
          <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
            {t('alarmSettingDefault')}
          </Text>
        </View>
        <Line isGray width={getPixel(328)} />
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('vibration')}</Text>
          <Toggle isOn={vibration} setIsOn={setVibration} />
        </View>
        <Line isGray width={getPixel(328)} />
        <View style={styles.betweenView}>
          <View>
            <Text fontSize={`${16 * fontSize}`}>{t('alarmShow')}</Text>
            <GrayText fontSize={`${14 * fontSize}`}>
              {t('alarmShowGuide')}
            </GrayText>
          </View>

          <Toggle isOn={isShow} setIsOn={setIsShow} />
        </View>
        <Line isGray width={getPixel(328)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
  },
  betweenView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getHeightPixel(16),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
});
