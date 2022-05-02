import {View, ImageBackground, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import BackWhiteIcon from '@assets/image/back_white.png';
import {GrayText, WhiteText} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import LikeProduct from '@/Components/Home/LikeProduct';
import Theme from '@/assets/global/Theme';
import Footer from '@/Components/Home/Footer';
import {AlertButton, brPrice, getHitSlop} from '@/Util/Util';
import {LikeListProps} from '@/Types/Screen/Screen';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {LikeListType} from '@/Types/Components/HomeTypes';

export default function LikeList({navigation}: LikeListProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const {data, isLoading, isError, errorMessage, getData} = useApi<LikeListType['T'], LikeListType['D']>(null, 'product_like_list.php', {
    mt_idx: user.mt_idx,
    page: page,
  });

  const {PostAPI} = usePostSend('product_like_list_del.php', {
    mt_idx: user.mt_idx,
    like_del_arr: deleteList.join(','),
  });

  const onPressDelete = () => {
    PostAPI().then(res => {
      if (res?.result === 'false') {
        return AlertButton(res.msg);
      } else {
        getData();
        setIsEdit(false);
      }
    });
  };
  const onPressSave = () => {
    setIsEdit(false);
  };
  const onPressItem = useCallback((idx: string, cate: string) => {
    navigation.navigate('ProductDetail', {
      pt_idx: idx,
      pt_cate: cate,
    });
  }, []);

  const onPressEditAddItem = useCallback((idx: string) => {
    setDeleteList(prev => [...prev, idx]);
  }, []);
  const onPressEditDeleteItem = useCallback((idx: string) => {
    setDeleteList(prev => prev.filter(v => v !== idx));
  }, []);

  const _renderItem = useCallback(
    ({item, index}) => {
      const isOn = deleteList.find(v => v === item?.like_idx) ? true : false;
      const _onPressItem = !isOn ? () => onPressEditAddItem(item?.like_idx ?? '0') : () => onPressEditDeleteItem(item?.like_idx ?? '0');
      const _onPress = () => onPressItem(item.pt_idx, item.pt_cate);
      return (
        <LikeProduct
          onPress={_onPress}
          status={item === 2 ? '예약중' : item === 3 ? '판매완료' : ''}
          price={brPrice(item?.pt_price ?? '')}
          title={item?.pt_title ?? ''}
          image={
            item?.pt_file
              ? {
                  uri: item.pt_file,
                }
              : undefined
          }
          idx={item?.like_idx ?? '0'}
          categoryNum={item?.pt_cate ?? '0'}
          isEdit={isEdit}
          onPressItem={_onPressItem}
          isOn={isOn}
        />
      );
    },
    [deleteList, isEdit],
  );

  const onPressAllList = useCallback(() => {
    const allList = data?.list?.map(v => {
      if (v?.like_idx) {
        return v.like_idx;
      } else {
        return '';
      }
    });
    if (allList) {
      setDeleteList(allList);
    }
  }, [data]);

  return (
    <View style={{flex: 1, backgroundColor: Theme.color.whiteGray_F7}}>
      <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
        <View style={styles.headerLeftView}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={BackWhiteIcon} style={styles.backWhiteImage} />
          </TouchableOpacity>
          <WhiteText medium fontSize={`${20 * fontSize}`}>
            {t('likeListTitle')}
          </WhiteText>
        </View>
        {!isEdit ? (
          <TouchableOpacity hitSlop={getHitSlop(5)} onPress={() => setIsEdit(prev => !prev)}>
            <WhiteText fontSize={`${16 * fontSize}`}>{t('likeListEdit')}</WhiteText>
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onPressDelete} hitSlop={getHitSlop(5)} style={{}}>
              <WhiteText fontSize={`${16 * fontSize}`}>{t('likeListDelete')}</WhiteText>
            </TouchableOpacity>
            {/* <TouchableOpacity hitSlop={getHitSlop(5)} onPress={onPressSave}>
              <WhiteText fontSize={`${16 * fontSize}`}>
                {t('likeListSave')}
              </WhiteText>
            </TouchableOpacity> */}
          </View>
        )}
      </ImageBackground>
      <FlatList
        ListHeaderComponent={
          isEdit ? (
            <TouchableOpacity
              onPress={onPressAllList}
              style={{
                width: getPixel(360),
                alignItems: 'flex-end',
                paddingRight: getPixel(16),
                paddingBottom: getHeightPixel(5),
              }}>
              <GrayText>{t('likeListSelectAll')}</GrayText>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        data={data?.list ?? []}
        renderItem={_renderItem}
      />
      <Footer menu="favorite" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backWhiteImage: {
    width: getPixel(30),
    height: getPixel(30),
    marginRight: getPixel(10),
  },
  headerContainer: {
    width: getPixel(360),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    paddingHorizontal: getPixel(16),
    marginBottom: getHeightPixel(20),
  },
});
