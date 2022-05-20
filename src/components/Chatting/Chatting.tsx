import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ChattingProps} from '@/Types/Components/ChattingTypes';
import AutoHeightImage from 'react-native-auto-height-image';

const Chatting: React.FC<ChattingProps> = ({image, title, content, date, isBuy, userName, isBusiness}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.imageView}>
                    <Image source={image} style={styles.image} />
                </View>
                {isBusiness && (
                    <View style={styles.businessIconView}>
                        <AutoHeightImage source={require('@assets/image/business.png')} width={getPixel(18)} />
                    </View>
                )}
            </View>
            <View style={styles.contentView}>
                <Text fontSize={`${16 * fontSize}`}>{title}</Text>
                <Text fontSize={`${13 * fontSize}`}>{userName}</Text>

                <GrayText fontSize={`${12 * fontSize}`} numberOfLines={1}>
                    {content}
                </GrayText>
            </View>
            <View style={styles.height100}>
                <GrayText fontSize={`${10 * fontSize}`} style={{marginTop: getHeightPixel(3), alignSelf: 'flex-end'}}>
                    {date}
                </GrayText>
                <Image source={isBuy ? require('@assets/image/buy_arrow.png') : require('@assets/image/sale_arrow.png')} style={styles.icon} />
            </View>
        </View>
    );
};

export default Chatting;

const styles = StyleSheet.create({
    businessIconView: {
        position: 'absolute',
        right: -getPixel(4),
        bottom: -getPixel(8),
    },
    height100: {
        height: '100%',
        flex: 1,
    },
    icon: {
        width: getPixel(16),
        height: getPixel(16),
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
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
