import {StyleSheet, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import {productDummy} from '@/assets/global/dummy';
import Input from '@/Components/Global/Input';
import {ProductTagProps} from '@/Types/Screen/Screen';
import {AlertButton} from '@/Util/Util';
import Theme from '@/assets/global/Theme';

const ProductTag: React.FC<ProductTagProps> = ({navigation, route: {params}}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [tag, setTag] = useState('');
    const [tagWord, setTagWord] = useState<string[]>([]);
    const [isOverlap, setIsOverlap] = useState(false);
    const onPressConfirm = useCallback(() => {
        if (!isOverlap) {
            navigation.navigate('ProductUpdate', {
                tag,
            });
        } else {
            AlertButton(t('tagOverlap'));
            return;
        }
    }, [tag, isOverlap]);

    const onChangeTag = useCallback((text: string) => {
        let isReg = true;

        if (text) {
            text.split(' ').forEach(v => {
                if (v.length > 10) {
                    AlertButton(t('tagAlert'));
                    isReg = false;
                    return;
                }
            });
            if (isReg) {
                setTag(text);
            }
        } else {
            setTag('');
        }
    }, []);

    const overlapFind = useCallback(() => {
        if (tag) {
            const set = new Set();
            let find = false;
            tag.split(' ').forEach(v => {
                if (set.has(v)) {
                    setIsOverlap(true);
                    find = true;
                    return null;
                } else {
                    set.add(v);
                }
            });
            if (!find) {
                setIsOverlap(false);
            } else {
                AlertButton(t('tagOverlap'));
            }
        }
    }, [tag]);

    useEffect(() => {
        if (params?.tag) {
            setTag(params.tag);
        }
    }, []);

    useLayoutEffect(() => {
        if (tag.includes(' ')) {
            const arr = tag.split(' ');
            setTagWord(prev => [...prev, arr[0]]);
            setTag('');
        }
    }, [tag]);

    return (
        <View>
            <Header title={t('tagUpdate')} />
            <View
                style={{
                    marginHorizontal: getPixel(16),
                }}>
                <View style={{height: getHeightPixel(30)}} />
                <TextInput
                    onEndEditing={overlapFind}
                    placeholder={t('tagPhGuide')}
                    value={tag}
                    onChangeText={onChangeTag}
                    placeholderTextColor={Theme.color.gray}
                    style={{
                        borderBottomColor: Theme.color.gray,
                        borderBottomWidth: 0.4,
                        width: getPixel(328),
                        fontSize: 14 * fontSize,
                        color: Theme.color.black,
                    }}
                />

                <View style={{height: getHeightPixel(30)}} />
                <GrayText fontSize={`${12 * fontSize}`}>{'- ' + t('tagGuide1')}</GrayText>
                <View style={{height: getHeightPixel(10)}} />
                <GrayText fontSize={`${12 * fontSize}`}>{'- ' + t('tagGuide2')}</GrayText>
                <View style={{height: getHeightPixel(10)}} />
                <GrayText fontSize={`${12 * fontSize}`}>{'- ' + t('tagGuide3')}</GrayText>
                <Button
                    content={t('confirm')}
                    width="328px"
                    style={{
                        marginTop: getHeightPixel(380),
                    }}
                    onPress={onPressConfirm}
                />
            </View>
        </View>
    );
};

export default ProductTag;

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
