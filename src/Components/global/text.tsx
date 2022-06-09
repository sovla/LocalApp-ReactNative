import Theme from '@/assets/global/Theme';
import {DefaultTextProps} from '@/Types/Components/global';
import styled, {css} from 'styled-components/native';
import pixelChange from 'Util/pixelChange';

const fontSizeChange = (fontSize: string | undefined) => {
    if (fontSize) {
        if (fontSize?.includes('px')) {
            return fontSize;
        } else {
            return fontSize + 'px';
        }
    }
};

export const Text = styled.Text<DefaultTextProps>`
    color: ${p => p.color ?? Theme.color.black};
    font-size: ${p => fontSizeChange(p.fontSize) ?? `${Theme.fontSize.fs16}px`};
    width: ${p => pixelChange(p.width) ?? 'auto'};
    height: ${p => pixelChange(p.height) ?? 'auto'};
    /* letter-spacing: ${p => p.letterSpacing ?? '0px'}; */
    text-decoration: ${p => p.textDecoration ?? 'none'};
    font-family: 'NotoSansKR-Regular';
    ${p =>
        p.textAlign &&
        css`
            text-align: ${p.textAlign};
        `};
    include-font-padding: false;
    text-align-vertical: center;
    ${p =>
        p.bold &&
        css`
            font-family: 'NotoSansKR-Bold';
        `}
    ${p =>
        p.medium &&
        css`
            font-family: 'NotoSansKR-Medium';
        `}
`;
export const RedText = styled(Text)`
    color: ${Theme.color.red};
`;
export const WhiteText = styled(Text)`
    color: ${Theme.color.white};
`;
export const GrayText = styled(Text)`
    color: ${Theme.color.gray};
`;

export const DarkBlueText = styled(Text)`
    color: ${Theme.color.darkBlue};
`;

export const BoldText = styled(Text)`
    font-family: 'NotoSansKR-Bold';
`;

export const MediumText = styled(Text)`
    font-family: 'NotoSansKR-Medium';
`;
