import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useCallback} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import {categoryMenu} from '@/assets/global/dummy';
import MenuBulletIcon from '@assets/image/menu_bullet.png';
import {ProductCategoryProps} from '@/Types/Screen/Screen';
import {categoryMenuTypes} from '@/Types/Components/global';

const ProductCategory = ({navigation}: ProductCategoryProps) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const onPressItem = useCallback((name: categoryMenuTypes['menu']) => {
        navigation.navigate('ProductUpdate', {
            categoryMenu: name,
        });
    }, []);

    return (
        <View style={{flex: 1}}>
            <Header title={t('categoryUpdate')} />
            <ScrollView>
                <View style={styles.menuView}>
                    <AutoHeightImage source={MenuBulletIcon} width={getPixel(22)} style={styles.menuImage} />
                    <Text fontSize={`${16 * fontSize}`} medium>
                        {t('categorySelect')}
                    </Text>
                </View>
                <Line height={getHeightPixel(10)} />
                {categoryMenu.map(item => {
                    return (
                        <Fragment key={item.name}>
                            <TouchableOpacity onPress={() => onPressItem(item.name)} style={styles.touch}>
                                <AutoHeightImage source={item.image} width={getPixel(25)} style={styles.marginRight} />
                                <Text fontSize={`${16 * fontSize}`}>{t(item.name)}</Text>
                            </TouchableOpacity>
                            <Line isGray width={getPixel(328)} style={styles.line} />
                        </Fragment>
                    );
                })}
                <View style={{height: getHeightPixel(10)}} />
            </ScrollView>
        </View>
    );
};

export default ProductCategory;

const styles = StyleSheet.create({
    menuView: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        height: getHeightPixel(70),
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuImage: {
        marginRight: getPixel(10),
    },
    marginRight: {
        marginRight: getPixel(20),
    },
    line: {
        marginHorizontal: getPixel(16),
    },

    touch: {
        width: getPixel(288),
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: getPixel(32),
    },
});
