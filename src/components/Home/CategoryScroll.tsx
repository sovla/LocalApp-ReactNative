import {FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {categoryMenu} from '@/assets/global/dummy';
import {CategoryCardProps} from '@/Types/Components/HomeTypes';
import {Text} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import Theme from '@/assets/global/Theme';
import {onScrollSlide} from '@/Util/Util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const CategoryScroll = () => {
    const isFocused = useIsFocused();

    const ref = useRef<FlatList>(null);
    const [dotList, setDotList] = useState<Array<number>>(new Array(Math.ceil(categoryMenu.length / 5)).fill(0));
    const [dotNumber, setDotNumber] = useState<number>(0);
    const [categoryList, setCategoryList] = useState(categoryMenu);

    useLayoutEffect(() => {
        (async () => {
            const result = await AsyncStorage.getItem('category');
            console.log(result, 'result :::');
            if (result && typeof result === 'string') {
                const category = result.split(',');

                const filterCateogoryMenu = categoryMenu.filter(v => {
                    if (category.find(fv => fv === v.name)) {
                        return undefined;
                    } else {
                        return 1;
                    }
                });
                setCategoryList(filterCateogoryMenu);
                setDotList(new Array(Math.ceil(filterCateogoryMenu.length / 5)).fill(0));
            } else {
                setCategoryList(categoryMenu);
                setDotList(new Array(Math.ceil(categoryMenu.length / 5)).fill(0));
            }
        })();
    }, [isFocused]);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollToIndex({
                index: 0,
            });
            setDotNumber(0);
        }

        return () => {};
    }, [categoryList]);

    if (categoryList.length === 0) {
        return null;
    }

    return (
        <View style={styles.scrollContainer}>
            <FlatList
                ref={ref}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={e => onScrollSlide(e, setDotNumber)}
                data={categoryList}
                renderItem={({item, index}) => {
                    return (
                        <>
                            <CategoryCard name={item.name} image={item.image} />
                            <View
                                style={{
                                    marginRight: getPixel((index + 1) % 5 === 0 ? 0 : 2), // 카드사이 2px  마진
                                }}
                            />
                        </>
                    );
                }}
                ListFooterComponent={
                    <View
                        style={{
                            width: categoryList.length % 5 !== 0 ? getPixel((5 - (categoryList.length % 5)) * 66) : 0,
                        }}
                    />
                }
            />

            <View style={styles.dotContainer}>
                {dotList.map((item, index) => {
                    return <Dot key={index + 'dot'} isOn={dotNumber === index} />;
                })}
            </View>
        </View>
    );
};

const CategoryCard: React.FC<CategoryCardProps> = ({name, image}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();

    const onPressItem = useCallback(() => {
        navigation.navigate('Search', {
            category: name,
        });
    }, [name, image]);

    return (
        <TouchableOpacity onPress={onPressItem} style={styles.cardContainer}>
            <View style={styles.cardImageView}>
                <Image source={image} style={styles.cardImage} />
            </View>
            <Text fontSize={`${10 * fontSize}`}>{t(name)}</Text>
        </TouchableOpacity>
    );
};

const Dot: React.FC<{isOn: boolean}> = ({isOn}) => {
    return (
        <View
            style={{
                width: isOn ? getPixel(24) : getPixel(7),
                height: getPixel(7),
                borderColor: Theme.color.gray,
                borderWidth: isOn ? 0 : getPixel(1.5),
                borderRadius: 100,
                backgroundColor: isOn ? Theme.color.gray : Theme.color.white,
                marginRight: getPixel(5),
            }}
        />
    );
};
export default CategoryScroll;

const styles = StyleSheet.create({
    dotContainer: {
        marginTop: getHeightPixel(20),
        width: getPixel(328),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImageView: {
        width: getPixel(46),
        height: getPixel(46),
        marginTop: getHeightPixel(9),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.color.white,
        borderRadius: 100,
    },
    cardImage: {width: getPixel(25), height: getPixel(25)},
    cardContainer: {
        width: getPixel(64),
        height: 'auto',
        minHeight: getHeightPixel(83),
        alignItems: 'center',
    },
    scrollContainer: {
        marginTop: getHeightPixel(20),
        marginHorizontal: getPixel(16),
        width: getPixel(328),
    },
});
