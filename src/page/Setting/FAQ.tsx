import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
import useApi from '@/Hooks/useApi';
import {FAQApi} from '@/Types/API/SettingTypes';
import SearchBlackIcon from '@assets/image/search_black.png';
import {getHitSlop} from '@/Util/Util';

export default function FAQ() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const [menu, setMenu] = useState<number>(0);
    const [selectNumber, setSelectNumber] = useState<number>(0);
    const [searchText, setSearchText] = useState('');

    const {data, getData} = useApi<FAQApi['T'], FAQApi['D']>(null, 'qa_list.php', {
        search_txt: searchText,
    });

    const FAQMenuList: string[] =
        data !== null
            ? Object.values(data)
                  .map(v => Object.keys(v))
                  .flat()
            : [];

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
                            <View
                                style={{
                                    width: getPixel(328),
                                    backgroundColor: Theme.color.gray_F5,
                                    borderRadius: getPixel(20),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingRight: getPixel(22),
                                }}>
                                <TextInput
                                    placeholder={t('faqGuidePh')}
                                    placeholderTextColor={Theme.color.gray}
                                    style={[
                                        styles.searchInput,
                                        {
                                            fontSize: fontSize * 14,
                                        },
                                    ]}
                                    onEndEditing={() => getData()}
                                />

                                <TouchableOpacity onPress={() => getData()} hitSlop={getHitSlop(10)}>
                                    <Image
                                        source={SearchBlackIcon}
                                        style={{
                                            width: getPixel(18),
                                            height: getPixel(18),
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Line height={getHeightPixel(10)} style={styles.marginTop} />
                        </View>
                        <FlatList
                            data={FAQMenuList}
                            renderItem={({item, index}) => {
                                const color = index === menu ? Theme.color.blue_3D : Theme.color.gray;
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setMenu(index);
                                        }}
                                        style={{
                                            ...styles.headerMenuListView,
                                            borderBottomColor: color,
                                            borderBottomWidth: index === menu ? 2 : 1,
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
                data={data != null ? Object.values(data[menu])[0] : []}
                renderItem={({item, index}) => {
                    return <FAQItem setSelect={() => setSelectNumber(prev => (prev > 0 ? 0 : index + 1))} isSelect={selectNumber === index + 1} title={item.title} answer={item.content} />;
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
        flex: 1,
        height: getHeightPixel(40),

        color: Theme.color.black,
        paddingLeft: getPixel(18),
        paddingRight: getPixel(40),
        includeFontPadding: false,
    },
});
