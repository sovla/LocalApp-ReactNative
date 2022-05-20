import {Image, ImageBackground, StyleSheet, TextInput, Touchable, TouchableOpacity, View} from 'react-native';
import BackGroundImage from '@assets/image/BG.png';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import BackWhiteIcon from '@assets/image/back_white.png';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import Theme from '@/assets/global/Theme';
import SearchBlackIcon from '@assets/image/search_black.png';
import CloseGrayIcon from '@assets/image/close_gray.png';
import CloseBlackIcon from '@assets/image/close_black.png';
import {SearchHeaderProps} from '@/Types/Components/HomeTypes';
import {Text} from '../Global/text';
import AutoHeightImage from 'react-native-auto-height-image';
import {getHitSlop} from '@/Util/Util';

const SearchHeader: React.FC<SearchHeaderProps> = ({text, setText, keyword, onPressCloseKeyword, onSubmitEditing}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();
    return (
        <ImageBackground style={styles.headerContainer} source={BackGroundImage}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={BackWhiteIcon} style={styles.backWhiteImage} />
            </TouchableOpacity>
            <View style={styles.searchTextInputView}>
                <Image source={SearchBlackIcon} style={styles.searchBlackImage} />
                {keyword && keyword.length > 0 && (
                    <View style={styles.keywordView}>
                        <Text fontSize={`${12 * fontSize}`} medium>
                            {t(keyword)}
                        </Text>
                        <TouchableOpacity onPress={onPressCloseKeyword} hitSlop={getHitSlop(5)}>
                            <AutoHeightImage source={CloseBlackIcon} width={getPixel(10)} style={styles.marginLeft5} />
                        </TouchableOpacity>
                    </View>
                )}
                <TextInput
                    style={[
                        styles.textInput,
                        {
                            fontSize: fontSize * 14,
                        },
                    ]}
                    placeholderTextColor={Theme.color.gray}
                    placeholder={t('searchPlaceholder')}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={() => onSubmitEditing({page: 1})}
                />

                {/* <TouchableOpacity style={styles.closeGrayTouch}>
          <Image source={CloseGrayIcon} style={styles.closeGrayImage} />
        </TouchableOpacity> */}
            </View>
        </ImageBackground>
    );
};

export default SearchHeader;

const styles = StyleSheet.create({
    marginLeft5: {
        marginLeft: getPixel(5),
    },
    searchTextInputView: {
        flexDirection: 'row',
        width: getPixel(288),
        height: getHeightPixel(40),
        borderRadius: getPixel(20),
        backgroundColor: Theme.color.white,
        alignItems: 'center',
    },
    keywordView: {
        paddingHorizontal: getPixel(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: getHeightPixel(5),
        borderWidth: 1,
        borderColor: Theme.color.gray,

        borderRadius: 16,
    },
    closeGrayImage: {
        width: getPixel(15.75),
        height: getPixel(15.75),
    },
    closeGrayTouch: {
        position: 'absolute',
        top: getHeightPixel(12.5),
        right: getPixel(10.8),
    },
    searchBlackImage: {
        width: getPixel(18),
        height: getPixel(18),
        marginHorizontal: getPixel(10),
    },
    backWhiteImage: {
        width: getPixel(30),
        height: getPixel(30),
    },
    textInput: {
        flex: 1,
        paddingRight: getPixel(30),
        color: Theme.color.black,
        includeFontPadding: false,
    },
    headerContainer: {
        height: getHeightPixel(60),
        width: getPixel(360),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getPixel(16),
    },
});
