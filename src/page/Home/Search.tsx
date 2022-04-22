import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import SearchHeader from '@/Components/Home/SearchHeader';
import {BoldText, GrayText, MediumText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {categoryMenu} from '@/assets/global/dummy';
import {CategoryCardProps} from '@/Types/Components/HomeTypes';

import AutoHeightImage from 'react-native-auto-height-image';
import Line from '@/Components/Global/Line';
import SearchKeyword from '@/Components/Home/SearchKeyword';

import Theme from '@/assets/global/Theme';
import ArrowDownIcon from '@assets/image/arrow_down_gray.png';
import checkboxIcon from '@assets/image/checkbox.png';
import MenuOffIcon from '@assets/image/menu_ver.png';
import MenuOnIcon from '@assets/image/menu_ver1.png';
import ProductList from '@/Components/Home/ProductList';
import ModalFilter from '../../Components/Home/ModalFilter';
import useBoolean from '@/Hooks/useBoolean';
import ModalKeyword from '@/Components/Home/ModalKeyword';
import CloseBlackIcon from '@assets/image/close_black.png';
import {SearchProps} from '@/Types/Screen/Screen';
import {categoryMenuTypes} from '@/Types/Components/global';
import {useIsFocused} from '@react-navigation/native';

export default function Search({route: {params}}: SearchProps): JSX.Element {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const isFocused = useIsFocused();
  const [isList, setIsList] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(false);
  const {
    value: isFilter,
    setValue: setIsFilter,
    on: onIsFilter,
    off: offIsFilter,
  } = useBoolean(false);
  const {
    value: isKeyword,
    setValue: setIsKeyword,
    on: onIsKeyword,
    off: offIsKeyword,
  } = useBoolean(false);
  const [popularList, setPopularList] = useState<Array<string>>([
    '자전거',
    '의자',
    '냉장고',
    '노트북',
    '캠핑',
    '가방',
    '에어팟',
    '아이패드',
    '애플워치',
  ]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectKeyword, setSelectKeyword] = useState<
    categoryMenuTypes['menu'] | null | undefined
  >();

  const onPressCloseKeyword = useCallback(() => {
    setSelectKeyword(null);
  }, []);

  useEffect(() => {
    if (params?.category) {
      setSelectKeyword(params.category);
    }
    if (params?.keyword) {
      setSearchText(params.keyword);
    }
  }, [isFocused]);
  const isSearch =
    searchText.length > 0 || (selectKeyword && selectKeyword?.length > 0);
  return (
    <View style={styles.mainContainer}>
      <SearchHeader
        keyword={selectKeyword ?? undefined}
        text={searchText}
        setText={setSearchText}
        onPressCloseKeyword={onPressCloseKeyword}
      />

      <ScrollView>
        {isSearch ? (
          <>
            <SearchKeyword
              onPressFilter={onIsFilter}
              onPressKeyword={onIsKeyword}
            />
            <View style={styles.isSearchView}>
              <View style={styles.checkboxView}>
                <Image source={checkboxIcon} style={styles.checkboxImage} />
                <Text fontSize={`${14 * fontSize}`}>{t('searchSale')}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsList(prev => !prev);
                }}>
                <Image
                  source={!isList ? MenuOnIcon : MenuOffIcon}
                  style={{
                    width: getPixel(20),
                    height: getPixel(20),
                  }}
                />
              </TouchableOpacity>
            </View>
            <ProductList list={[1, 2, 3, 4, 5]} isList={isList} />
            <Modal visible={isFilter} transparent onRequestClose={offIsFilter}>
              {isFilter && <ModalFilter onClose={offIsFilter} />}
            </Modal>
            <Modal
              visible={isKeyword}
              transparent
              animationType="slide"
              onRequestClose={offIsKeyword}>
              {isKeyword && (
                <ModalKeyword onClose={offIsKeyword} keyword={searchText} />
              )}
            </Modal>
          </>
        ) : (
          <>
            <View style={styles.popularContainer}>
              <Text fontSize={`${18 * fontSize}`} medium>
                {t('searchTitleText')}
              </Text>
              <View style={styles.popularListContainer}>
                {popularList.map((item, index) => (
                  <TouchableOpacity
                    key={item + index}
                    onPress={() => {
                      setSearchText(item);
                    }}
                    style={styles.popularListView}>
                    <MediumText
                      fontSize={`${12 * fontSize}`}
                      letterSpacing="0px">
                      {item}
                    </MediumText>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.searchListTitleView}>
                <Text fontSize={`${18 * fontSize}`} medium>
                  {t('searchRecentSearches')}
                </Text>
                <TouchableOpacity>
                  <GrayText fontSize={`${14 * fontSize}`}>
                    {t('allDelete')}
                  </GrayText>
                </TouchableOpacity>
              </View>
              <View style={styles.searchListRowView}>
                {[
                  1, 2, 3, 4, 5, 61, 2, 3, 4, 5, 61, 2, 3, 4, 5, 61, 2, 3, 4, 5,
                  61, 2, 3, 4, 5, 61, 2, 3, 4, 5, 6,
                ].map((item, index) => {
                  return (
                    <View style={styles.searchListView}>
                      <Text fontSize={`${14 * fontSize}`} medium>
                        검색항목
                      </Text>
                      <Image
                        source={CloseBlackIcon}
                        style={styles.closeBlack}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const CategoryCard: React.FC<CategoryCardProps> = ({name, image}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <TouchableOpacity style={styles.categoryCardContainer}>
      <View style={styles.categoryCardView}>
        <AutoHeightImage source={image} width={getPixel(33)} />
      </View>
      <Text fontSize={`${12 * fontSize}`}>{t(name)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchListTitleView: {
    width: getPixel(328),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeightPixel(40),
  },
  searchListRowView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  closeBlack: {
    width: getPixel(12.84),
    height: getPixel(12.84),
  },
  searchListView: {
    width: getPixel(146),
    height: getHeightPixel(44),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderBottomColor: Theme.color.gray,
  },
  isSearchView: {
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
    marginVertical: getHeightPixel(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeightPixel(10),
  },
  checkboxImage: {
    width: getPixel(18),
    height: getPixel(18),
    marginRight: getPixel(4),
  },
  moreTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeightPixel(36),
  },
  categoryCardView: {
    width: getPixel(46),
    height: getPixel(46),
    backgroundColor: Theme.color.whiteGray_F6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCardContainer: {
    width: getPixel(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeightPixel(20),
  },
  mainContainer: {flex: 1, backgroundColor: Theme.color.whiteGray_F6},
  subContainer: {
    width: getPixel(360),

    paddingTop: getHeightPixel(26),
    borderBottomLeftRadius: getPixel(20),
    borderBottomRightRadius: getPixel(20),

    backgroundColor: Theme.color.white,
  },
  categoryView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getPixel(320),
    marginBottom: getHeightPixel(30),
  },
  popularContainer: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(35),
  },
  popularListContainer: {
    marginTop: getHeightPixel(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getPixel(328),
  },
  popularListView: {
    paddingHorizontal: getPixel(8),
    paddingVertical: getHeightPixel(6),
    backgroundColor: Theme.color.white,
    marginRight: getPixel(8),
    marginBottom: getHeightPixel(8),
  },
});

{
  /* <View style={styles.subContainer}>
              <View style={{paddingHorizontal: getPixel(20)}}>
                <BoldText fontSize={`${24 * fontSize}`}>
                  {t('searchTitle')}
                </BoldText>
                <GrayText fontSize={`${14 * fontSize}`}>
                  {t('searchSubTitle')}
                </GrayText>
                <View style={styles.categoryView}>
                  {categoryMenu.map((item, index) => {
                    if (!isMore && index > 7) {
                      return;
                    }
                    return (
                      <Fragment key={item.name + index}>
                        <CategoryCard name={item.name} image={item.image} />
                      </Fragment>
                    );
                  })}
                </View>
              </View>
              {!isMore && (
                <>
                  <Line
                    backgroundColor={Theme.color.gray}
                    width={getPixel(360)}
                  />
                  <TouchableOpacity
                    onPress={() => setIsMore(prev => !prev)}
                    style={styles.moreTouch}>
                    <GrayText fontSize={`${12 * fontSize}`}>
                      {t('more')}
                    </GrayText>
                    <AutoHeightImage
                      source={ArrowDownIcon}
                      width={getPixel(10)}
                      style={{marginLeft: getPixel(3)}}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View> */
}
