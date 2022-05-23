import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import Screen from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';

export default function ServiceCenter() {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();
    const menuList: {
        name: string;
        screenName: keyof Screen;
    }[] = [
        {
            name: 'FAQTitle',
            screenName: 'FAQ',
        },
        {
            name: 'ToUTitle',
            screenName: 'ToU',
        },
        {
            name: 'PrivacyPolicyTitle',
            screenName: 'PrivacyPolicy',
        },
        {
            name: 'ContactUs',
            screenName: 'ContactUs',
        },
    ];
    return (
        <View
            style={{
                flex: 1,
            }}>
            <Header title={t('modalMyPageServiceCenter')} />
            {menuList.map(item => {
                return (
                    <Fragment key={item.screenName}>
                        <TouchableOpacity
                            style={styles.boxTouch}
                            onPress={() => {
                                navigation.navigate(item.screenName);
                            }}>
                            <Text fontSize={`${16 * fontSize}`}>{t(item.name)}</Text>
                            <AutoHeightImage width={getPixel(6)} source={ArrowRightIcon} />
                        </TouchableOpacity>
                        <Line isGray width={getPixel(328)} style={{marginLeft: getPixel(16)}} />
                    </Fragment>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    boxTouch: {
        width: getPixel(328),
        height: getHeightPixel(50),
        marginHorizontal: getPixel(16),

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
