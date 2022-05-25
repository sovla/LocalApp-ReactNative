import Theme from '@/assets/global/Theme';
import {useAppSelector} from '@/Hooks/CustomHook';
import {MyChattingProps} from '@/Types/Components/ChattingTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, WhiteText} from '@Components/Global/text';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, View} from 'react-native';

const MyChatting: React.FC<MyChattingProps> = ({date, content, isCheck}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.container}>
            <View style={styles.dateView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {isCheck && isCheck > 0 && (
                        <Image
                            source={isCheck === 1 ? require('@assets/image/check.png') : require('@assets/image/check_double.png')}
                            style={{
                                width: getPixel(24),
                                height: getPixel(24),
                            }}
                        />
                    )}

                    <Text fontSize={`${11 * fontSize}`} color="#59636C">
                        {date}
                    </Text>
                </View>
            </View>
            <View style={styles.chattingView}>
                <WhiteText fontSize={`${14 * fontSize}`}>{content}</WhiteText>
            </View>
        </View>
    );
};

export default React.memo(MyChatting);

const styles = StyleSheet.create({
    container: {
        minHeight: getHeightPixel(44),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: getPixel(360),
        paddingHorizontal: getPixel(16),
        marginTop: getHeightPixel(15),
    },
    dateView: {
        marginRight: getPixel(5),
        justifyContent: 'flex-end',
        marginBottom: getHeightPixel(3),
    },
    chattingView: {
        maxWidth: getPixel(220),
        minHeight: getHeightPixel(44),
        borderRadius: getPixel(15),
        borderBottomRightRadius: 0,
        backgroundColor: Theme.color.blue_3D,
        justifyContent: 'center',
        paddingHorizontal: getPixel(14),
        paddingVertical: getHeightPixel(14),
    },
});
