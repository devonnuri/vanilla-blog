import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  flex: 0 1 3rem;
  margin-top: 2rem;
  padding: 1rem 0;

  color: white;
  background-color: #34495e;

  text-align: center;
  font-weight: 300;
  font-size: 1em;

  a {
    color: white;
    text-decoration: none;
    font-style: oblique;
    font-weight: 500;
  }
`;

export default () => {
  return (
    <Footer>
      <a href="https://github.com/devonnuri/blog">Blog Engine</a> made by{' '}
      <a href="https://github.com/devonnuri">@devonnuri</a>
    </Footer>
  );
};
