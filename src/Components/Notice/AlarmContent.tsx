import Theme from '@/assets/global/Theme';
import {useAppSelector} from '@/Hooks/CustomHook';
import {AlarmContentProps} from '@/Types/Components/NoticeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CheckBoxImage} from '../Global/button';

const AlarmContent: React.FC<AlarmContentProps> = ({title, date, isDelete, onPress, image, isOn, onPressDelete}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.conatiner}>
            <TouchableOpacity
                disabled={onPress == null && !isDelete}
                onPress={() => {
                    if (isDelete) {
                        onPressDelete();
                        return;
                    }
                    if (onPress) {
                        onPress();
                        return;
                    }
                }}
                style={[styles.contentTouch]}>
                {isDelete && (
                    <View
                        style={{
                            alignSelf: 'center',
                            marginBottom: getHeightPixel(15),
                            marginRight: getPixel(12),
                        }}>
                        <CheckBoxImage isOn={isOn} isBox />
                    </View>
                )}
                <View style={styles.imageView}>
                    <Image source={image ? {uri: image} : require('@assets/image/alarm.png')} style={styles.image} resizeMode="contain" />
                </View>
                <View style={styles.textView}>
                    <Text fontSize={`${14 * fontSize}`} style={styles.titleText}>
                        {title}
                    </Text>
                    <GrayText fontSize={`${12 * fontSize}`}>{date}</GrayText>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default AlarmContent;

const styles = StyleSheet.create({
    titleText: {marginBottom: getHeightPixel(8)},
    textView: {
        width: getPixel(265),
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
        marginRight: getPixel(12),
    },
    contentTouch: {
        flexDirection: 'row',
    },
    conatiner: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        minHeight: getHeightPixel(90),
        paddingTop: getHeightPixel(14),
        borderBottomColor: Theme.color.gray,
        borderBottomWidth: 0.4,
    },
});
