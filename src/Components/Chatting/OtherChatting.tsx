import Theme from '@/assets/global/Theme';
import {useAppSelector} from '@/Hooks/CustomHook';
import {OtherChattingProps} from '@/Types/Components/ChattingTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, View} from 'react-native';

const OtherChatting: React.FC<OtherChattingProps> = ({content, date, profileImage}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={profileImage ? {uri: profileImage} : require('@assets/image/dummy.png')} style={styles.image} />
            </View>
            <View style={styles.chattingView}>
                <Text fontSize={`${14 * fontSize}`}>{content}</Text>
            </View>
            <View style={styles.dateView}>
                <Text fontSize={`${11 * fontSize}`} color="#59636C">
                    {date}
                </Text>
            </View>
        </View>
    );
};

export default React.memo(OtherChatting);

const styles = StyleSheet.create({
    container: {
        marginTop: getHeightPixel(15),
        minHeight: getHeightPixel(44),
        flexDirection: 'row',
        width: getPixel(360),
        paddingHorizontal: getPixel(16),
    },
    dateView: {
        marginLeft: getPixel(5),
        justifyContent: 'flex-end',
        marginBottom: getHeightPixel(3),
    },
    chattingView: {
        maxWidth: getPixel(220),
        minHeight: getHeightPixel(44),
        borderRadius: getPixel(15),
        borderBottomLeftRadius: 0,
        backgroundColor: Theme.color.white,
        justifyContent: 'center',
        paddingHorizontal: getPixel(14),
        paddingVertical: getHeightPixel(14),
    },
    imageView: {
        width: getHeightPixel(44),
        height: getHeightPixel(44),
        borderRadius: getPixel(16),
        overflow: 'hidden',
        marginRight: getPixel(8),
    },
    image: {width: getHeightPixel(44), height: getHeightPixel(44)},
});
