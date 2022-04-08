import {
  View,
  Switch,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {GrayText, MediumText, Text} from '@/Components/Global/text';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Toggle} from '@/Components/Global/button';
import Theme from '@/assets/global/Theme';
import {CloseIconImage} from '@/Components/Global/image';
import {getHitSlop} from '@/Util/Util';

export default function KeywordAlarm() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const [isOn, setIsOn] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [keywordList, setKeywordList] = useState<Array<string>>([
    '커피머신기',
    '아이폰',
  ]);

  return (
    <View>
      <Header title={t('KeywordAlarm')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
          marginTop: getHeightPixel(40),
        }}>
        <MediumText fontSize={`${20 * fontSize}`}>
          {t('KeywordAlarm')}
        </MediumText>
        <GrayText fontSize={`${12 * fontSize}`} style={styles.marginTop10}>
          {t('KeywordAlarmText1')}
        </GrayText>
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-between',
            marginTop: getHeightPixel(20),
            marginBottom: getHeightPixel(30),
          }}>
          <Text fontSize={`${16 * fontSize}`}>{t('KeywordAlarmText2')}</Text>
          <Toggle isOn={isOn} setIsOn={setIsOn} />
        </View>
        <Text fontSize={`${16 * fontSize}`}>
          {t('KeywordAlarmText3') + `(${keywordList.length}/20)`}
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              fontSize: fontSize * 14,
            },
          ]}
          placeholder={t('KeywordAlarmPlaceHolder')}
          placeholderTextColor={Theme.color.gray}
          value={keyword}
          onChangeText={setKeyword}
        />
        {Array.isArray(keywordList) &&
          keywordList.map(item => {
            return (
              <View style={styles.keywordListView}>
                <Text fontSize={`${14 * fontSize}`}>{item}</Text>
                <TouchableOpacity
                  hitSlop={getHitSlop(5)}
                  onPress={() => {
                    setKeywordList(prev => prev.filter(v => v !== item));
                  }}>
                  <CloseIconImage isGray />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keywordListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getPixel(328),
    height: getHeightPixel(50),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
    alignItems: 'center',
  },
  textInput: {
    width: getPixel(328),
    height: getHeightPixel(45),
    includeFontPadding: false,
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
    color: Theme.color.black,
  },
  marginTop10: {
    marginTop: getHeightPixel(10),
  },
});
