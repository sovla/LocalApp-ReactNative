import Theme from '@/assets/global/Theme';
import {useAppSelector} from '@/Hooks/CustomHook';
import pixelChange, {getHeightPixel, getPixel, pixelHeightChange} from '@/Util/pixelChange';
import {getHitSlop} from '@/Util/Util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {CheckBoxImageProps, CheckBoxProps, DefaultButtonProps, ToggleProps} from 'Types/Components/global';
import {Text} from './text';

const ButtonStyle = styled.TouchableOpacity<any>`
    width: ${p => pixelChange(p.width) ?? pixelChange('288px')};
    height: ${p => pixelHeightChange(p.height) ?? pixelHeightChange('48px')};
    background-color: ${Theme.color.blue_3D};
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;

export const Button: React.FC<DefaultButtonProps> = props => {
    const {t} = useTranslation();
    const {fontColor = Theme.color.white} = props;
    const fontSize = useAppSelector(state => state.fontSize.value);
    const textSize = props.fontSize ?? 16;
    const content = props?.content ?? t('signUp');
    return (
        <ButtonStyle {...props}>
            <Text color={fontColor} fontSize={`${textSize * fontSize}px`}>
                {content}
            </Text>
        </ButtonStyle>
    );
};

export const CheckBox: React.FC<CheckBoxProps> = ({setIsOn, isOn, text, isBox, disabled}) => {
    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <TouchableOpacity disabled={disabled} onPress={setIsOn} style={styles.checkBoxView}>
            <Image
                source={
                    isOn
                        ? isBox
                            ? require('@assets/image/checkbox_on.png')
                            : require('@assets/image/radio_on.png')
                        : isBox
                        ? require('@assets/image/checkbox_off.png')
                        : require('@assets/image/radio_off.png')
                }
                style={styles.checkBoxImage}
            />
            <Text fontSize={`${14 * fontSize}`}>{text}</Text>
        </TouchableOpacity>
    );
};
export const CheckBoxImage: React.FC<CheckBoxImageProps> = ({isOn, isBox, isBlue, isCheckImage, width = getPixel(18), height = getPixel(18)}) => {
    const image = (() => {
        if (isBox) {
            return isOn ? require('@assets/image/checkbox_on.png') : require('@assets/image/checkbox_off.png');
        } else if (isCheckImage) {
            return isOn ? require('@assets/image/check_on.png') : require('@assets/image/check_off.png');
        } else if (isBlue) {
            return isOn ? require('@assets/image/checkbox_blue.png') : require('@assets/image/checkbox.png');
        } else {
            return isOn ? require('@assets/image/radio_on.png') : require('@assets/image/radio_off.png');
        }
    })();
    return (
        <Image
            source={image}
            style={{
                width,
                height,
            }}
        />
    );
};

export const Toggle: React.FC<ToggleProps> = ({isOn, setIsOn, width = getPixel(40), height = getPixel(22)}) => {
    const onToggle = () => {
        if (setIsOn) setIsOn((prev: boolean) => !prev);
    };
    return (
        <TouchableOpacity disabled={setIsOn == null} onPress={onToggle} hitSlop={getHitSlop(5)}>
            <Image
                source={isOn ? require('@assets/image/toggle_on.png') : require('@assets/image/toggle_off.png')}
                style={{
                    width,
                    height,
                }}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkBoxImage: {
        marginRight: getPixel(10),
        width: getPixel(18),
        height: getPixel(18),
    },
    checkBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHeightPixel(10),
    },
});
