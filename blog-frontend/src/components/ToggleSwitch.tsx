import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  span {
    margin-right: 0.7rem;
  }

  .switch {
    position: relative;
    display: inline-block;

    .switch-input {
      display: none;
    }

    .switch-label {
      display: inline-block;
      width: 3rem;
      height: 1.5rem;
      text-indent: -150%;
      clip: rect(0 0 0 0);
      color: transparent;
      user-select: none;
      vertical-align: bottom;

      &:before,
      &:after {
        content: "";
        display: block;
        position: absolute;
        cursor: pointer;
      }

      &:before {
        width: 3rem;
        height: 1.5rem;
        background-color: #dedede;
        border-radius: 9999em;
        transition: background-color 0.25s ease;
      }

      &:after {
        top: 0;
        left: 0;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
        transition: left 0.25s ease;
      }
    }

    .switch-input:checked + .switch-label {
      &:before {
        background-color: #3498db;
      }

      &:after {
        left: 1.5rem;
      }
    }
  }
`;

const ToggleSwitch = ({ children, value, onChange, ...rest }: any) => {
  return (
    <SwitchContainer {...rest}>
      <span>{children}</span>
      <div className="switch">
        <input
          id="switch-1"
          type="checkbox"
          className="switch-input"
          value={value}
          onChange={onChange}
        />
        <label htmlFor="switch-1" className="switch-label" />
      </div>
    </SwitchContainer>
  );
};

export default ToggleSwitch;
