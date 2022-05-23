import {Animated, Easing, Image, PanResponder, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {GrayText, MediumText, Text, WhiteText} from '@/Components/Global/text';
import Line from '@/Components/Global/Line';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';

import CloseBlackIcon from '@assets/image/close_black.png';
import {ModalFilterProps, ProductState, SearchApi} from '@/Types/Components/HomeTypes';
import {CheckBox} from '../Global/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Slider as MSlider} from '@miblanchard/react-native-slider';
import {getHitSlop, refDebounce} from '@/Util/Util';
import ResetIcon from '@assets/image/reset.png';
import SelectBlueIcon from '@assets/image/select_blue.png';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export type FilterMenuTypes = 'searchModalSortItem1' | 'searchModalSortItem2' | 'searchModalSortItem3' | 'searchModalSortItem4';

const ModalFilter: React.FC<ModalFilterProps> = ({onClose, setFilter, filter, isVehicle, isCar}) => {
    const [selectFilter, setSelectFilter] = useState<FilterMenuTypes>('searchModalSortItem1');
    const [productState, setProductState] = useState<ProductState>({
        newProduct: false,
        Reaper: false,
        used: false,
        forParts: false,
    });
    const [range, setRange] = useState([0, 5000000]);

    const [carFilter, setCarFilter] = useState({
        brand: null,
        model: null,
        s_year: 1950,
        e_year: new Date().getFullYear(),
        s_kilo: 0,
        e_kilo: 900000,
    });

    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const menu: FilterMenuTypes[] = ['searchModalSortItem1', 'searchModalSortItem2', 'searchModalSortItem3', 'searchModalSortItem4'];
    const menu1: {
        text: string;
        name: keyof ProductState;
    }[] = [
        {
            text: 'searchModalProductState1',
            name: 'newProduct',
        },
        {
            text: 'searchModalProductState2',
            name: 'Reaper',
        },
        {
            text: 'searchModalProductState3',
            name: 'used',
        },
        {
            text: 'searchModalProductState4',
            name: 'forParts',
        },
    ];

    const onPressApply = () => {
        onClose();
        setFilter((prev: Omit<SearchApi, 'mt_idx' | 'search_txt' | 'page' | 'category'>) => ({
            ...prev,
            order: menu.findIndex(v => v === selectFilter),
            s_price: range[0],
            e_price: range[1] > 1 ? range[1] : null,
            grade: Object.values(productState)
                .map((v, i) => {
                    if (v) {
                        return i;
                    }
                })
                .join('')
                .split('')
                .join(','),
        }));
    };

    const onPressReset = () => {
        setRange([0, 5000000]);
        setSelectFilter('searchModalSortItem1');
        setProductState({newProduct: false, Reaper: false, used: false, forParts: false});
    };

    useEffect(() => {
        if (filter.order) {
            setSelectFilter(menu[filter.order]);
        }
        if (filter.grade) {
            const grade = filter.grade.split(',');

            setProductState({
                newProduct: grade.includes('0'),
                Reaper: grade.includes('1'),
                used: grade.includes('2'),
                forParts: grade.includes('3'),
            });
        }
        setRange([filter?.s_price ?? 0, filter?.e_price ?? 0.5]);
    }, []);

    return (
        <View style={styles.dim}>
            <SlideRightModal onClose={onClose}>
                <KeyboardAwareScrollView style={{flex: 1}}>
                    <View
                        style={[
                            styles.subContainer,
                            isVehicle && {
                                width: getPixel(310),
                                marginLeft: 0,
                                marginRight: 0,
                            },
                        ]}>
                        <View
                            style={[
                                styles.titleView,
                                isVehicle && {
                                    marginLeft: getPixel(30),
                                    marginRight: getPixel(18),
                                },
                            ]}>
                            <MediumText fontSize={`${20 * fontSize}`}>{t('searchModalFilter')}</MediumText>
                            <TouchableOpacity hitSlop={getHitSlop(5)} onPress={onClose}>
                                <Image source={CloseBlackIcon} style={styles.titleCloseImage} />
                            </TouchableOpacity>
                        </View>
                        {isVehicle ? (
                            <>
                                <View style={styles.selectView}>
                                    <Text medium fontSize={`${18 * fontSize}`}>
                                        {t('carBrand')}
                                    </Text>
                                    <TouchableOpacity onPress={() => {}} style={styles.pickerTouch}>
                                        <GrayText fontSize={`${14 * fontSize}`}>{t('unSelected')}</GrayText>
                                        <Image source={SelectBlueIcon} style={styles.selectImage} />
                                    </TouchableOpacity>
                                </View>
                                <Line isGray />
                                <View style={[styles.selectView, {marginTop: getHeightPixel(27)}]}>
                                    <Text medium fontSize={`${18 * fontSize}`}>
                                        {t('pt_model')}
                                    </Text>
                                    <TouchableOpacity onPress={() => {}} style={styles.pickerTouch}>
                                        <GrayText fontSize={`${14 * fontSize}`}>{t('unSelected')}</GrayText>
                                        <Image source={SelectBlueIcon} style={styles.selectImage} />
                                    </TouchableOpacity>
                                </View>
                                <Line isGray />
                                <View style={styles.vehiclePriceRange}>
                                    <MediumText fontSize={`${18 * fontSize}`}>{t('searchModalPriceRange')}</MediumText>

                                    <MultiSlider
                                        values={range}
                                        max={5000000}
                                        min={0}
                                        markerOffsetY={getHeightPixel(3)}
                                        trackStyle={styles.trackStyle}
                                        containerStyle={styles.containerStyle}
                                        sliderLength={getPixel(240)}
                                        markerStyle={styles.thumbStyle}
                                        selectedStyle={{backgroundColor: Theme.color.blue_3D}}
                                        onValuesChange={value => {
                                            if (Array.isArray(value)) {
                                                setRange(value);
                                            }
                                        }}
                                        step={125000}
                                    />

                                    <View style={styles.priceText}>
                                        <TextInput
                                            value={range[0] !== 0 ? range[0].toString() : ''}
                                            onChangeText={t => {
                                                setRange(prev => [+t, prev[1]]);
                                            }}
                                            keyboardType="numeric"
                                            placeholder="R$ 0"
                                            style={[
                                                styles.priceTextInput,
                                                {
                                                    fontSize: fontSize * 14,
                                                },
                                            ]}
                                            placeholderTextColor={Theme.color.gray}
                                        />
                                        <View style={styles.middleLine} />
                                        <TextInput
                                            keyboardType="numeric"
                                            value={range[1] > 0.6 ? range[1].toString() : ''}
                                            onChangeText={t => {
                                                setRange(prev => [prev[0], +t]);
                                            }}
                                            placeholder={t('searchModalTextInputPlaceHolder')}
                                            style={[
                                                styles.priceTextInput,
                                                {
                                                    fontSize: fontSize * 14,
                                                },
                                            ]}
                                            placeholderTextColor={Theme.color.gray}
                                        />
                                    </View>
                                </View>
                                <Line isGray />
                                <View
                                    style={{
                                        marginLeft: getPixel(30),
                                        marginTop: getHeightPixel(25),
                                    }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', width: getPixel(260), justifyContent: 'space-between'}}>
                                        <MediumText fontSize={`${18 * fontSize}`}>{t('year')}</MediumText>
                                        <Text fontSize={`${12 * fontSize}`}>{`${carFilter.s_year}${t('profileYear')} ~ ${carFilter.e_year}${t('profileYear')}`}</Text>
                                    </View>
                                    <MultiSlider
                                        values={[carFilter.s_year, carFilter.e_year]}
                                        max={new Date().getFullYear()}
                                        min={1950}
                                        markerOffsetY={getHeightPixel(3)}
                                        trackStyle={styles.trackStyle}
                                        sliderLength={getPixel(240)}
                                        markerStyle={styles.thumbStyle}
                                        containerStyle={styles.containerStyle}
                                        selectedStyle={{backgroundColor: Theme.color.blue_3D}}
                                        onValuesChange={value => {
                                            if (Array.isArray(value)) {
                                                setCarFilter(prev => ({...prev, s_year: value[0], e_year: value[1]}));
                                            }
                                        }}
                                    />
                                </View>
                                <Line isGray />
                                <View
                                    style={{
                                        marginLeft: getPixel(30),
                                        marginBottom: getHeightPixel(70),
                                        marginTop: getHeightPixel(25),
                                    }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', width: getPixel(260), justifyContent: 'space-between'}}>
                                        <MediumText fontSize={`${18 * fontSize}`}>{t('pt_kilo')}</MediumText>
                                        <Text fontSize={`${12 * fontSize}`}>{`${carFilter.s_kilo.toLocaleString('pt-br')}${t('km')} ~ ${carFilter.e_kilo.toLocaleString('pt-br')}${t('km')}`}</Text>
                                    </View>
                                    <MultiSlider
                                        values={[carFilter.s_kilo, carFilter.e_kilo]}
                                        max={900000}
                                        min={0}
                                        markerOffsetY={getHeightPixel(3)}
                                        trackStyle={styles.trackStyle}
                                        sliderLength={getPixel(240)}
                                        markerStyle={styles.thumbStyle}
                                        containerStyle={styles.containerStyle}
                                        selectedStyle={{backgroundColor: Theme.color.blue_3D}}
                                        onValuesChange={value => {
                                            if (Array.isArray(value) && value.length === 2) {
                                                setCarFilter(prev => ({...prev, s_kilo: value[0], e_kilo: value[1]}));
                                            }
                                        }}
                                        step={1000}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                <View
                                    style={{
                                        marginTop: getHeightPixel(40),
                                    }}>
                                    <MediumText fontSize={`${18 * fontSize}`}>{t('searchModalsort')}</MediumText>
                                    {Array.isArray(menu) &&
                                        menu.map(v => {
                                            return (
                                                <CheckBox
                                                    key={v + 'CheckBox'}
                                                    setIsOn={() => {
                                                        setSelectFilter(v);
                                                    }}
                                                    isOn={selectFilter === v}
                                                    text={t(v)}
                                                />
                                            );
                                        })}
                                </View>

                                <Line backgroundColor={Theme.color.gray} style={styles.lineMargin} />

                                <View>
                                    <MediumText fontSize={`${18 * fontSize}`}>{t('searchModalPriceRange')}</MediumText>
                                    <MultiSlider
                                        values={range}
                                        max={5000000}
                                        min={0}
                                        markerOffsetY={getHeightPixel(3)}
                                        trackStyle={styles.trackStyle}
                                        sliderLength={getPixel(240)}
                                        markerStyle={styles.thumbStyle}
                                        containerStyle={styles.containerStyle}
                                        selectedStyle={{backgroundColor: Theme.color.blue_3D}}
                                        onValuesChange={value => {
                                            if (Array.isArray(value)) {
                                                setRange(value);
                                            }
                                        }}
                                        step={125000}
                                    />
                                    <View style={styles.priceText}>
                                        <TextInput
                                            value={range[0] !== 0 ? range[0].toString() : ''}
                                            onChangeText={t => {
                                                setRange(prev => [+t, prev[1]]);
                                            }}
                                            keyboardType="numeric"
                                            placeholder="R$ 0"
                                            style={[
                                                styles.priceTextInput,
                                                {
                                                    fontSize: fontSize * 14,
                                                },
                                            ]}
                                            placeholderTextColor={Theme.color.gray}
                                        />
                                        <View style={styles.middleLine} />
                                        <TextInput
                                            keyboardType="numeric"
                                            value={range[1] > 0.6 ? range[1].toString() : ''}
                                            onChangeText={t => {
                                                setRange(prev => [prev[0], +t]);
                                            }}
                                            placeholder={t('searchModalTextInputPlaceHolder')}
                                            style={[
                                                styles.priceTextInput,
                                                {
                                                    fontSize: fontSize * 14,
                                                },
                                            ]}
                                            placeholderTextColor={Theme.color.gray}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: getHeightPixel(40),
                                    }}>
                                    <MediumText fontSize={`${18 * fontSize}`}>{t('searchModalProductState')}</MediumText>
                                    <View style={styles.checkboxView}>
                                        {menu1.map(item => {
                                            return (
                                                <View
                                                    key={item.name}
                                                    style={{
                                                        width: getPixel(100),
                                                    }}>
                                                    <CheckBox
                                                        setIsOn={() => {
                                                            setProductState(p => ({
                                                                ...p,
                                                                [item.name]: !p[item.name],
                                                            }));
                                                        }}
                                                        isOn={productState[item.name]}
                                                        text={t(item.text)}
                                                        isBox
                                                    />
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.filterFooterButton}>
                    <TouchableOpacity onPress={onPressReset} style={styles.resetButtonTouch}>
                        <Image source={ResetIcon} style={styles.resetImage} resizeMode="contain" />
                        <Text color="#536073" fontSize={`${14 * fontSize}`}>
                            {t('reset')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={onPressApply}>
                        <WhiteText fontSize={`${14 * fontSize}`}>{t('apply')}</WhiteText>
                    </TouchableOpacity>
                </View>
            </SlideRightModal>
        </View>
    );
};

export default ModalFilter;

export const SlideRightModal: React.FC<any> = ({children, onClose}) => {
    const pan = useRef(new Animated.ValueXY({x: getPixel(310), y: 0})).current;

    // const panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: () => true,
    //   onPanResponderMove: Animated.event(
    //     [
    //       null,
    //       {
    //         dx: pan.x, // x,y are Animated.Value
    //       },
    //     ],
    //     {useNativeDriver: false},
    //   ),

    //   onPanResponderRelease: (e, g) => {
    //     if (g.dx > 150) {
    //       Animated.spring(
    //         pan, // Auto-multiplexed
    //         {
    //           toValue: {x: getPixel(310), y: 0},
    //           useNativeDriver: true,
    //           bounciness: 0,
    //         }, // Back to zero
    //       ).start();
    //       setTimeout(() => {
    //         onClose();
    //       }, 250);
    //     } else {
    //       Animated.spring(
    //         pan, // Auto-multiplexed
    //         {
    //           toValue: {x: 0, y: 0},
    //           useNativeDriver: true,
    //           bounciness: 0,
    //         }, // Back to zero
    //       ).start();
    //     }
    //   },
    // });

    useEffect(() => {
        Animated.spring(
            pan, // Auto-multiplexed
            {
                toValue: {x: 0, y: 0},
                useNativeDriver: true,
                bounciness: 0,
            }, // Back to zero
        ).start();
    }, []);

    return (
        <Animated.View
            // {...panResponder.panHandlers }
            style={[styles.animatedContainer, pan.getTranslateTransform()]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {marginLeft: getPixel(10)},
    footerContainer: {
        justifyContent: 'flex-end',
        marginBottom: getHeightPixel(20),
    },
    vehiclePriceRange: {
        marginTop: getHeightPixel(40),
        width: getPixel(310 - 46),
        marginLeft: getPixel(30),
    },
    thumbSize: {
        width: 40,
        height: 40,
    },
    thumbStyle: {
        backgroundColor: Theme.color.white,
        borderWidth: 1,
        borderColor: Theme.color.whiteGray_B7,
        width: getPixel(16),
        height: getPixel(16),
    },
    trackStyle: {
        backgroundColor: Theme.color.whiteGray_EE,
        height: getHeightPixel(6),
        borderRadius: 8,
    },
    middleLine: {width: getPixel(14), height: getPixel(2), backgroundColor: '#D9D9D9'},
    selectView: {
        marginLeft: getPixel(30),
        marginTop: getHeightPixel(40),
    },
    selectImage: {
        width: getPixel(8),
        height: getPixel(10),
    },
    pickerTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: getPixel(10),
        width: getPixel(310 - 56),
        paddingTop: getHeightPixel(16),
        paddingBottom: getHeightPixel(9),
        justifyContent: 'space-between',
    },
    applyButton: {
        width: getPixel(166),
        marginLeft: getPixel(8),
        height: getHeightPixel(40),
        backgroundColor: Theme.color.blue_3D,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterFooterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: getPixel(30),
        bottom: getHeightPixel(20),
    },
    resetImage: {width: getPixel(16), height: getPixel(16)},
    resetButtonTouch: {
        width: getPixel(96),
        height: getHeightPixel(40),
        backgroundColor: Theme.color.whiteBlue_F0,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    priceText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceTextInput: {
        width: getPixel(110),
        height: getHeightPixel(40),
        color: Theme.color.black,
        paddingHorizontal: getPixel(10),
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
    },
    lineMargin: {
        marginVertical: getHeightPixel(40),
    },
    dim: {
        backgroundColor: '#0007',
        flex: 1,
    },
    animatedContainer: {
        width: getPixel(310),
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: Theme.color.white,
        borderTopLeftRadius: getPixel(20),
    },
    subContainer: {
        marginLeft: getPixel(30),
        marginRight: getPixel(16),
        width: getPixel(310 - 46),
    },
    titleCloseImage: {width: getPixel(15), height: getPixel(15)},

    titleView: {
        marginTop: getHeightPixel(47),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
