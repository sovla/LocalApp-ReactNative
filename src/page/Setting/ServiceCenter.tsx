import Line from '@/Components/Global/Line';
import Header from '@/Components/LoginSignUp/Header';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import Screen from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import {Text} from '@Components/Global/text';
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

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
