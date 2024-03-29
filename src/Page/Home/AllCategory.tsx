import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {categoryMenu} from '@/assets/global/dummy';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';

const AllCategory = () => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();

    const [isMore, setIsMore] = useState<boolean>(false);

    // const {data: popularList} = useApi<
    //     // 인기 검색어
    //     PopularSearchTextApi['T'],
    //     PopularSearchTextApi['D']
    // >([], 'search_keyword_list.php');

    const onPressCategory = useCallback(item => {
        navigation.navigate('Search', {
            category: item,
        });
    }, []);
    const onPressKeyword = useCallback(keyword => {
        navigation.navigate('Search', {
            keyword,
        });
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#F7F7F3',
            }}>
            <Header title={t('allCategoryTitle')} />
            <KeyboardAwareScrollView>
                <Line isGray />
                <View style={styles.categoryContainer}>
                    {categoryMenu.map((item, index) => {
                        if (!isMore && index > 8) {
                            return null;
                        }
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    onPressCategory(item.name);
                                }}
                                style={{
                                    ...styles.itemTouch,
                                    marginRight: (index + 1) % 3 !== 0 ? getPixel(10) : 0,
                                }}>
                                <AutoHeightImage source={item.image} width={getPixel(38)} />
                                <Text
                                    style={{
                                        marginTop: getHeightPixel(7),
                                    }}
                                    fontSize={`${12 * fontSize}`}>
                                    {t(item.name)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {!isMore && (
                    <>
                        <Line isGray />
                        <TouchableOpacity onPress={() => setIsMore(prev => !prev)} style={styles.moreTouch}>
                            <GrayText fontSize={`${16 * fontSize}`}>{t('more')}</GrayText>
                            <AutoHeightImage style={styles.marginLeft5} source={ArrowDownGrayIcon} width={getPixel(12)} />
                        </TouchableOpacity>
                    </>
                )}

                {/* <Line height={getHeightPixel(10)} />

                <View style={styles.popularContainer}>
                    <Text fontSize={`${18 * fontSize}`} medium>
                        {t('popularSearch')}
                    </Text>
                    <View style={styles.popularListContainer}>
                        {popularList.map((item, index) => (
                            <TouchableOpacity
                                key={item.title}
                                onPress={() => {
                                    onPressKeyword(item.title);
                                }}
                                style={styles.popularListView}>
                                <Text medium fontSize={`${12 * fontSize}`} letterSpacing="0px">
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View> */}
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AllCategory;

const styles = StyleSheet.create({
    moreTouch: {
        width: getPixel(360),
        height: getHeightPixel(58),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginLeft5: {
        marginLeft: getPixel(5),
    },
    categoryContainer: {
        flexDirection: 'row',
        width: getPixel(320),
        paddingTop: getHeightPixel(30),
        marginHorizontal: getPixel(20),
        flexWrap: 'wrap',
    },
    itemTouch: {
        width: getPixel(100),
        height: getPixel(100),
        backgroundColor: Theme.color.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getHeightPixel(16),
    },
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
    categoryCardView: {
        width: getPixel(46),
        height: getPixel(46),
        backgroundColor: Theme.color.whiteGray_F6,
        borderRadius: getPixel(10),
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
        paddingHorizontal: getPixel(9),
        paddingVertical: getHeightPixel(8),
        backgroundColor: Theme.color.white,
        borderRadius: getPixel(15),
        marginRight: getPixel(8),
        marginBottom: getHeightPixel(8),
    },
});
