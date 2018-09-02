import React, { Component } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;

  border: none;
  border-bottom: 2px solid #7f8c8d;
  outline: none;

  font-size: 1.5em;
  font-family: "Noto Sans KR";

  transition: all 0.3s ease-in-out;

  &:focus {
    border-bottom: 4px solid #3498db;
  }
`;

class TextInput extends Component<any, any> {
  public render() {
    return <StyledInput {...this.props} />;
  }
}

export default TextInput;
