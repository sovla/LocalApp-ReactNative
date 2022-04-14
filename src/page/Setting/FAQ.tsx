import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import FAQItem from '@/Components/Setting/FAQItem';

export default function FAQ() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [menu, setMenu] = useState<string>(t('operationPolicy'));
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const FAQMenuList: string[] = [
    'operationPolicy',
    'accountAuthentication',
    'buySell',
    'transactionItems',
    'usagePolicy',
    'other',
    'businessProfile',
    'chatting',
  ];
  return (
    <View>
      <Header title={t('FAQTitle')} />

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.headerView}>
              <Image source={BangBlackIcon} style={styles.bangImage} />
              <Text style={styles.titleMargin} fontSize={`${14 * fontSize}`}>
                {t('faqGuide1')}
              </Text>
              <View>
                <TextInput
                  placeholder={t('faqGuidePh')}
                  placeholderTextColor={Theme.color.gray}
                  style={[
                    styles.searchInput,
                    {
                      fontSize: fontSize * 14,
                    },
                  ]}
                />
              </View>
              <Line height={getHeightPixel(10)} style={styles.marginTop} />
            </View>
            <FlatList
              data={FAQMenuList}
              renderItem={({item, index}) => {
                const color =
                  t(item) === menu ? Theme.color.blue_3D : Theme.color.gray;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setMenu(t(item));
                    }}
                    style={{
                      ...styles.headerMenuListView,
                      borderBottomColor: color,
                      borderBottomWidth: t(item) === menu ? 2 : 1,
                    }}>
                    <Text
                      style={{
                        color: color,
                      }}
                      fontSize={`${16 * fontSize}`}>
                      {t(item)}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              horizontal
            />
          </>
        }
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({item, index}) => {
          return (
            <FAQItem
              setSelect={() =>
                setSelectNumber(prev => (prev > 0 ? 0 : index + 1))
              }
              isSelect={selectNumber === index + 1}
              title="중고거래 운영정책"
              answer={`로컬앱은 동네 이웃 간의 연결을 도와 따뜻하고 활발한 교류가 있는 지역 사회를 만들기 위해 신뢰, 존중, 윤리 바탕으로 서비스의 제공하여 로컬앱을 사용하는 이웃 모두가 동참하여 이 가치를 지키기 위해 최선을 다하고 따뜻하고 믿을 수 있는 거래 문화를 함께 만들어가는것을 목표로 하고있습니다.`}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerMenuListView: {
    width: getPixel(100),
    height: getHeightPixel(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: getHeightPixel(20),
  },
  headerView: {
    alignItems: 'center',
    marginHorizontal: getPixel(16),
  },
  bangImage: {
    width: getPixel(43.33),
    height: getPixel(43.33),
    marginTop: getHeightPixel(35),
  },
  titleMargin: {
    marginTop: getHeightPixel(15),
    marginBottom: getHeightPixel(20),
  },
  searchInput: {
    width: getPixel(328),
    height: getHeightPixel(40),
    backgroundColor: Theme.color.gray_F5,
    borderRadius: getPixel(20),
    color: Theme.color.black,
    paddingLeft: getPixel(18),
    paddingRight: getPixel(40),
    includeFontPadding: false,
  },
});
