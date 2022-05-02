import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Menu from '@/Components/Profile/Menu';
import {getHeightPixel} from '@/Util/pixelChange';
import Product from '@/Components/Home/Product';
import {ProductProps} from '@/Types/Components/HomeTypes';
import {ProfileSellProductProps} from '@/Types/Screen/Screen';
import {ProfileSellProductAPi} from '@/Types/Components/ProfileTypes';
import useApi from '@/Hooks/useApi';
import {useIsFocused} from '@react-navigation/native';

export default function ProfileSellProduct({}: ProfileSellProductProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);
  const isFocused = useIsFocused();
  const [list, setList] = useState<Array<ProductProps>>([1, 2, 3, 4, 5]);
  const [selectMenu, setSelectMenu] = useState<any>(t('ProfileSellProductComplete'));
  const {data, isLoading, isError, errorMessage, getData} = useApi<ProfileSellProductAPi['T'], ProfileSellProductAPi['D']>(null, 'sell_product_list.php', {
    mt_idx: user?.mt_idx ?? 'error',
    type: selectMenu === t('ProfileSellProductComplete') ? 'Y' : 'N',
  });

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  return (
    <View>
      <Header title={t('profileHomeSaleProduct')} />
      <View style={{height: getHeightPixel(20)}}></View>
      <Menu menuList={[t('ProfileSellProduct'), t('ProfileSellProductComplete')]} selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
      <FlatList
        contentContainerStyle={{
          paddingBottom: getHeightPixel(150),
        }}
        data={list}
        renderItem={({item, index}) => {
          return <Product isList />;
        }}
      />
    </View>
  );
}
