import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import Header from '@/Components/LoginSignUp/Header';
import {categoryMenu} from '@/assets/global/dummy';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyCategory() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const [menuList, setMenuList] = useState(
        categoryMenu.map(v => {
            return {
                ...v,
                isOn: true,
            };
        }),
    );
    const onPressMenu = useCallback(key => {
        setMenuList(prev =>
            prev.map(v => {
                if (v.name === key) {
                    return {
                        ...v,
                        isOn: !v.isOn,
                    };
                } else {
                    return v;
                }
            }),
        );
    }, []);

    useLayoutEffect(() => {
        (async () => {
            const result = await AsyncStorage.getItem('category');

            if (result && typeof result === 'string') {
                const category = result.split(',');
                // 있을경우
                setMenuList(prev =>
                    prev.map(v => {
                        if (category.find(fv => fv === v.name)) {
                            return {
                                ...v,
                                isOn: false,
                            };
                        } else {
                            return v;
                        }
                    }),
                );
            }
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(
            'category',
            menuList
                .filter(v => v.isOn === false)
                .map(v => v.name)
                .join(','),
        );
    }, [menuList]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Theme.color.whiteGray_F7,
            }}>
            <Header title={t('modalMyPageCategory')} />
            <View
                style={{
                    marginHorizontal: getPixel(16),
                }}>
                <View
                    style={{
                        marginTop: getHeightPixel(50),
                        marginBottom: getHeightPixel(30),
                    }}>
                    <Text fontSize={`${24 * fontSize}`} bold>
                        {t('myCategoryGuide1')}
                    </Text>
                    <GrayText fontSize={`${14 * fontSize}`}>{t('myCategoryGuide2')}</GrayText>
                </View>

                <View style={styles.selectCategoryView}>
                    {menuList.map(item => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    onPressMenu(item.name);
                                }}
                                style={{
                                    ...styles.mapTouch,
                                    backgroundColor: item.isOn ? Theme.color.blue_3D : Theme.color.white,
                                }}>
                                <Text fontSize={`${16 * fontSize}`} color={item.isOn ? Theme.color.white : Theme.color.gray}>
                                    {t(item.name)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapTouch: {
        paddingHorizontal: getPixel(10),
        paddingVertical: getHeightPixel(8),
        marginRight: getPixel(10),
        borderRadius: 50,
        marginBottom: getHeightPixel(14),
    },
    selectCategoryView: {
        width: getPixel(328),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
