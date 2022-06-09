import {FlatList, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';

import BackWhiteIcon from '@assets/image/back_white.png';

const PurchaseList = () => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const _renderItem = useCallback(({item, index}) => {
        return <></>;
    }, []);
    return (
        <View
            style={{
                flex: 1,
            }}>
            <ImageBackground source={BackGroundImage} style={styles.headerView}>
                <TouchableOpacity style={styles.marginRight10}>
                    <AutoHeightImage source={BackWhiteIcon} width={getPixel(30)} />
                </TouchableOpacity>

                <WhiteText fontSize={`${20 * fontSize}`} bold>
                    {t('modalMyPagePurchaseList')}
                </WhiteText>
            </ImageBackground>
            <FlatList data={[]} renderItem={_renderItem} />
        </View>
    );
};

export default PurchaseList;

const styles = StyleSheet.create({
    marginRight10: {
        marginRight: getPixel(10),
    },
    headerView: {
        width: getPixel(360),
        height: getHeightPixel(50),
        paddingHorizontal: getPixel(16),
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: getHeightPixel(35),
    },
});
