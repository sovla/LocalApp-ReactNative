import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Menu from '@/Components/Profile/Menu';
import {getHeightPixel} from '@/Util/pixelChange';
import Product from '@/Components/Home/Product';
import {ProductProps} from '@/Types/Components/HomeTypes';

export default function ProfileSellProduct() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [list, setList] = useState<Array<ProductProps>>([1, 2, 3, 4, 5]);
  const [selectMenu, setSelectMenu] = useState<any>(
    t('ProfileSellProductComplete'),
  );
  return (
    <View>
      <Header title={t('profileHomeSaleProduct')} />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={{height: getHeightPixel(20)}}></View>
            <Menu
              menuList={[
                t('ProfileSellProduct'),
                t('ProfileSellProductComplete'),
              ]}
              selectMenu={selectMenu}
              setSelectMenu={setSelectMenu}
            />
          </>
        }
        data={list}
        renderItem={({item, index}) => {
          return <Product isList />;
        }}
      />
    </View>
  );
}
