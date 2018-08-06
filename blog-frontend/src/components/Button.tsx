import React, { SFC, ReactNode } from 'react';

import styled from 'styled-components';
import classNames from 'classnames';

const StyledLink = styled.a`
  font-size: 1em;
  font-family: 'Noto Sans KR';

  padding: 5px 15px;
  border: none;
  outline: none;

  cursor: pointer;
  color: white;
  background-color: #3498db;

  &:hover,
  &:active {
    background-color: #2980b9;
  }

  &.large {
    font-size: 1.25em;
    padding: 10px 30px;
  }

  &.push {
    border-bottom: 5px solid #2980b9;
    border-radius: 5px;
    transition: all 0.1s ease-in-out;
    box-shadow: 1px 1px 10px #555;

    &:active {
      box-shadow: 1px 1px 5px #555;
      border-bottom: 0px solid #2980b9;
      transform: translateY(5px);
    }
  }

  &.fullWidth {
    width: 100%;
  }
`;

const StyledButton = StyledLink.withComponent('button');

interface Props {
  theme?: 'default' | 'outline' | 'paper' | 'gray' | 'transparent' | 'push';
  className?: string;
  to?: null | string;
  children: ReactNode;
  large?: boolean;
  fullWidth?: boolean;
  type?: any;
  inline?: boolean;
}

const Button: SFC<Props> = ({
  theme,
  children,
  className,
  to,
  large,
  fullWidth,
  inline,
  ...rest
}) => {
  const buttonClass = classNames('button', theme, className, {
    large,
    fullWidth,
  });

  if (to) {
    return (
      <StyledLink href={to} className={buttonClass} {...rest}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton className={buttonClass} {...rest}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  theme: 'default',
  className: '',
  to: null,
  large: false,
  fullWidth: false,
};

export default Button;
