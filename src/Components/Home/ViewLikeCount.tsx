import {useAppSelector} from '@/Hooks/CustomHook';
import {getPixel} from '@/Util/pixelChange';
import HeartIcon from '@assets/image/heart.png';
import ViewIcon from '@assets/image/view.png';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {GrayText} from '../Global/text';

const ViewLikeCount: React.FC<{
    likeCount: string;
    viewCount: string;
}> = ({likeCount, viewCount}) => {
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.rowCenterView}>
            <Image source={ViewIcon} style={styles.viewImage} />
            <GrayText fontSize={`${12 * fontSize}`}>{viewCount}</GrayText>
            <Image source={HeartIcon} style={styles.heartImage} />
            <GrayText fontSize={`${12 * fontSize}`}>{likeCount}</GrayText>
        </View>
    );
};

export default ViewLikeCount;

const styles = StyleSheet.create({
    rowCenterView: {flexDirection: 'row', alignItems: 'center'},
    heartImage: {
        width: getPixel(14),
        height: getPixel(12),
        marginLeft: getPixel(6),
        marginRight: getPixel(5),
    },
    viewImage: {
        width: getPixel(13.95),
        height: getPixel(10.51),
        marginRight: getPixel(5),
    },
});
