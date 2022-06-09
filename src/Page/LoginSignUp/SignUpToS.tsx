import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {SignUpTOSProps} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';

import {AlertButton, getHitSlop} from '@/Util/Util';

export default function SignUpToS({navigation}: SignUpTOSProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [isAllCheck, setIsAllCheck] = useState(false);
    const [agree, setAgree] = useState({
        require1: false,
        require2: false,
        option: false,
    });

    const onPressAll = useCallback(() => {
        setAgree({
            require1: !isAllCheck,
            require2: !isAllCheck,
            option: !isAllCheck,
        });
        setIsAllCheck(prev => !prev);
    }, [isAllCheck]);

    const onPressNext = useCallback(() => {
        if (agree.require1 && agree.require2) {
            navigation.navigate('SignUpTel', {option: agree.option});
        } else {
            AlertButton(t('signUpRequireAlert'));
        }
    }, [agree]);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.view}>
                <Text style={styles.titleText} medium fontSize={`${20 * fontSize}`}>
                    {t('signUpGuide1')}
                </Text>
                <CheckBoxRow onPress={onPressAll} isOn={agree.require1 && agree.require2} content={t('signUpGuide2')} isLine />
                <CheckBoxRow
                    isOn={agree.require1}
                    onPress={() => {
                        setAgree(prev => ({...prev, require1: !prev.require1}));
                    }}
                    content={t('signUpGuide3')}
                    onPressRight={() => {
                        navigation.navigate('ToU');
                    }}
                    isRequire
                />
                <CheckBoxRow
                    isOn={agree.require2}
                    onPress={() => {
                        setAgree(prev => ({...prev, require2: !prev.require2}));
                    }}
                    content={t('signUpGuide4')}
                    onPressRight={() => {
                        navigation.navigate('ToU');
                    }}
                    isLine
                    isRequire
                />
                <CheckBoxRow
                    isOn={agree.option}
                    onPress={() => {
                        setAgree(prev => ({...prev, option: !prev.option}));
                    }}
                    content={t('signUpGuide5')}
                    onPressRight={() => {
                        navigation.navigate('ToU');
                    }}
                    isOption
                />
                <Button onPress={onPressNext} content={t('signUpAgreeNext')} style={styles.button} />
            </View>
        </View>
    );
}

const CheckBoxRow: React.FC<{
    isOn?: boolean;
    onPress: () => void;
    onPressRight?: () => void;
    content: string;
    isRequire?: boolean;
    isOption?: boolean;
    isLine?: boolean;
}> = ({content, isOn, isOption, onPress, onPressRight, isRequire, isLine}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    return (
        <>
            <View style={styles.checkBoxView}>
                <TouchableOpacity onPress={onPress} hitSlop={getHitSlop(5)} style={styles.rowCenter}>
                    <CheckBoxImage isOn={isOn} isBox />
                    <View style={styles.width15} />
                    {isRequire && (
                        <Text color={Theme.color.red} style={styles.mr5} medium fontSize={`${14 * fontSize}`}>
                            {t('require')}
                        </Text>
                    )}
                    {isOption && (
                        <GrayText style={styles.mr5} medium fontSize={`${14 * fontSize}`}>
                            {t('option')}
                        </GrayText>
                    )}
                    <Text medium fontSize={`${14 * fontSize}`}>
                        {content}
                    </Text>
                </TouchableOpacity>
                {onPressRight !== undefined && (
                    <TouchableOpacity onPress={onPressRight} hitSlop={getHitSlop(5)}>
                        <AutoHeightImage source={ArrowRightIcon} width={getPixel(6)} />
                    </TouchableOpacity>
                )}
            </View>
            {isLine && <Line isGray />}
        </>
    );
};

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        marginBottom: getHeightPixel(44),
    },
    container: {
        flex: 1,
    },
    view: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: getHeightPixel(32),
        left: getPixel(32),
    },
    mr5: {
        marginRight: getPixel(5),
    },
    width15: {
        width: getPixel(15),
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBoxView: {
        width: getPixel(288),
        height: getHeightPixel(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
