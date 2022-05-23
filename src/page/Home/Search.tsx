import {View, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import SearchHeader from '@/Components/Home/SearchHeader';
import {GrayText, MediumText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {PopularSearchTextApi, RecentAllDeleteApi, RecentDeleteApi, RecentSearchTextApi, SearchApi, SearchLogApi} from '@/Types/Components/HomeTypes';

import SearchKeyword from '@/Components/Home/SearchKeyword';

import Theme from '@/assets/global/Theme';
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
import useApi from '@/Hooks/useApi';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import useStateCallback from '@/Hooks/useStateCallback';
import Loading from '@/Components/Global/Loading';
import {AlertButton, brPrice, findCategory, productTimeSetting, viewCountCheck} from '@/Util/Util';
import {CheckBoxImage} from '@/Components/Global/button';
import Product from '@/Components/Home/Product';

export interface FilterState {
    order: undefined | 0 | 1 | 2 | 3;
    s_price: undefined | number;
    e_price: undefined | number;
    grade: undefined | string;
}

export default function Search({route: {params}, navigation}: SearchProps): JSX.Element {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const isFocused = useIsFocused();
    const [isList, setIsList] = useState<boolean>(true);
    const [isMore, setIsMore] = useState<boolean>(false);
    const {value: isFilter, on: onIsFilter, off: offIsFilter} = useBoolean(false);
    const {value: isKeyword, on: onIsKeyword, off: offIsKeyword} = useBoolean(false);
    const {value: isSale, toggle: toggleIsSale, on: onIsSale, off: offIsSale} = useBoolean(false);

    const [searchText, setSearchText] = useStateCallback<string>(''); // 검색 텍스트
    const [selectKeyword, setSelectKeyword] = useStateCallback<categoryMenuTypes['menu'] | null | undefined>(null); // 선택 키워드
    const [filter, setFilter] = useState<FilterState>({
        order: undefined,
        s_price: 0,
        e_price: 5000000,
        grade: undefined,
    });

    const {
        data: recentList,
        setData: setRecentList,
        getData: recentGetData,
    } = useApi<
        // 최근 검색어
        RecentSearchTextApi['T'],
        RecentSearchTextApi['D']
    >([], 'search_recent_list.php', {
        mt_idx: user.mt_idx,
    });

    const {data: popularList} = useApi<
        // 인기 검색어
        PopularSearchTextApi['T'],
        PopularSearchTextApi['D']
    >([], 'search_keyword_list.php');

    const {getData: sendSearchLog} = useApi<SearchLogApi['T'], SearchLogApi['D']>( // 서치 로그
        null,
        'search_log.php',
        {
            mt_idx: user.mt_idx as string,
            search_txt: searchText,
        },
        {isFirst: false},
    );

    const {
        data: searchData,
        getData: sendSearch,
        isLoading,
        isComplete,
    } = useApi<SearchApi['T'], SearchApi['D']>( // 검색 api
        {
            list: [],
        },
        'product_normal_list.php',
        {
            mt_idx: user.mt_idx as string,
            search_txt: searchText,
            ...filter,
            category: findCategory(selectKeyword),
            pt_fin: isSale ? 'N' : 'Y',
        },
        {isFirst: false, isList, listField: 'list'},
    );

    const {getData: sendAllDelete} = useApi<RecentAllDeleteApi['T'], RecentAllDeleteApi['D']>( // 모두 삭제
        null,
        'search_recent_all_delete.php',
        {
            mt_idx: user.mt_idx,
        },
        {isFirst: false},
    );
    const {getData: sendDelete} = useApi<RecentDeleteApi['T'], RecentDeleteApi['D']>( // 검색어 삭제
        null,
        'search_recent_delete.php',
        {
            mt_idx: user.mt_idx,
        },
        {isFirst: false},
    );

    const onPressCloseKeyword = useCallback(() => {
        setSelectKeyword(null, () => {
            onSubmitEditing({
                category: undefined,
            });
        });
    }, []);

    const onPressItem = useCallback((idx: string, cate: string) => {
        navigation.navigate('ProductDetail', {
            pt_cate: cate,
            pt_idx: idx,
        });
    }, []);

    const onSubmitEditing = (_data?: any) => {
        if (searchText) {
            sendSearchLog();
        }
        sendSearch(_data);
        console.log('sendSearch');
    };

    const onPressKeyword = () => {
        if (searchText) {
            onIsKeyword();
        } else {
            AlertButton(t('requireKeyword'));
        }
    };

    const onPressRecentDelete = useCallback(() => {}, []);

    const onPressAllDelete = useCallback(() => {
        sendAllDelete();
        setRecentList([]);
    }, []);

    useUpdateEffect(() => {
        if (isFocused) {
            onSubmitEditing({
                page: 1,
            });
        }
    }, [filter, isSale]);
    useEffect(() => {
        if (params?.category && params?.keyword) {
            setSelectKeyword(params.category);
            setSearchText(params.keyword);
            onSubmitEditing({
                category: findCategory(params.category),
                search_txt: params.keyword,
            });
        } else {
            if (params?.category) {
                setSelectKeyword(params.category);
                onSubmitEditing({
                    category: findCategory(params.category),
                });
            }
            if (params?.keyword) {
                setSearchText(params.keyword, (state: string) =>
                    onSubmitEditing({
                        search_txt: state,
                    }),
                );
            }
        }
    }, [isFocused]);

    const isSearch = isComplete;

    if (isLoading && !isComplete) {
        return (
            <View style={styles.mainContainer}>
                <SearchHeader keyword={selectKeyword ?? undefined} text={searchText} setText={setSearchText} onPressCloseKeyword={onPressCloseKeyword} onSubmitEditing={onSubmitEditing} />

                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <SearchHeader keyword={selectKeyword ?? undefined} text={searchText} setText={setSearchText} onPressCloseKeyword={onPressCloseKeyword} onSubmitEditing={onSubmitEditing} />

            <FlatList
                data={searchData.list}
                contentContainerStyle={
                    isList
                        ? {}
                        : {
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                          }
                }
                onEndReached={() => {
                    sendSearch();
                }}
                renderItem={({item, index}) => {
                    return (
                        <Fragment key={index + 'Product'}>
                            {!isList && (
                                <View
                                    style={{
                                        marginLeft: index % 2 === 0 ? getPixel(16) : getPixel(10),
                                    }}
                                />
                            )}

                            <Product
                                isLike={item.my_like === 'Y'}
                                image={
                                    item?.pt_file
                                        ? {
                                              uri: item.pt_file,
                                          }
                                        : require('@assets/image/none_image_m.png')
                                }
                                status={item.fin_status === 'Y' ? '판매완료' : item.fin_status === 'R' ? '예약중' : ''}
                                viewCount={viewCountCheck(item?.view_count ?? 0)}
                                likeCount={viewCountCheck(item?.like_count)}
                                price={brPrice(item?.pt_price ?? '0')}
                                time={` .  ${productTimeSetting(item?.pt_time ?? 0, item?.pt_time_type ?? 'now')}`}
                                location={`${item?.pt_location} ${item?.pt_location_detail}  .  ${item.dist?.toFixed(0)}${t('withinDistance')}`}
                                title={item?.pt_title ?? ''}
                                isList={isList}
                                onPress={onPressItem}
                                idx={item?.pt_idx ?? '0'}
                                cate={item?.pt_cate ?? '0'}
                            />
                        </Fragment>
                    );
                }}
                ListHeaderComponent={
                    <>
                        {isSearch ? (
                            <>
                                <SearchKeyword onPressFilter={onIsFilter} onPressKeyword={onPressKeyword} />
                                <View style={styles.isSearchView}>
                                    <TouchableOpacity onPress={toggleIsSale} style={styles.checkboxView}>
                                        <CheckBoxImage isBlue isOn={isSale} />
                                        <Text style={{marginLeft: getPixel(5)}} fontSize={`${14 * fontSize}`}>
                                            {t('searchSale')}
                                        </Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
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
                                    </TouchableOpacity> */}
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.popularContainer}>
                                    <Text fontSize={`${18 * fontSize}`} medium>
                                        {t('searchTitleText')}
                                    </Text>
                                    <View style={styles.popularListContainer}>
                                        {Array.isArray(popularList) &&
                                            popularList.map((item, index) => (
                                                <TouchableOpacity
                                                    key={item.title + index}
                                                    onPress={() => {
                                                        setSearchText(item.title, (state: any) => {
                                                            onSubmitEditing({
                                                                search_txt: state,
                                                            });
                                                        });
                                                    }}
                                                    style={styles.popularListView}>
                                                    <MediumText fontSize={`${12 * fontSize}`} letterSpacing="0px">
                                                        {item.title}
                                                    </MediumText>
                                                </TouchableOpacity>
                                            ))}
                                    </View>
                                    <View style={styles.searchListTitleView}>
                                        <Text fontSize={`${18 * fontSize}`} medium>
                                            {t('searchRecentSearches')}
                                        </Text>
                                        <TouchableOpacity onPress={onPressAllDelete}>
                                            <GrayText fontSize={`${14 * fontSize}`}>{t('allDelete')}</GrayText>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.searchListRowView}>
                                        {recentList.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSearchText(item.title, (state: any) => {
                                                            onSubmitEditing({
                                                                search_txt: state,
                                                            });
                                                        });
                                                    }}
                                                    style={styles.searchListView}>
                                                    <View>
                                                        <Text fontSize={`${14 * fontSize}`} medium>
                                                            {item.title}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            sendDelete({
                                                                sl_idx: item.sl_idx,
                                                            }).then(res => {
                                                                recentGetData();
                                                            });
                                                        }}>
                                                        <Image source={CloseBlackIcon} style={styles.closeBlack} />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            </>
                        )}
                    </>
                }
                ListEmptyComponent={
                    isSearch ? (
                        <View style={{flex: 1, paddingTop: getHeightPixel(220), alignItems: 'center'}}>
                            <GrayText medium fontSize={`${14 * fontSize}`}>
                                {t('noneSearchList')}
                            </GrayText>
                        </View>
                    ) : (
                        <></>
                    )
                }
            />
            {isFilter && (
                <Modal visible={isFilter} transparent onRequestClose={offIsFilter}>
                    {isFilter && (
                        <ModalFilter
                            onClose={offIsFilter}
                            setFilter={setFilter}
                            filter={filter}
                            isVehicle={selectKeyword === 'car' || selectKeyword === 'motorcycle'}
                            isCar={selectKeyword === 'car'}
                        />
                    )}
                </Modal>
            )}
            {isKeyword && (
                <Modal visible={isKeyword} transparent animationType="slide" onRequestClose={offIsKeyword}>
                    {isKeyword && <ModalKeyword onClose={offIsKeyword} keyword={searchText} />}
                </Modal>
            )}
        </View>
    );
}

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
