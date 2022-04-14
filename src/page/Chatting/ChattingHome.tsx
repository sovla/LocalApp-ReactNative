import {View, FlatList, Touchable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/Chatting/Header';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import dummy from '@assets/image/dummy.png';
import Line from '@/Components/Global/Line';
import Theme from '@/assets/global/Theme';
import {ChattingProps} from '@/Types/Components/ChattingTypes';
import Chatting from '@/Components/Chatting/Chatting';
import Footer from '@/Components/Home/Footer';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

export default function ChattingHome() {
  const navigation = useAppNavigation();
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [chattingList, setChattingList] = useState<Array<ChattingProps | any>>([
    1, 2, 3, 4, 5,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header />
      <FlatList
        data={chattingList}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChattingDetail');
                }}>
                <Chatting
                  image={dummy}
                  title="초강력 흡입 차량용 무선 청소기"
                  content="I like rainbow colors, the meds i take make me see things most..."
                  date="오후 11:20"
                />
              </TouchableOpacity>
              <Line
                backgroundColor={Theme.color.gray}
                style={{
                  marginTop: getHeightPixel(20),
                }}
              />
            </>
          );
        }}
        style={{
          marginTop: getHeightPixel(5),
          marginHorizontal: getPixel(16),
        }}
      />
      <Footer menu="chat" />
    </View>
  );
}
