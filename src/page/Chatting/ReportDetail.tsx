import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '@/Components/LoginSignUp/Header';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {TextInput} from 'react-native-gesture-handler';

import {ReportDetailProps} from '@/Types/Screen/Screen';
import {useNavigationState} from '@react-navigation/native';

export default function ReportDetail({
  route: {
    params: {reportType},
  },
  navigation,
}: ReportDetailProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const title = (() => {
    switch (reportType) {
      case 'prohibited':
        return 'reportGuideTitle1';
      case 'scam':
        return 'reportGuideTitle3';
      case 'unmanned':
        return 'reportGuideTitle2';
    }
  })();

  const prohibitedMenuList = [
    t('lifeTrade'),
    t('weapon'),
    t('drugs'),
    t('privacy'),
    t('charityProduct'),
    t('medicalEquipment'),
    t('other'),
  ];

  const userName = 'NETSHOES';
  const [text, setText] = useState<string>('');
  const [selectMenu, setSelectMenu] = useState<number>(0);
  const naviState = useNavigationState(state => state);
  const onPressReport = useCallback(() => {
    // 수정필요 API치기
    const count = reportType == 'prohibited' ? 0 : 1;
    navigation.reset({
      index: naviState.index - count,
      routes: naviState.routes.filter(
        (value, index) => index < naviState.index - count,
      ),
    });
  }, [naviState]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
      enabled={Platform.OS === 'android'}>
      <Header title={t(`${title}`)} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
        }}>
        {reportType === 'prohibited' && (
          <View>
            {prohibitedMenuList.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectMenu(index);
                  }}
                  style={styles.menuListTouch}>
                  <CheckBoxImage isOn={index === selectMenu} />
                  <Text
                    style={styles.menuListText}
                    fontSize={`${16 * fontSize}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <Line isGray style={styles.line} />
          </View>
        )}
        {(reportType === 'scam' || reportType === 'unmanned') && (
          <View style={styles.line}>
            <Text fontSize={`${14 * fontSize}`} medium style={styles.textWidth}>
              {`'${userName}'${t('reportGuide2')}`}
            </Text>
            <GrayText fontSize={`${14 * fontSize}`} style={styles.grayText}>
              {reportType === 'scam' ? t('reportGuide4') : t('reportGuide3')}
            </GrayText>
          </View>
        )}
        <View style={styles.line}>
          <Text fontSize={`${14 * fontSize}`} medium>
            {t('reportGuide1')}
          </Text>
          <TextInput
            onChangeText={setText}
            style={[
              styles.reportInput,
              {
                fontSize: fontSize * 14,
              },
            ]}
            multiline
            textAlignVertical="top"
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        onPress={onPressReport}
        content={t('submit')}
        style={styles.footerButton}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  footerButton: {
    width: getPixel(328),
    position: 'absolute',
    bottom: getHeightPixel(32),
    left: getPixel(16),
  },
  textWidth: {
    width: getPixel(328),
  },
  grayText: {
    width: getPixel(328),
    marginTop: getHeightPixel(20),
  },
  reportInput: {
    width: getPixel(328),
    height: getHeightPixel(72),
    borderWidth: 1,
    borderColor: Theme.color.gray,
    borderRadius: 4,
    marginTop: getHeightPixel(10),
    color: Theme.color.black,
  },
  menuListTouch: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    marginTop: getHeightPixel(30),
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  menuListText: {
    marginLeft: getPixel(20),
    width: getPixel(280),
  },
});
