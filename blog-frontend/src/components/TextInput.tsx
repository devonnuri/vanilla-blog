import React from 'react';
import styled from 'styled-components';

const TitleInput = styled.input`
  width: 100%;

  margin: 0 0 2rem 0;
  border: none;
  border-bottom: 2px solid #7f8c8d;
  outline: none;

  font-size: 1.5em;
  font-family: 'Noto Sans KR';

  transition: all 0.3s ease-in-out;

  &:focus {
    border-bottom: 4px solid #3498db;
  }
`;

const TextInput = ({ ...rest }) => {
  return <TitleInput {...rest} />;
};

export default TextInput;
