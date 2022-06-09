import {ContainerProps} from '@/Types/Components/global';
import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';
import styled, {css} from 'styled-components/native';

export const Box = styled.View<ContainerProps>`
    flex-direction: column;
    justify-content: ${p => p.justifyContent ?? 'center'};
    align-items: ${p => p.alignItems ?? 'center'};
    background-color: ${p => p.backgroundColor ?? '#0000'};
    ${p =>
        p.width &&
        css`
            width: ${pixelChange(p.width)};
        `};
    ${p =>
        p.height &&
        css`
            height: ${pixelHeightChange(p.height)};
        `};
`;

export const RowBox = styled(Box)`
    flex-direction: row;
`;

export const TouchBox = styled.TouchableOpacity<ContainerProps>`
    flex-direction: column;
    justify-content: ${p => p.justifyContent ?? 'center'};
    align-items: ${p => p.alignItems ?? 'center'};
    background-color: ${p => p.backgroundColor ?? '#0000'};
    padding: ${p => pixelChange(p.padding) ?? '0px'};
    margin: ${p => pixelChange(p.margin) ?? '0px'};
    ${p =>
        p.width &&
        css`
            width: ${pixelChange(p.width)};
        `};
    ${p =>
        p.height &&
        css`
            height: ${pixelHeightChange(p.height)};
        `};
`;
