import Theme from '@/assets/global/Theme';
import {LineProps} from '@/Types/Components/global';
import {getPixel} from '@/Util/pixelChange';
import React from 'react';
import {View} from 'react-native';

export default function Line({width, height, backgroundColor, style, isGray}: LineProps): JSX.Element {
    return (
        <View
            style={{
                width: width ?? getPixel(360),
                height: height ?? 0.4,
                backgroundColor: backgroundColor ? backgroundColor : isGray ? Theme.color.gray : Theme.color.gray_F5,
                ...style,
            }}
        />
    );
}
