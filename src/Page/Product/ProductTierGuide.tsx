import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import Header from '@/Components/LoginSignUp/Header';
import {Shadow} from 'react-native-shadow-2';
import {tierList} from '@/assets/global/dummy';

const ProductTierGuide = () => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View>
            <Header title={t('tierGuideTitle')} />
            <FlatList
                data={tierList}
                ListHeaderComponent={<View style={{height: getHeightPixel(36)}}></View>}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.boxContainer} key={index}>
                            <Shadow distance={5}>
                                <View style={styles.boxView}>
                                    <Text fontSize={`${16 * fontSize}`} medium>
                                        {t(item.name)}
                                    </Text>
                                    <GrayText fontSize={`${14 * fontSize}`} style={styles.contentText}>
                                        {t(item.content)}
                                    </GrayText>
                                    <View style={styles.tierImageView}>
                                        <Image source={item.image} style={styles.tierImage} resizeMode="contain" />
                                    </View>
                                </View>
                            </Shadow>
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View
                        style={{
                            height: getHeightPixel(110),
                        }}
                    />
                }
            />
        </View>
    );
};

export default ProductTierGuide;

const styles = StyleSheet.create({
    tierImageView: {
        position: 'absolute',
        bottom: getHeightPixel(0),
        right: getPixel(5),
        width: getPixel(60),
        height: getHeightPixel(60),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    tierImage: {
        width: getPixel(60),
        height: getHeightPixel(67.8),
    },
    boxContainer: {
        marginHorizontal: getPixel(16),
        marginBottom: getHeightPixel(16),
    },
    contentText: {
        width: getPixel(221),
    },
    boxView: {
        width: getPixel(328),
        height: getHeightPixel(100),
        borderRadius: getPixel(10),
        paddingTop: getHeightPixel(16),
        paddingLeft: getPixel(18),
    },
});
