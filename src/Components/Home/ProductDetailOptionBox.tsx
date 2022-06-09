import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

const ProductDetailOptionBox: React.FC<{
    dataArray?: any[] | object | null;
    fieldName?: string;
    isOption?: boolean;
}> = ({dataArray, fieldName, isOption}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    if (!dataArray) {
        return null;
    }
    const data = Array.isArray(dataArray) ? dataArray : Object.entries(dataArray);
    if (data.length === 0) {
        return null;
    }

    return (
        <View style={styles.rowView}>
            <View style={styles.leftView}>
                {data.map((v, i) => {
                    if (i % 2 === 1) {
                        return null;
                    }
                    if (`${fieldName}_title` in v && `${fieldName}_type` in v && Array.isArray(dataArray) && !isOption) {
                        return (
                            <View style={styles.innerView}>
                                <GrayText fontSize={`${12 * fontSize}`}>{v[`${fieldName}_title`]}</GrayText>
                                <Text fontSize={`${14 * fontSize}`} medium>
                                    {t(v[`${fieldName}_type`] as string)}
                                </Text>
                            </View>
                        );
                    } else if (!Array.isArray(dataArray)) {
                        return (
                            <View
                                style={{
                                    width: getPixel(124),
                                    marginTop: getHeightPixel(20),
                                }}>
                                <GrayText fontSize={`${12 * fontSize}`}>{t(v[0])}</GrayText>
                                <Text fontSize={`${14 * fontSize}`} medium>
                                    {v[1] === 'Y' || v[1] === 'N' ? t(v[1]) : v[1]}
                                </Text>
                            </View>
                        );
                    } else if (`${fieldName}_title` in v && `${fieldName}_type` in v && isOption) {
                        return (
                            <View style={styles.innerView}>
                                <Text fontSize={`${14 * fontSize}`} medium>
                                    {t(v[`${fieldName}_title`] as string)}
                                </Text>
                            </View>
                        );
                    }
                })}
            </View>
            <View style={styles.rightView}>
                {data.map((v, i) => {
                    if (i % 2 === 0) {
                        return null;
                    }
                    if (`${fieldName}_title` in v && `${fieldName}_type` in v && Array.isArray(dataArray)) {
                        return (
                            <View style={styles.innerView}>
                                <GrayText fontSize={`${12 * fontSize}`}>{v[`${fieldName}_title`]}</GrayText>
                                <Text fontSize={`${14 * fontSize}`} medium>
                                    {t(v[`${fieldName}_type`] as string)}
                                </Text>
                            </View>
                        );
                    } else if (!Array.isArray(dataArray)) {
                        return (
                            <View
                                style={{
                                    width: getPixel(124),
                                    marginTop: getHeightPixel(20),
                                }}>
                                <GrayText fontSize={`${12 * fontSize}`}>{t(v[0])}</GrayText>
                                <Text fontSize={`${14 * fontSize}`} medium>
                                    {v[1] === 'Y' || v[1] === 'N' ? t(v[1]) : v[1]}
                                </Text>
                            </View>
                        );
                    }
                })}
            </View>
        </View>
    );
};

export default ProductDetailOptionBox;

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
    },
    leftView: {
        backgroundColor: '#E0E0E020',
        width: getPixel(165),
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
        paddingBottom: getHeightPixel(20),
    },
    rightView: {
        backgroundColor: '#E0E0E040',
        width: getPixel(165),
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },

    innerView: {
        width: getPixel(124),
        marginTop: getHeightPixel(20),
    },
});
