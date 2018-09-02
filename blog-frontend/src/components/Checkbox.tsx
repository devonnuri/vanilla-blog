import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  .checkbox {
    position: relative;
    display: block;
    width: 40px;
    height: 20px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);

    &:before {
      content: "";
      position: relative;
      top: 3px;
      left: 3px;
      width: 34px;
      height: 14px;
      display: block;
      background: #9a9999;
      border-radius: 8px;
      transition: background 0.2s ease;
    }

    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      display: block;
      background: white;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
      transition: all 0.2s ease;

      &:before {
        content: "";
        position: absolute;
        display: block;
        margin: -18px;
        width: 56px;
        height: 56px;
        background: rgba(79, 46, 220, 0.5);
        border-radius: 50%;
        transform: scale(0);
        opacity: 1;
        pointer-events: none;
      }
    }
  }

  #cbx:checked + .checkbox:before {
    background: #947ada;
  }

  #cbx:checked + .checkbox span {
    background: #4f2edc;
    transform: translateX(20px);
    transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25),
      background 0.15s ease;
    box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);

    &:before {
      transform: scale(1);
      opacity: 0;
      transition: all 0.4s ease;
    }
  }
`;

const Checkbox = () => {
  return (
    <CheckboxContainer>
      <input type="checkbox" id="cbx" style={{ display: 'none' }} />
      <label htmlFor="cbx" className="checkbox">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
          <polyline points="1 9 7 14 15 4" />
        </svg>
      </label>
    </CheckboxContainer>
  );
};

export default Checkbox;
