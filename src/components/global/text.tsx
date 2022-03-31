import Theme from 'assets/global/Theme';
import styled from 'styled-components/native';
import {DefaultTextProps} from 'Types/Components/global';
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
`;
