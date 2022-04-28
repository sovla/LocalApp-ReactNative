import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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
import {brPrice, getHitSlop} from '@/Util/Util';
import {LikeListProps} from '@/Types/Screen/Screen';
import useApi from '@/Hooks/useApi';
import {LikeListType} from '@/Types/Components/HomeTypes';

export default function LikeList({navigation}: LikeListProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [likeList, setLiekList] = useState<Array<any>>([1, 2, 3, 4, 5]);
  const [page, setPage] = useState(1);

  const {data, isLoading, isError, errorMessage} = useApi<
    LikeListType['T'],
    LikeListType['D']
  >(null, 'product_like_list.php', {
    mt_idx: user.mt_idx,
    page: page,
  });

  const onPressDelete = () => {
    setIsEdit(false);
  };
  const onPressSave = () => {
    setIsEdit(false);
  };
  const onPressItem = useCallback(() => {
    navigation.navigate('ProductDetail');
  }, []);

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
          <TouchableOpacity
            hitSlop={getHitSlop(5)}
            onPress={() => setIsEdit(prev => !prev)}>
            <WhiteText fontSize={`${16 * fontSize}`}>
              {t('likeListEdit')}
            </WhiteText>
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={onPressDelete}
              hitSlop={getHitSlop(5)}
              style={{
                marginRight: getPixel(20),
              }}>
              <WhiteText fontSize={`${16 * fontSize}`}>
                {t('likeListDelete')}
              </WhiteText>
            </TouchableOpacity>
            <TouchableOpacity hitSlop={getHitSlop(5)} onPress={onPressSave}>
              <WhiteText fontSize={`${16 * fontSize}`}>
                {t('likeListSave')}
              </WhiteText>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
      <FlatList
        ListHeaderComponent={
          isEdit ? (
            <TouchableOpacity
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
        renderItem={({item, index}) => {
          return (
            <LikeProduct
              onPress={onPressItem}
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
              idx={item?.like_idx}
              isEdit={isEdit}
            />
          );
        }}
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
