import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {onScrollSlide} from '@/Util/Util';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

const BannerList: React.FC<{
    imageArray?: Array<string>;
    width?: number;
    height?: number;
}> = ({imageArray, width = getPixel(328), height = getHeightPixel(130)}) => {
    const [dotNumber, setDotNumber] = useState(0);
    const dotArray = new Array(imageArray?.length).fill(0);
    return (
        <View
            style={[
                styles.bannerListView,
                {
                    width,
                    height,
                },
            ]}>
            <ScrollView onMomentumScrollEnd={e => onScrollSlide(e, setDotNumber, getPixel(328))} style={{width}} horizontal pagingEnabled>
                {Array.isArray(imageArray) &&
                    imageArray.map(item => {
                        return (
                            <Image
                                source={{
                                    uri: item,
                                }}
                                style={{
                                    width,
                                    height,
                                }}
                                resizeMethod="resize"
                            />
                        );
                    })}
            </ScrollView>
            <View style={styles.dotView}>
                {Array.isArray(dotArray) &&
                    dotArray.map((item, index) => {
                        return (
                            <View
                                style={[
                                    styles.dot,
                                    {
                                        width: index === dotNumber ? getPixel(24) : getPixel(7),
                                    },
                                ]}></View>
                        );
                    })}
            </View>
        </View>
    );
};

export default BannerList;

const styles = StyleSheet.create({
    dot: {
        height: getPixel(7),
        borderRadius: 200,
        marginRight: getPixel(5),
        backgroundColor: Theme.color.white,
    },
    dotView: {
        position: 'absolute',
        bottom: getHeightPixel(10),
        right: getPixel(10),
        flexDirection: 'row',
    },
    bannerListView: {
        borderRadius: getPixel(10),
        overflow: 'hidden',
    },
});
