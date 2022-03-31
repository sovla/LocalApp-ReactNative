import Theme from '@/assets/global/Theme';
import {DefaultTextProps} from '@/Types/Components/global';
import styled, {css} from 'styled-components/native';
import pixelChange from 'Util/pixelChange';

export const Text = styled.Text<DefaultTextProps>`
  color: ${p => p.color ?? Theme.color.black};
  font-size: ${p => pixelChange(p.fontSize) ?? `${Theme.fontSize.fs16}px`};
  width: ${p => pixelChange(p.width) ?? 'auto'};
  height: ${p => pixelChange(p.height) ?? 'auto'};
  letter-spacing: ${p => p.letterSpacing ?? '-0.84px'};
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};
  text-decoration: ${p => p.textDecoration ?? 'none'};
  font-family: 'NotoSansKR-Regular';
  ${p =>
    p.textAlign &&
    css`
      text-align: ${p.textAlign};
    `};
  include-font-padding: false;
  text-align-vertical: center;
`;

export const BoldText = styled(Text)`
  font-family: 'NotoSansKR-Bold';
`;

export const MediumText = styled(Text)`
  font-family: 'NotoSansKR-Medium';
`;
