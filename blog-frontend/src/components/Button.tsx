import React, { SFC } from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 30px;
  border: none;
  border-bottom: 5px solid #2980b9;
  border-radius: 5px;

  color: white;
  background-color: #3498db;
  box-shadow: 1px 1px 10px #555;

  font-size: 1.25em;
  font-family: 'Noto Sans KR';

  transition: all 0.1s ease-in-out;

  &:active {
    box-shadow: 1px 1px 5px #555;
    border-bottom: 0px solid #2980b9;
    transform: translateY(5px);
  }
`;

const StyledInput = StyledButton.withComponent('input');
const StyledLink = StyledButton.withComponent('a');

interface IProps {
  isInput?: boolean;
  color: string;
}

const Button: SFC<IProps> = ({ children, type, ...rest }) => {
  const Component = type === 'button' ? 'StyledButton' : (type === 'input' ? 'StyledInput': 'StyledLink');
  return (<Component {...rest}>{children}</StyledButton>);
};

export default Button;
