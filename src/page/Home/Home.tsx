import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {Fragment, useState} from 'react';
import Header from '@/Components/Home/Header';
import CategoryScroll from '@/Components/Home/CategoryScroll';
import HomeList from '@/Components/Home/HomeList';
import Theme from '@/assets/global/Theme';
import Product from '@/Components/Home/Product';
import dummy from '@assets/image/dummy.png';
import {getPixel} from '@/Util/pixelChange';

export default function Home(): JSX.Element {
  const [isList, setIsList] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Theme.color.whiteGray}}>
      <Header />
      <FlatList
        key={isList ? 'firstFlatList' : 'isListFlatList'}
        ListHeaderComponent={
          <>
            <CategoryScroll />
            <HomeList
              location="Bom Retiro"
              isList={isList}
              setIsList={setIsList}
            />
          </>
        }
        data={[1, 2, 3, 4, 5]}
        numColumns={isList ? 1 : 2}
        extraData={(item: any, index: {toString: () => any}) =>
          isList ? index.toString() + '#' : index.toString() + '_'
        }
        renderItem={({item, index}) => {
          return (
            <Fragment key={isList ? '_' + index : '#' + index}>
              {!isList && (
                <View
                  style={{
                    marginLeft: index % 2 === 0 ? getPixel(16) : getPixel(10),
                  }}
                />
              )}
              <Product
                isLike={item > 2}
                image={dummy}
                status={item === 2 ? '예약중' : item === 3 ? '판매완료' : ''}
                viewCount="999+"
                likeCount="999+"
                price="R$ 24.00"
                time=". 50분전 "
                location="Bom Retiro . 1km이내 "
                title="13,000Pa 초강력흡입력 [샤오미] 차량용 무선 핸디 청소기"
                isList={isList}
              />
            </Fragment>
          );
        }}
      />
    </View>
  );
}
