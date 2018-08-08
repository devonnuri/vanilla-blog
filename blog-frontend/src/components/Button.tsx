import React, { SFC, ReactNode, DOMAttributes } from 'react';

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

  &:hover:not(.push):not(.outline),
  &:active:not(.push):not(.outline) {
    background-color: #2980b9;
  }

  &.outline {
    background: none;
    border: 2px #3498db solid;
    color: #3498db;
    font-weight: bold;
  }

  &.green {
    background-color: #27ae60;
  }

  &.red {
    background-color: #e74c3c;
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

    &.green {
      border-color: #1e8449;
    }

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

interface Props extends DOMAttributes<Element> {
  theme?: 'default' | 'outline' | 'paper' | 'push';
  color?: 'gray' | 'green' | 'blue' | 'red' | 'transparent';
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
  color,
  children,
  className,
  to,
  large,
  fullWidth,
  inline,
  ...rest
}) => {
  const buttonClass = classNames('button', theme, color, className, {
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
