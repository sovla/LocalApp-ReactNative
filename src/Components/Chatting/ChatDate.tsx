import Theme from '@/assets/global/Theme';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

const ChatDate: React.FC<{
    content: string;
}> = ({content}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View
            style={{
                height: getHeightPixel(50),
                width: getPixel(360),
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text
                color={Theme.color.darkBlue_AE}
                fontSize={`${11 * fontSize}`}
                style={{
                    letterSpacing: getPixel(1),
                }}>
                {content}
            </Text>
        </View>
    );
};

export default ChatDate;
