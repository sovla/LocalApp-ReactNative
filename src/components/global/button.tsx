import React from 'react';
import styled from 'styled-components/native';
import {DefaultButtonProps} from 'Types/Components/global';
import {Text} from './text';

const ButtonStyle = styled.TouchableOpacity<any>``;

export const Button: React.FC<DefaultButtonProps> = props => {
  const {content} = props;

  return (
    <ButtonStyle {...props}>
      <Text>{content}</Text>
    </ButtonStyle>
  );
};
