import Theme from '@/assets/global/Theme';
import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';
import React from 'react';
import styled from 'styled-components/native';
import {DefaultButtonProps} from 'Types/Components/global';
import {Text} from './text';

const ButtonStyle = styled.TouchableOpacity<any>`
  width: ${p => pixelChange(p.width) ?? pixelChange('288px')};
  height: ${p => pixelHeightChange(p.height) ?? pixelChange('48px')};
  background-color: ${Theme.color.blue};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const Button: React.FC<DefaultButtonProps> = props => {
  const {content} = props;

  return (
    <ButtonStyle {...props}>
      <Text color={Theme.color.white} fontSize={`${Theme.fontSize.fs16}px`}>
        {content}
      </Text>
    </ButtonStyle>
  );
};
