import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ChattingProps} from '@/Types/Components/ChattingTypes';

const Chatting: React.FC<ChattingProps> = ({image, title, content, date}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.contentView}>
                <Text fontSize={`${16 * fontSize}`}>{title}</Text>
                <GrayText fontSize={`${12 * fontSize}`}>{content}</GrayText>
            </View>
            <GrayText fontSize={`${10 * fontSize}`} style={{marginTop: getHeightPixel(3)}}>
                {date}
            </GrayText>
        </View>
    );
};

export default Chatting;

const styles = StyleSheet.create({
    contentView: {
        width: getPixel(205),
        marginLeft: getPixel(12),
        marginRight: getPixel(14),
    },
    image: {
        width: getPixel(48),
        height: getPixel(48),
    },
    imageView: {
        width: getPixel(48),
        height: getPixel(48),
        borderRadius: getPixel(18),
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        marginTop: getHeightPixel(16),
        alignItems: 'flex-start',
    },
});
