import React, { SFC, ReactNode } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Container = styled.div`
  .button {
    font-size: 1em;
    font-family: 'Noto Sans KR';

    padding: 5px 15px;
    border: none;

    color: white;
    background-color: #3498db;

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
  }
`;

interface Props {
  theme?: 'default' | 'outline' | 'paper' | 'gray' | 'transparent' | 'push';
  className?: string;
  to?: null | string;
  children: ReactNode;
  large?: boolean;
  fullWidth?: boolean;
  type?: any;
}

const Button: SFC<Props> = ({ theme, children, className, to, large, fullWidth, ...rest }) => {
  const buttonClass = classNames('button', theme, className, {
    large,
    fullWidth,
  });

  if (to) {
    return (
      <Container>
        <Link className={buttonClass} to={to} {...rest}>
          {children}
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <button className={buttonClass} {...rest}>
        {children}
      </button>
    </Container>
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
