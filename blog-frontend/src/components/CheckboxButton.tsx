import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  input {
    display: none;
  }
  label {
    border: 2px solid gray;
    padding: 0.5rem 1rem;
    display: inline-block;
    font-size: 1.25em;

    transition: 0.1s ease-in-out all;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  input[type='checkbox']:checked ~ label {
    border: none;
    border-color: #3498db;
    background-color: #3498db;
    color: white;
  }
`;

const CheckboxButton = ({ id, children, ...rest }: any) => {
  return (
    <CheckboxContainer>
      <input type="checkbox" id={id} {...rest} />
      <label htmlFor={id}>{children}</label>
    </CheckboxContainer>
  );
};

export default CheckboxButton;
